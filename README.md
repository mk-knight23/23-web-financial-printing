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

## Tech Stack

- **Framework:** Angular 21 (Standalone Components, Signals)
- **Styling:** Tailwind CSS v4 (Financial-grade design system)
- **PDF Engine:** jsPDF
- **State Management:** Angular Signals & RxJS

## Project Structure

```text
src/app/
├── core/services/          # Cheque calculation & conversion logic
├── features/generator/     # Reactive forms & SVG preview components
├── types/                  # Strict financial data interfaces
└── styles.css              # Custom Tailwind financial components
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
