import psycopg2
import json

# Replace with your actual Render PostgreSQL External URL
DATABASE_URL = "postgresql://analytics_db_lx6a_user:yxsFe4rO9mDoFIWUUAqORhdBmlQWzdr5@dpg-d491m9m3jp1c73crgr50-a.oregon-postgres.render.com/analytics_db_lx6a"

# Connect to Render PostgreSQL
conn = psycopg2.connect(DATABASE_URL)
cursor = conn.cursor()

# Create table with flexible TEXT types
cursor.execute("""
CREATE TABLE IF NOT EXISTS document (
    id SERIAL PRIMARY KEY,
    name TEXT,
    fileType TEXT,
    fileSize BIGINT,
    status TEXT,
    organizationId TEXT,
    departmentId TEXT,
    createdAt TEXT,
    updatedAt TEXT
);
""")
conn.commit()

# Load your JSON data
with open("data/Analytics_Test_Data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

def normalize_value(value):
    """Convert Mongo-style {'$numberLong': '123'} or nested dicts into plain types."""
    if isinstance(value, dict):
        # Handle MongoDB export formats
        if "$numberLong" in value:
            return int(value["$numberLong"])
        elif "$numberInt" in value:
            return int(value["$numberInt"])
        elif "$date" in value:
            return str(value["$date"])
        else:
            return json.dumps(value)
    elif isinstance(value, list):
        return json.dumps(value)
    return value

# Insert each record safely
for item in data:
    cursor.execute("""
        INSERT INTO document (name, fileType, fileSize, status, organizationId, departmentId, createdAt, updatedAt)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
    """, (
        normalize_value(item.get("name")),
        normalize_value(item.get("fileType")),
        normalize_value(item.get("fileSize")),
        normalize_value(item.get("status")),
        normalize_value(item.get("organizationId")),
        normalize_value(item.get("departmentId")),
        normalize_value(item.get("createdAt")),
        normalize_value(item.get("updatedAt")),
    ))

conn.commit()
print("✅ Data successfully uploaded to Render PostgreSQL!")

cursor.close()
conn.close()
