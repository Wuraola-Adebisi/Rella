# Rella product foundation

## Product definition

Rella is a personal life management system. It gives people one place to keep track of responsibilities, plans, recurring payments, important details and the context that connects them.

The core workflow is **Capture → Understand → Organise → Remember → Retrieve**.

## Application areas

- **Overview:** priorities, upcoming commitments, payments, quick capture and recently saved information.
- **Calendar:** appointments, deadlines, reminders, renewals and milestones.
- **Tasks:** actionable work with due dates, priorities and completion status.
- **Bills & subscriptions:** recurring costs, due dates, renewal terms and payment status.
- **My Memory:** people, places, recommendations, preferences, notes and plans, preserving original context.
- **Inbox:** unprocessed captures waiting to be organised.
- **Ask Rella:** contextual retrieval and supported actions through controlled application operations.

## Stakeholder MVP scope

The current branch is a client-facing simulation intended to test the product workflow and user experience before production infrastructure is introduced.

### Included
- Persistent browser-based workspace state.
- Task creation and completion.
- Memory creation and search.
- Inbox capture and processing into tasks or memories.
- Calendar event creation and upcoming event views.
- Bill and subscription tracking with paid/unpaid status.
- Workspace-wide search, data export and sample-data reset.
- Conversational mock assistant with deterministic retrieval, conversation history and confirmed task/memory/event actions.
- Responsive application layout.

### Deliberately simulated
- Authentication and user identity.
- Backend database and cloud persistence.
- AI reasoning and natural-language understanding.
- Scheduled reminders, browser push and email notifications.
- Multi-device sync, integrations and payment processing.

The assistant is deterministic, not an LLM. It only retrieves the records supplied by the local workspace and only executes explicitly supported operations after user confirmation. It must not claim that unsupported actions have occurred.

## Product principles

- Preserve the user's original words alongside structured interpretations.
- Keep saved facts distinct from suggestions and inferences.
- Never invent a personal memory or claim an action was completed when it was not.
- Ask for missing information when it materially affects an action.
- Require confirmation for consequential changes.
- Keep records exportable and deletable.
- Clearly label simulated capabilities during stakeholder testing.

## Future production architecture

- React, TypeScript, Vite and Tailwind CSS.
- Supabase Auth and PostgreSQL with row-level security.
- PostgreSQL full-text search first; semantic retrieval only where it adds value.
- Server-side AI orchestration with validated, user-scoped tool calls.
- Scheduled server-side jobs for reminders.
- Monitoring, audit history and privacy controls.

The assistant must not have unrestricted database access. It should call a small set of authenticated backend operations, each with validation, ownership checks and an auditable result.