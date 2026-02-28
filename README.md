# 23 Web Financial Printing

A professional, enterprise-grade bank cheque generation tool built with Angular 21. Transform financial data into pixel-perfect, print-ready documents with real-time SVG rendering.

## Live Links

| Platform | URL |
|----------|-----|
| GitHub Pages | https://mk-knight23.github.io/23-web-financial-printing/ |
| Render | https://23-web-financial-printing.onrender.com |
| Vercel | https://23-web-financial-printing.vercel.app |
| Firebase | https://web-financial-printing.web.app |
| AWS Amplify | https://main.d1234567890abcdef.amplifyapp.com |

## Overview

ChequeGen is designed for organizations and individuals who need a precise way to generate cheque drafts. It replaces legacy manual entry tools with a robust reactive system powered by Angular Signals.

## Features

- **Multi-Bank Templates** - Support for SBI, HDFC, and generic bank formats
- **Real-time Preview** - Live high-fidelity SVG rendering
- **Auto Amount-to-Words** - Automatic conversion of numeric amounts to words
- **PDF Export** - DPI-optimized PDF generation via jsPDF
- **Dark Mode** - Modern fintech UI with dark/light theme support
- **Keyboard Shortcuts** - Efficient workflow with hotkeys (Ctrl+S, Ctrl+P, etc.)
- **Statistics Tracking** - Track cheques generated and time spent

---

## 🏗️ Architecture

### Project Structure

```
23-web-financial-printing/
├── src/
│   ├── app/
│   │   ├── core/           # Core services
│   │   │   ├── services/
│   │   │   │   ├── cheque-calculator.service.ts
│   │   │   │   ├── amount-to-words.service.ts
│   │   │   │   ├── pdf-generator.service.ts
│   │   │   │   └── theme.service.ts
│   │   │   └── components/  # Core UI components
│   │   ├── features/       # Feature modules
│   │   │   ├── generator/
│   │   │   │   ├── components/
│   │   │   │   │   ├── cheque-form.component.ts
│   │   │   │   │   ├── cheque-preview.component.ts
│   │   │   │   │   ├── bank-selector.component.ts
│   │   │   │   │   └── amount-input.component.ts
│   │   │   │   ├── generator.component.ts
│   │   │   │   └── generator.routes.ts
│   │   │   ├── statistics/
│   │   │   │   ├── components/
│   │   │   │   │   └── stats-card.component.ts
│   │   │   │   ├── statistics.component.ts
│   │   │   │   └── statistics.routes.ts
│   │   ├── shared/         # Shared components
│   │   │   ├── components/
│   │   │   │   ├── button/
│   │   │   │   ├── input/
│   │   │   │   ├── card/
│   │   │   │   └── badge/
│   │   │   ├── directives/
│   │   │   └── pipes/
│   │   ├── types/          # TypeScript interfaces
│   │   │   ├── cheque.model.ts
│   │   │   ├── bank.model.ts
│   │   │   └── statistics.model.ts
│   │   ├── app.config.ts    # Angular app config
│   │   ├── app.routes.ts   # App routing
│   │   └── app.component.ts
│   ├── styles/
│   │   └── main.css        # Tailwind imports
│   ├── index.html          # HTML entry point
│   └── main.ts             # Entry point
├── .github/workflows/      # CI/CD pipelines
│   ├── ci.yml             # Lint and test
│   └── deploy.yml         # Deploy to Vercel & GitHub Pages
├── render.yaml             # Render deployment config
├── angular.json            # Angular CLI config
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript config
├── tailwind.config.ts      # Tailwind config
└── README.md               # This file
```

### Technology Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Angular 21.1.0 (Standalone Components) |
| **Language** | TypeScript 5.9.2 |
| **Styling** | Tailwind CSS v4 |
| **PDF Engine** | jsPDF 4.0.0 |
| **Reactivity** | Angular Signals |
| **Async** | RxJS 7.8.0 |
| **Testing** | Vitest 4.0.8 + Angular Testing Utils |
| **Build Tool** | Angular CLI 21.1.1 |

### Key Architectural Patterns

- **Standalone Components**: Modern Angular architecture with standalone components
- **Angular Signals**: Reactive state management for real-time preview
- **RxJS**: Async data streams for complex operations
- **Service-Oriented**: Logic encapsulated in injectable services
- **Lazy Loading**: Feature-based code splitting
- **Type Safety**: Full TypeScript coverage with strict mode

### State Management

```
User Input → Signal → Computed Signal → UI Update
     ↓          ↓              ↓            ↓
  Form Data  Reactive     SVG Preview    Live DOM
             State
```

- **Angular Signals**: Reactive state for form data and preview
- **RxJS**: Async operations for PDF generation and API calls
- **Computed Signals**: Derived state (amount-to-words, formatted dates)
- **Injectable Services**: Business logic in core services

### Core Services

```typescript
{
  chequeCalculator: "Math for MICR line formatting",
  amountToWords: "Numeric to English words conversion",
  pdfGenerator: "jsPDF wrapper for cheque export",
  themeService: "Dark/light mode with localStorage persistence"
}
```

### Cheque Generation Flow

```typescript
{
  flow: {
    step1: "Select bank template",
    step2: "Fill form data (payee, amount, date, account)",
    step3: "Real-time SVG preview with Angular Signals",
    step4: "Auto amount-to-words conversion",
    step5: "PDF generation via jsPDF",
    step6: "Download/print cheque"
  },
  reactive: {
    preview: "Instant SVG update on form change",
    validation: "Real-time field validation",
    theme: "Instant theme switching"
  }
}
```

### Performance Optimizations

- **Angular Signals**: Efficient change detection
- **OnPush Change Detection**: Component-level optimization
- **Lazy Loading**: Feature-based code splitting
- **Tree Shaking**: Angular build optimizations
- **Minimal Bundle**: Optimized via Angular CLI
- **SVG Rendering**: Hardware-accelerated via Canvas API

### Design System

```typescript
// Financial Printing Theme
{
  typography: {
    heading: "Modern sans-serif (Inter)",
    body: "Clean, professional",
    mono: "MICR-style numeric"
  },
  color: {
    primary: "indigo-600",
    secondary: "slate-600",
    success: "emerald-500",
    warning: "amber-500",
    neutral: "slate-50"
  },
  spacing: {
    form: "Optimal for cheque layout",
    sections: "Professional financial document"
  },
  layout: {
    container: "Max-width 1200px",
    grid: "Two-column layout (form + preview)",
    responsive: "Mobile-first breakpoints"
  }
}
```

### Multi-Platform Deployment

| Platform | URL | Auto-Deploy |
|----------|-----|-------------|
| GitHub Pages | https://mk-knight23.github.io/23-web-financial-printing/ | ✅ GitHub Actions |
| Vercel | https://23-web-financial-printing.vercel.app | ✅ GitHub Actions |
| Render | https://23-web-financial-printing.onrender.com | ✅ render.yaml |
| Firebase | https://web-financial-printing.web.app | Manual |
| AWS Amplify | https://main.23-web-financial-printing.amplifyapp.com | Manual |

### CI/CD Pipeline

```yaml
Push to main → CI Check → Build → Deploy
     ↓            ↓          ↓         ↓
  Trigger     Lint+Test   Production   Vercel/GitHub Pages
              (Vitest)   Build
```

- **CI**: Linting and build checks
- **Testing**: Vitest + Angular Testing Utils
- **Build**: Production-optimized bundle via Angular CLI
- **Deploy**: Automatic to Vercel and GitHub Pages

### Cheque Specifications

```typescript
{
  supportedBanks: {
    SBI: "Standardized template",
    HDFC: "Standardized template",
    Generic: "Customizable template"
  },
  features: {
    micrLine: "Magnetic Ink Character Recognition",
    dateFormat: "ISO 8601 + localized",
    amountWords: "English, with currency formatting",
    signature: "Placeholder for signature"
  },
  pdfExport: {
    dpi: "300 DPI (print quality)",
    format: "A4 or custom cheque size",
    compression: "Optimized for email sharing"
  }
}
```

## Setup & Build Instructions

### Prerequisites

- Node.js 18.x or higher
- npm 10.x or higher

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm start
```

### Production Build

```bash
# Build for production
npm run build
```

## Deployment

### Render (One-Click Deploy)

This repository includes a `render.yaml` blueprint for automated deployment:

1. Visit [dashboard.render.com](https://dashboard.render.com)
2. Click "New +" → "Blueprint"
3. Connect repository: `mk-knight23/23-web-financial-printing`
4. Render will auto-detect and apply the blueprint configuration

### Vercel

1. Import project at [vercel.com](https://vercel.com)
2. Framework preset: Angular
3. Build command: `npm run build`
4. Output directory: `dist/bank-cheque-generator`

### Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

### AWS Amplify

Connect your repository at [amplify.aws](https://amplify.aws). The `amplify.yml` file is included for automatic configuration.

---

**License:** MIT
**Created by:** mk-knight23
