"""AI Org Monitor Pro - Configuration"""
from dataclasses import dataclass
from typing import List
import os

@dataclass
class RefreshSchedule:
    frequency: str
    times_utc: List[str]

@dataclass
class VersioningPolicy:
    enabled: bool = True
    strategy: str = "timestamped_snapshots"
    daily_snapshots: int = 30
    weekly_snapshots: int = 12
    monthly_snapshots: int = 12

class Config:
    ENV = os.getenv("ENV", "development")
    DEBUG = ENV == "development"
    DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:password@localhost:5432/ai_org_monitor")
    REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")
    NEWS_API_KEY = os.getenv("NEWS_API_KEY", "")
    TWITTER_API_KEY = os.getenv("TWITTER_API_KEY", "")
    
    REFRESH_SCHEDULE = RefreshSchedule(
        frequency="twice_daily",
        times_utc=["08:00", "20:00"]
    )
    
    VERSIONING = VersioningPolicy()
    
    DATA_SOURCES = ["news_apis", "social_media_apis", "company_blogs", "financial_data", "google_trends"]
    
    COMPANIES = {
        "openai": {"blogs_url": "https://openai.com/blog/", "name": "OpenAI"},
        "anthropic": {"blogs_url": "https://www.anthropic.com/research", "name": "Anthropic"},
        "deepmind": {"blogs_url": "https://www.deepmind.com/blog", "name": "DeepMind"},
        "xai": {"blogs_url": "https://x.ai/blog", "name": "xAI"}
    }

config = Config()
