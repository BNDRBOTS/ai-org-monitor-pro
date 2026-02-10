# Deployment Guide

## Production Deployment Options

### Option 1: Docker Compose (Simple)

**Best for**: Small-scale deployments, single server

```bash
# Production compose
docker-compose -f infra/docker/docker-compose.prod.yml up -d
```

### Option 2: Kubernetes (Scalable)

**Best for**: Enterprise, multi-server, auto-scaling

```bash
# Apply manifests
kubectl apply -f infra/k8s/

# Check status
kubectl get pods -n ai-monitor
```

### Option 3: Cloud Providers

#### AWS
- **Backend**: ECS/Fargate or EKS
- **Database**: RDS PostgreSQL
- **Cache**: ElastiCache Redis
- **Frontend**: S3 + CloudFront

#### Google Cloud
- **Backend**: Cloud Run or GKE
- **Database**: Cloud SQL PostgreSQL
- **Cache**: Memorystore Redis
- **Frontend**: Cloud Storage + CDN

#### Azure
- **Backend**: Container Apps or AKS
- **Database**: Azure Database for PostgreSQL
- **Cache**: Azure Cache for Redis
- **Frontend**: Blob Storage + CDN

## Environment Variables (Production)

```bash
# Required
DATABASE_URL=postgresql://user:pass@prod-db:5432/ai_org_monitor
REDIS_URL=redis://prod-redis:6379/0
NEWS_API_KEY=<your_key>
TWITTER_API_KEY=<your_key>

# Optional
JWT_SECRET=<random_secret>
ALLOWED_ORIGINS=https://yourdomain.com
```

## Pre-Deployment Checklist

- [ ] All API keys added to secrets manager
- [ ] Database backups configured
- [ ] SSL/TLS certificates ready
- [ ] Load balancer configured
- [ ] Monitoring/alerts set up
- [ ] DNS records configured
- [ ] CORS origins updated

## Post-Deployment Verification

```bash
# Health check
curl https://api.yourdomain.com/health

# Trigger ingestion
curl -X POST https://api.yourdomain.com/api/v1/ingest/news

# Check snapshots
curl https://api.yourdomain.com/api/v1/snapshots
```

## Monitoring

- **Logs**: Centralized logging (CloudWatch, Stackdriver, etc.)
- **Metrics**: Prometheus + Grafana
- **Alerts**: PagerDuty, Slack integration
- **Uptime**: Pingdom, UptimeRobot

## Backup Strategy

- **Database**: Daily automated backups with 30-day retention
- **Snapshots**: Already versioned in database
- **Configuration**: Store in version control

## Rollback Procedure

```bash
# Docker Compose
docker-compose down && docker-compose up -d --force-recreate

# Kubernetes
kubectl rollout undo deployment/ai-monitor-backend
```
