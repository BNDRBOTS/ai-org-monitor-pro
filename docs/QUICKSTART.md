# Quick Start Guide

## Prerequisites

- Docker & Docker Compose
- Python 3.11+ (for local dev)
- Node.js 18+ (for local dev)

## Docker Deployment (Recommended)

```bash
# Clone repository
git clone https://github.com/BNDRBOTS/ai-org-monitor-pro.git
cd ai-org-monitor-pro

# Copy environment template
cp .env.example .env

# Edit .env with your API keys
nano .env

# Start all services
docker-compose -f infra/docker/docker-compose.yml up -d

# Check logs
docker-compose -f infra/docker/docker-compose.yml logs -f
```

## Access Points

- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **Frontend**: http://localhost:3000

## Health Check

```bash
curl http://localhost:8000/health
```

Expected response:
```json
{
  "status": "healthy",
  "version": "1.0.0",
  "timestamp": "2026-02-10T08:16:00.000000"
}
```

## Trigger Data Ingestion

```bash
# Ingest news
curl -X POST http://localhost:8000/api/v1/ingest/news

# Ingest social media
curl -X POST http://localhost:8000/api/v1/ingest/social
```

## Stop Services

```bash
docker-compose -f infra/docker/docker-compose.yml down
```

## Troubleshooting

### Port already in use
```bash
# Check what's using port 8000
lsof -i :8000

# Kill process or change port in docker-compose.yml
```

### Database connection issues
```bash
# Check postgres is healthy
docker-compose -f infra/docker/docker-compose.yml ps

# Restart postgres
docker-compose -f infra/docker/docker-compose.yml restart postgres
```
