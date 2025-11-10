# D:\Project\analytics-internship\services\vanna\vanna_server.py

from fastapi import FastAPI
from pydantic import BaseModel
import psycopg2
from openai import OpenAI
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(title="Vanna AI - Chat with Data")

# ✅ PostgreSQL connection
DB_URL = os.getenv("DATABASE_URL")
conn = psycopg2.connect(DB_URL)

# ✅ Configure OpenAI (2.x client)
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


# Request schema
class QueryRequest(BaseModel):
    query: str


@app.post("/chat-with-data")
async def chat_with_data(request: QueryRequest):
    user_query = request.query

    try:
        # Step 1️⃣ — Generate SQL with GPT
        prompt = f"""
        You are an AI data analyst. Convert the following user question
        into a valid PostgreSQL SQL query based on this table:

        Table: document(
            id, name, fileType, fileSize, status,
            organizationId, departmentId, createdAt, updatedAt
        )

        Question: {user_query}
        Return only the SQL query.
        """

        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful AI data assistant."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.2
        )

        generated_sql = response.choices[0].message.content.strip()

        # Step 2️⃣ — Execute SQL in PostgreSQL
        cursor = conn.cursor()
        cursor.execute(generated_sql)
        columns = [desc[0] for desc in cursor.description]
        rows = cursor.fetchall()

        results = [dict(zip(columns, row)) for row in rows]

        return {
            "generatedSQL": generated_sql,
            "results": results
        }

    except Exception as e:
        return {"error": str(e), "generatedSQL": None, "results": []}


# Health check endpoint
@app.get("/")
def root():
    return {"message": "✅ Vanna AI Backend running with OpenAI 2.7.1!"}
