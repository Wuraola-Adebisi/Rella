# Rella

Rella is a personal life management workspace for keeping responsibilities, plans, recurring payments and important personal context organised in one place.

## Product workflow

**Capture → Understand → Organise → Remember → Retrieve**

Rella brings together an Inbox, tasks, calendar, bills and subscriptions, My Memory and a conversational assistant. The product is designed around the connections between these records, not simply storing them in separate lists.

## Run locally

Requirements: Node.js 20+

```bash
npm install
npm run dev
```

Validate the project:

```bash
npm run typecheck
npm run build
```

## Stakeholder MVP

This branch contains a client-facing product simulation with:
- Persistent sample workspace data in browser local storage.
- Task, memory, calendar event, bill and inbox workflows.
- Workspace-wide search, data export and resettable sample data.
- A conversational mock assistant that retrieves saved records and proposes supported actions for explicit confirmation.
- A responsive interface with conversation history saved in the current browser.

The backend and AI are deliberately mocked. There is no production authentication, server-side database, cross-device sync, LLM connection, scheduled job, email integration, payment processing or browser push notification. Assistant responses are deterministic and grounded in the current workspace records. The sample profile and seeded records are illustrative.

## Architecture

- `src/hooks/useRellaStore.ts`: application state and workflow actions.
- `src/services/mockDatabase.ts`: isolated persistence and workspace export helpers.
- `src/services/mockAssistant.ts`: deterministic intent detection, retrieval and action proposal.
- `src/components/AssistantView.tsx`: conversational interface and action confirmation.
- `src/components`: product views and reusable interface components.

The service boundary is intentionally replaceable. A future backend can implement the same application operations without coupling persistence directly to the UI.

## Product principles

- Preserve original user wording and context.
- Never fabricate a saved personal fact.
- Distinguish retrieved records from suggestions.
- Confirm changes before executing assistant-proposed actions.
- Make records exportable and deletable.
- Be explicit about the limits of simulated capabilities.

See [Product Foundation](docs/PRODUCT_FOUNDATION.md) for product scope and technical direction.