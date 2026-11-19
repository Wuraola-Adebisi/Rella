# Rella

Rella is a personal life management system for keeping plans, responsibilities, recurring payments, and important information organised in one place.

## Product direction

Rella brings together tasks, calendar events, bills and subscriptions, personal memories, an inbox for quick captures, and an integrated assistant. The core workflow is:

**Capture → Understand → Organise → Remember → Retrieve**

The assistant is designed to work with the user's own information through controlled, permission-checked application operations. It should preserve original context, distinguish saved facts from inferences, and ask before consequential actions.

## Getting started

Requirements: Node.js 20+

```bash
npm install
npm run dev
```

Build and type-check:

```bash
npm run typecheck
npm run build
```

## Stack

- React + TypeScript + Vite
- Tailwind CSS
- Supabase Auth + PostgreSQL (backend integration phase)
- PostgreSQL full-text search, with pgvector for semantic retrieval
- Server-side AI orchestration and scheduled reminder jobs

## Project notes

See [the product foundation](docs/PRODUCT_FOUNDATION.md) for the product principles, application areas, delivery sequence, and technical direction.
