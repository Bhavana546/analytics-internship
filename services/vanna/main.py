from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os
import psycopg2
from psycopg2.extras import RealDictCursor
import openai

app = FastAPI()

# --- ENV VARIABLES ---
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/analyticsdb")
GROQ_API_KEY = os.getenv("GROQ_API_KEY", "your-groq-api-key-here")

# Initialize OpenAI (Groq-compatible endpoint)
openai.api_key = GROQ_API_KEY
openai.api_base = "https://api.groq.com/openai/v1"

# --- DATABASE CONNECTION ---
def run_query(sql: str):
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute(sql)
    rows = cur.fetchall()
    cur.close()
    conn.close()
    return rows

# --- MODELS ---
class QueryRequest(BaseModel):
    query: str

@app.get("/_health")
def health():
    return {"status": "ok"}

@app.post("/chat-with-data")
def chat_with_data(req: QueryRequest):
    try:
        prompt = f"""
        Convert this question into an SQL query based on the database schema:
        {req.query}
        Only output valid SQL without explanations.
        """
        response = openai.ChatCompletion.create(
            model="mixtral-8x7b",
            messages=[{"role": "user", "content": prompt}],
        )
        sql = response["choices"][0]["message"]["content"].strip()
        print("Generated SQL:", sql)

        try:
            results = run_query(sql)
        except Exception as e:
            results = []
            print("SQL Error:", e)

        return {"generatedSQL": sql, "results": results}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
