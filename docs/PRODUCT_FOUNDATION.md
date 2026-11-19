# Rella product foundation

## Product definition

Rella is a personal life management system. It gives people one place to keep track of responsibilities, plans, recurring payments, important details, and the context that connects them.

The product is organised around five actions:

1. **Capture** information before it gets lost.
2. **Understand** what the information represents.
3. **Organise** it into a task, event, reminder, payment, or memory.
4. **Remember** the context and relationships around it.
5. **Retrieve** it in natural language when it becomes useful.

## Application areas

- **Overview:** today's priorities, upcoming commitments, payments, quick capture, and recently saved information.
- **Calendar:** appointments, deadlines, reminders, renewals, and milestones in one timeline.
- **Tasks:** actionable work with due dates, priorities, recurrence, and completion history.
- **Bills & subscriptions:** recurring costs, next due dates, renewal terms, cancellation deadlines, and reminders.
- **My Memory:** people, places, recommendations, preferences, notes, and plans, with their original context preserved.
- **Inbox:** unprocessed captures waiting to be organised.
- **Ask Rella:** an assistant that can retrieve information and perform supported actions through controlled application operations.

## Product principles

- Preserve the user's original words alongside any structured interpretation.
- Keep saved facts distinct from inferred context.
- Never invent a personal memory or claim an action was completed when it was not.
- Ask for missing information when it materially affects an action.
- Require confirmation for destructive or consequential changes.
- Keep all personal records scoped to the authenticated user.
- Make records editable, exportable, and deletable.

## MVP delivery sequence

### Foundation
- Responsive application shell and navigation
- Authentication and account settings
- Database schema and user-scoped data access
- Shared form, dialog, empty-state, and notification patterns

### Personal organisation
- Inbox capture and processing
- Tasks and reminders
- Calendar and events
- Bills and subscriptions
- My Memory with people and relationship links
- Search and filters

### Assistant
- Natural-language retrieval
- Structured extraction from manual captures
- Controlled task, event, reminder, memory, and payment operations
- Confirmation and action history
- Weekly review

## Technical direction

- React, TypeScript, Vite, Tailwind CSS
- Supabase Auth and PostgreSQL
- PostgreSQL full-text search first; pgvector for semantic retrieval where useful
- Server-side AI orchestration with validated tool calls
- Scheduled server-side jobs for reminders
- Vercel deployment and Sentry error monitoring

The assistant must not have unrestricted database access. It should call a small set of authenticated backend operations, each with validation, ownership checks, and an auditable result.
