# Unified Data Hub

Production-grade React + TypeScript dashboard that aggregates users, posts, comments, crypto market data, and weather data into a single routed application.

Beginner walkthrough: see `docs/unified-data-hub-beginner-guide.md`

## Stack

- React 19
- TypeScript
- Zustand for client state only
- TanStack React Query for server state only
- Axios with request and response interceptors
- React Router for protected routes and navigation
- Vite for development and bundling

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

4. Lint the codebase:

```bash
npm run lint
```

## External APIs Used

- JSONPlaceholder
  - `/users`
  - `/posts?userId={id}`
  - `/comments?postId={id}`
- DummyJSON
  - `POST /auth/login`
- CoinGecko
  - `/coins/markets?vs_currency=usd`
- Open-Meteo
  - `/forecast?latitude=28.61&longitude=77.23&current_weather=true`

## Architecture

The application follows Clean Architecture with strict layer responsibilities.

```text
src/
├── app/
│   ├── providers/   # Application-wide providers
│   ├── routes/      # Router and protected route
│   └── store/       # Zustand client-state stores
├── application/
│   └── hooks/       # React Query orchestration hooks
├── domain/
│   ├── models/      # Core entities and DTO contracts
│   └── types/       # Shared domain types
├── infrastructure/
│   ├── api/         # Axios clients and endpoint declarations
│   └── services/    # API-domain service adapters
├── presentation/
│   ├── components/  # Reusable UI building blocks
│   ├── layouts/     # Routed layouts
│   └── pages/       # Screen-level UI
└── shared/
    ├── constants/   # App constants and query keys
    ├── hooks/       # Shared reusable hooks
    └── utils/       # Pure utility functions
```

## State Management Strategy

Zustand is used only for client-side concerns:

- Auth token
- Authenticated user metadata
- Theme mode

React Query is used only for server-side concerns:

- Users
- Posts
- Comments
- Crypto markets
- Weather forecast

This keeps API data cacheable, retryable, and cancelable without coupling it to global UI state.

## Feature Summary

- Authentication using DummyJSON login and persisted session state
- Protected routes for dashboard modules
- Users module with post drill-down and lazy comment loading
- Crypto module with debounced search and sorting
- Weather module with manual refresh and automatic polling
- Error boundary, loaders, error states, empty states, and responsive layout
- Axios interceptors that attach the auth token and normalize API errors

## Trade-offs

- A single routed SPA keeps the developer experience simple, but a feature-folder split inside each layer could be introduced later if the domain expands significantly.
- React Query cache is configured conservatively to avoid stale dashboards while still reducing unnecessary requests.
- Zustand persistence improves UX for auth and theme, but it means logout explicitly clears cached query data to avoid stale authenticated sessions.

## Performance and Maintainability Notes

- API cancellation is supported through React Query signals passed into Axios requests.
- Debounced and deferred crypto search prevents re-filtering on every keystroke burst.
- Service modules each target one API domain and return typed data only.
- Presentation components remain free of API calls and business logic.
