# Architecture: Bank Cheque Generation Tool

## Overview

Bank Cheque Generation Tool is a Web App built with Angular 21.

## System Architecture

```
┌─────────────────────────────────────────┐
│           CLIENT LAYER                  │
│     Browser | Mobile | Tablet          │
└──────────────────┬──────────────────────┘
                   │
┌──────────────────▼──────────────────────┐
│           CDN LAYER                     │
│   Vercel | Netlify | Cloudflare        │
└──────────────────┬──────────────────────┘
                   │
┌──────────────────▼──────────────────────┐
│        APPLICATION LAYER                │
│                Angular 21              │
└─────────────────────────────────────────┘
```

## Technology Stack

### Frontend
- Framework: Angular 21
- Build: Vite
- Styling: Tailwind CSS
- Language: TypeScript

### CI/CD
- Platform: GitHub Actions
- Schedule: Every 6 hours
- Security: Trivy, TruffleHog

### Deployment
- Primary: Vercel
- Secondary: Netlify, Firebase, Cloudflare

## Security

- Security headers on all platforms
- Automated secret scanning
- Dependency vulnerability checks
- XSS protection

## Performance

- Optimized builds
- CDN distribution
- Caching strategies
- Lazy loading
