"use client";
import React, { useState, useEffect, useRef } from "react";

interface Repo {
  id: number;
  full_name: string;
  html_url: string;
}

const DebouncedSearch: React.FC = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (query.trim() === "") {
      setData([]);
      return;
    }

    setLoading(true);
    setError("");

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      fetch(`https://api.github.com/search/repositories?q=${query}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch repositories");
          return res.json();
        })
        .then((res) => {
          setData(res.items || []);
        })
        .catch((err: Error) => setError(err.message))
        .finally(() => setLoading(false));
    }, 500);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Debounced Repo Search</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search repositories..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => setQuery("")}
          className="px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          Clear
        </button>
      </div>

      {loading && <p className="text-gray-500 mb-2">Loading...</p>}
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <ul className="space-y-2">
        {data.map((repo) => (
          <li key={repo.id}>
            <a
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              {repo.full_name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DebouncedSearch;
