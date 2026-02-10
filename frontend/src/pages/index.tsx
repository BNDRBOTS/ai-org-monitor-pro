import { useState, useEffect } from 'react'

interface HealthData {
  status: string
  version: string
  timestamp: string
}

export default function Home() {
  const [health, setHealth] = useState<HealthData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
    
    fetch(`${apiUrl}/health`)
      .then(res => {
        if (!res.ok) throw new Error('Health check failed')
        return res.json()
      })
      .then((data: HealthData) => {
        setHealth(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Health check error:', err)
        setError('Unable to connect to backend API')
        setLoading(false)
      })
  }, [])

  return (
    <div className="container">
      <header>
        <h1>AI Organization Monitor Pro</h1>
        <p>Real-time intelligence on OpenAI, Anthropic, DeepMind, and xAI</p>
      </header>

      <main>
        <div className="health-status">
          <h2>System Status</h2>
          {loading ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div className="loading"></div>
              <span style={{ color: 'var(--text-secondary)' }}>Connecting to backend...</span>
            </div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : health ? (
            <div className="status-card">
              <span className="status-indicator"></span>
              <div>
                <p><strong>Status:</strong> {health.status}</p>
                <p><strong>Version:</strong> {health.version}</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '8px' }}>
                  Last checked: {new Date(health.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          ) : null}
        </div>

        <div className="features">
          <div className="feature-card">
            <h3>
              <span style={{ fontSize: '24px' }}>📡</span>
              Deterministic Ingestion
            </h3>
            <p>
              Hash-based deduplication across news APIs, social media, company blogs, 
              financial filings, and Google Trends. Every data point is verified and traceable.
            </p>
          </div>

          <div className="feature-card">
            <h3>
              <span style={{ fontSize: '24px' }}>📊</span>
              Versioned Snapshots
            </h3>
            <p>
              Automated daily, weekly, and monthly snapshots with configurable retention policies. 
              Track changes over time with forensic precision.
            </p>
          </div>

          <div className="feature-card">
            <h3>
              <span style={{ fontSize: '24px' }}>🔐</span>
              Forensic Audit Trail
            </h3>
            <p>
              Complete provenance tracking with SHA-256 hashing. Every record includes 
              API version, timestamps, and raw response verification.
            </p>
          </div>

          <div className="feature-card">
            <h3>
              <span style={{ fontSize: '24px' }}>⚡</span>
              Real-time Pipeline
            </h3>
            <p>
              Async data processing with automatic normalization, validation, and storage. 
              UTF-8 encoding, UTC timestamps, and deterministic field standardization.
            </p>
          </div>

          <div className="feature-card">
            <h3>
              <span style={{ fontSize: '24px' }}>🎯</span>
              Multi-Source Coverage
            </h3>
            <p>
              Monitor 5 data sources: news outlets, Twitter/Reddit/YouTube, official company blogs, 
              SEC filings, and search trends. Comprehensive intelligence in one platform.
            </p>
          </div>

          <div className="feature-card">
            <h3>
              <span style={{ fontSize: '24px' }}>♿</span>
              WCAG 2.1 AA Compliant
            </h3>
            <p>
              Enterprise-grade accessibility with keyboard navigation, screen reader support, 
              and 4.5:1 color contrast ratios. Built for everyone.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
