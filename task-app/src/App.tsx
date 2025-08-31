import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useState } from "react";
type Task = {
  id: number;
  title: string;
  description?: string;
  done: boolean;
};

function App() {
  // const API = process.env.API_BASE;
  const [result, setResult] = useState<Task[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/tasks`, { method: 'GET' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: Task[] = await res.json(); // ← 封筒から中身を取り出す！
      setResult(data);
      setError(null);
    } catch (e: any) {
      setError(e.message ?? String(e));
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save & restart to reload.
        </p>
        <button onClick={submit} disabled={loading}>
          {loading ? '読み込み中…' : '実行'}
        </button>

        {error && <p style={{ color: 'salmon' }}>Error: {error}</p>}

        {result && (
          <pre style={{ textAlign: 'left', maxWidth: 600 }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        )}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
