"use client";
import { useState } from "react";
import axios from "axios";

interface QueryResult {
  [key: string]: unknown;
}

export default function ChatWithDataPage() {
  const [query, setQuery] = useState("");
  const [sql, setSQL] = useState("");
  const [results, setResults] = useState<QueryResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setSQL("");
    setResults([]);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE}/chat-with-data`,
        { query }
      );
      setSQL(res.data.generatedSQL || "SELECT * FROM documents LIMIT 10;");
      setResults(res.data.results || []);
    } catch (err) {
      console.error(err);
      setError("⚠️ Failed to fetch data. Please check your backend connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
   <main className="min-h-screen bg-linear-to-b from-gray-50 to-gray-200 p-10 pl-64 pt-16 flex justify-center items-start">

  <div className="max-w-5xl w-full bg-white/80 backdrop-blur-md shadow-xl rounded-2xl border border-gray-200 p-8 mt-10">

        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          💬 Chat with Your Data
        </h1>

        {/* Query Box */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 mb-8"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Ask a question like "Top 5 vendors by spend"'
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-gray-50"
          />
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-3 rounded-xl font-semibold text-white transition-all shadow-md ${
              loading
                ? "bg-indigo-300 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Thinking..." : "Ask"}
          </button>
        </form>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* SQL Query Display */}
        {sql && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              🧠 Generated SQL
            </h2>
            <pre className="bg-gray-900 text-green-300 text-sm rounded-lg p-4 overflow-x-auto">
              {sql}
            </pre>
          </div>
        )}

        {/* Results Table */}
        {results.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-3">📊 Results</h2>
            <div className="overflow-x-auto border border-gray-200 rounded-xl shadow-sm">
              <table className="min-w-full border-collapse text-sm text-gray-700">
                <thead className="bg-indigo-50 text-gray-800">
                  <tr>
                    {Object.keys(results[0]).map((key) => (
                      <th key={key} className="px-4 py-3 border-b">
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {results.map((row, idx) => (
                    <tr
                      key={idx}
                      className={`${
                        idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-indigo-50 transition`}
                    >
                      {Object.values(row).map((val, i) => (
                        <td key={i} className="px-4 py-2 border-b">
                          {String(val)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* No Results */}
        {!loading && !sql && !results.length && (
          <p className="text-center text-gray-500 mt-12 italic">
            Start by asking a question above 👆
          </p>
        )}
      </div>
    </main>
  );
}
