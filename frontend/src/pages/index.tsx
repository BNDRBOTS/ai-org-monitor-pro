import { useState, useEffect } from 'react'

export default function Home() {
  const [health, setHealth] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:8000/health')
      .then(res => res.json())
      .then(data => {
        setHealth(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Health check failed:', err)
        setLoading(false)
      })
  }, [])

  return (
    <div className="container">
      <header>
        <h1>AI Organization Monitor Pro</h1>
        <p>Real-time monitoring of OpenAI, Anthropic, DeepMind, and xAI</p>
      </header>

      <main>
        <div className="health-status">
          <h2>System Status</h2>
          {loading ? (
            <p>Loading...</p>
          ) : health ? (
            <div className="status-card">
              <span className="status-indicator healthy"></span>
              <div>
                <p><strong>Status:</strong> {health.status}</p>
                <p><strong>Version:</strong> {health.version}</p>
              </div>
            </div>
          ) : (
            <p className="error">Backend not connected</p>
          )}
        </div>

        <div className="features">
          <div className="feature-card">
            <h3>📡 Data Ingestion</h3>
            <p>Deterministic ingestion from 5 sources</p>
          </div>
          <div className="feature-card">
            <h3>📊 Versioned Snapshots</h3>
            <p>Daily, weekly, monthly retention</p>
          </div>
          <div className="feature-card">
            <h3>🔐 Forensic Audit</h3>
            <p>Full provenance tracking</p>
          </div>
        </div>
      </main>
    </div>
  )
}
