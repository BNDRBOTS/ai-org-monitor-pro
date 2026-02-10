# Architecture Overview

## System Design

**AI_Org_Monitor_Pro** is a full-stack monitoring system built with enterprise-grade architecture patterns:

```
┌─────────────────────────────────────────────────────────────┐
│                      FRONTEND LAYER                         │
│  Next.js 14 + React 18 + TypeScript                        │
│  (Dashboard, DataTable, Card, AlertBanner)                  │
└─────────────────────────────────────────────────────────────┘
                            ↓ HTTPS
┌─────────────────────────────────────────────────────────────┐
│                      API LAYER                              │
│  FastAPI (11 REST endpoints)                                │
│  • Ingestion endpoints                                      │
│  • Data retrieval endpoints                                 │
│  • Snapshot management                                      │
│  • Health checks                                            │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                   SERVICE LAYER                             │
│  • IngestionService (async connectors)                      │
│  • NormalizationService (UTF-8, UTC, HTML strip)           │
│  • ValidationService (20+ rules)                           │
│  • RetentionService (snapshot versioning)                  │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                     DATA LAYER                              │
│  PostgreSQL 16 (7 ORM models)                               │
│  • NewsArticle, SocialMediaPost, CompanyBlog                │
│  • FinancialFiling, GoogleTrend, Snapshot, AuditLog        │
│  Redis 7 (caching + rate limiting)                          │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                  EXTERNAL SOURCES                           │
│  • NewsAPI, Twitter/X, Reddit, YouTube                      │
│  • Company blogs (OpenAI, Anthropic, DeepMind, xAI)        │
│  • SEC EDGAR, Stock APIs, Google Trends                     │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

1. **Ingestion**: Async connectors fetch data from external sources
2. **Normalization**: UTF-8 encode, UTC timestamps, strip HTML/emojis
3. **Validation**: 20+ rules (type, range, consistency, unique)
4. **Storage**: ORM models with indexes on hot paths
5. **Snapshot**: Daily/weekly/monthly versioned snapshots
6. **Retention**: Automated purge based on policy
7. **API**: REST endpoints serve data to frontend
8. **UI**: Commercial-grade dashboard displays data

## Key Design Patterns

- **Service-Oriented Architecture**: Clear separation of concerns
- **Deterministic Pipeline**: Hash-based deduplication, idempotent operations
- **Async/Await**: Non-blocking I/O throughout
- **Type Safety**: 100% typed (Pydantic + TypeScript)
- **Audit Trail**: Forensic logging of all operations

## Scalability

- **Horizontal**: Load-balanced backend replicas
- **Vertical**: Increase pod resources
- **Database**: Connection pooling, read replicas
- **Caching**: Redis for frequently accessed data
