# Unified Data Hub Beginner Guide

This guide explains the project in simple technical terms so you can understand both this codebase and the React basics behind it.

## 1. What This Project Is

This is a React application built with TypeScript.

Its job is to collect data from multiple external APIs and show them in one dashboard:

- Login data from DummyJSON
- Users, posts, and comments from JSONPlaceholder
- Cryptocurrency market data from CoinGecko
- Weather data from Open-Meteo

The project is not just a small React app. It is structured like a professional application using:

- Clean Architecture
- SOLID thinking
- React Query for server data
- Zustand for client-side state
- React Router for navigation
- Axios for API requests

## 2. React Basics First

Before understanding the folder structure, it helps to understand a few React ideas.

### Component

A component is a piece of UI.

Example ideas:

- A button
- A page
- A sidebar
- A table row

In React, the UI is built by combining many small components.

### Props

Props are inputs passed from one component to another.

Example:

```tsx
function Welcome({ name }: { name: string }) {
  return <h1>Hello {name}</h1>
}
```

Here, `name` is a prop.

### State

State is data that changes while the app is running.

Example:

- Which user is selected
- Whether dark mode is enabled
- What text is inside a search box

React state usually lives inside a component with `useState`, or globally in a store like Zustand.

### Hooks

Hooks are React functions that add behavior.

Common examples:

- `useState` for local state
- `useEffect` for side effects
- Custom hooks like `useUsers` for reusable logic

This project uses many custom hooks because they help keep components clean.

### Rendering

Rendering means React turns your component code into visible UI.

When state changes, React renders again and updates the screen.

### Routing

Routing decides which page is shown based on the URL.

Example:

- `/login`
- `/dashboard`
- `/users`
- `/crypto`
- `/weather`

React Router handles this in this project.

## 3. How the App Starts

When the app starts, these files are the main entry path:

1. `index.html`
2. `src/main.tsx`
3. `src/App.tsx`
4. Providers are loaded
5. Router decides which page to show

### Step-by-step

#### `src/main.tsx`

This is where React is attached to the browser page.

It renders the main `App` component into the `root` element.

#### `src/App.tsx`

This is the top-level React component.

It does not contain page logic itself. Instead, it wraps the app with providers and routing.

That is a good architectural choice because `App.tsx` stays simple.

## 4. Big Picture Data Flow

This is the most important part of the project.

When you click something in the UI, the request does not go directly from the button to the API.

It follows layers.

```text
Presentation -> Application -> Infrastructure -> External API
                     |
                   Domain
```

That means:

1. A page or component asks for data
2. A custom hook in the application layer handles the logic
3. A service in infrastructure makes the API request
4. The response comes back
5. React Query stores and caches server data
6. The component renders the result

This separation makes the project easier to understand, test, and grow.

## 5. Folder-by-Folder Explanation

## `src/app`

This folder contains application setup code.

It is the place where the app is wired together.

### `src/app/providers`

Providers wrap the whole app and make shared functionality available.

Examples in this project:

- Query provider for React Query
- Theme provider for theme handling
- App providers that combine everything

Why this matters:

- React Query needs a provider so queries work everywhere
- Theme setup needs a provider so the whole app can react to theme changes

Think of providers as global wrappers around the app.

### `src/app/routes`

This folder handles navigation.

Important ideas here:

- Route definitions
- Protected routes
- Redirects

The `ProtectedRoute` component checks whether a user is logged in.

If the user has no token, they are sent to `/login`.

This is a common React Router pattern.

### `src/app/store`

This folder contains Zustand stores.

Zustand is used only for client-side state in this project.

Examples:

- Auth token
- Logged-in user info
- Theme mode

Very important rule in this app:

- API data is not stored in Zustand
- API data is stored in React Query

This is good architecture because client state and server state are different problems.

## `src/domain`

This is the core business shape of the app.

The domain layer defines what the application talks about.

### `src/domain/models`

This folder contains TypeScript interfaces and model definitions.

Examples:

- `User`
- `Post`
- `Comment`
- `AuthSession`
- `CryptoMarket`
- `WeatherForecast`

Why this matters:

- It tells TypeScript what data should look like
- It reduces bugs
- It makes services and components easier to understand

If an API returns a user, the code already knows what fields that user should have.

### `src/domain/types`

This is for shared types used across the app.

Examples:

- General API error shape
- Utility generic types

The domain layer should not know about React, UI, buttons, or styling.

It should only know about data structures and meaning.

## `src/infrastructure`

This layer talks to the outside world.

In this project, the outside world means APIs.

### `src/infrastructure/api`

This folder contains Axios setup.

#### `axiosInstance.ts`

This file creates API clients.

Important things it does:

- Sets base URLs
- Sets timeout
- Adds request interceptors
- Adds response interceptors

##### Request interceptor

Before a request is sent, the app checks Zustand for the auth token.

If a token exists, it attaches:

```text
Authorization: Bearer <token>
```

##### Response interceptor

If an error happens, it converts it into a consistent error shape.

That makes error handling easier in the UI.

#### `endpoints.ts`

This file stores endpoint paths in one place.

This is useful because:

- URLs are easier to manage
- You avoid repeating strings everywhere
- Changing endpoints becomes easier later

### `src/infrastructure/services`

Services are small modules that call one API domain each.

Examples:

- `authService.ts`
- `userService.ts`
- `cryptoService.ts`
- `weatherService.ts`

Each service:

- Calls one API domain
- Returns typed data
- Does not contain UI code

This is one of the most important architectural rules in the project.

For example, `userService` knows how to fetch users and posts, but it does not know anything about React components.

## `src/application`

This layer contains use cases and orchestration.

It sits between UI and infrastructure.

### `src/application/hooks`

This folder contains custom hooks such as:

- `useAuth`
- `useUsers`
- `usePosts`
- `useComments`
- `useCrypto`
- `useWeather`

These hooks are extremely important.

They do things like:

- Call service functions
- Use React Query
- Decide when a request should run
- Transform data
- Return clean data to the UI

Why this matters:

Without these hooks, page components would become large and messy.

With these hooks, the page can simply say:

```tsx
const usersQuery = useUsers()
```

That is much easier to read than writing request logic directly in the page.

## `src/presentation`

This is the UI layer.

It shows things to the user.

This layer should not directly call APIs.

### `src/presentation/pages`

Pages are route-level screens.

Examples:

- Login page
- Dashboard page
- Users page
- Crypto page
- Weather page

Each page takes data from hooks and renders UI.

### `src/presentation/components`

These are reusable UI blocks.

Examples:

- Loader
- Error state
- Empty state
- Search input
- Section card
- Stat card
- Theme toggle

Why this matters:

If you reuse the same UI patterns, the code stays smaller and more consistent.

### `src/presentation/layouts`

Layouts are bigger UI wrappers around pages.

Examples:

- Auth layout
- App layout with sidebar

Layouts help avoid repeating the same page shell over and over.

## `src/shared`

This folder contains reusable pieces used in different layers.

### `src/shared/constants`

Stores values that should not be rewritten in many places.

Examples:

- Route paths
- Query keys
- Default credentials
- Theme storage keys

### `src/shared/hooks`

Reusable hooks not tied to a specific feature.

Example:

- Debounce hook for search

### `src/shared/utils`

Pure helper functions.

Examples:

- Format currency
- Format numbers
- Normalize API errors

These functions are not UI components and are not API services. They are small utilities.

## 6. How Each Main Feature Works

## Login Flow

When the user logs in:

1. The login form is shown in the presentation layer
2. The form calls `useAuth`
3. `useAuth` uses `useMutation` from React Query
4. That mutation calls `authService.login()`
5. `authService` sends a request to DummyJSON
6. The response comes back with token and user info
7. Zustand stores the token and user
8. The app navigates to `/dashboard`

Important learning point:

- The component does not call Axios directly
- The hook and service handle the work

## Users, Posts, Comments Flow

When you open the Users page:

1. The page calls `useUsers`
2. React Query fetches the users list
3. When you click a user, the selected user ID is stored in component state
4. `usePosts(selectedUserId)` runs
5. When you click a post, `useComments(selectedPostId)` runs

This is a good example of lazy loading.

The app does not fetch all comments for all posts at once.

It fetches only what is needed.

## Crypto Flow

When you open the Crypto page:

1. The page stores search and sort values in local component state
2. `useCrypto` fetches the market list with React Query
3. Search text is debounced
4. The filtered list is sorted
5. The page renders the result

Important point:

- Server data is from React Query
- Search and sorting preferences are local UI state

That is the correct separation.

## Weather Flow

When you open the Weather page:

1. The page calls `useWeather`
2. React Query fetches current weather
3. The query auto-refreshes using a refetch interval
4. The page can also manually trigger `refetch()`

This teaches an important React Query concept:

- Queries can automatically refresh when needed

## 7. Why React Query Is Used

React Query is used for server state.

Server state is data that comes from an API.

Examples:

- Users list
- Posts list
- Weather data
- Crypto data

Why not store this in Zustand?

Because server data needs special features:

- Caching
- Loading state
- Error state
- Retry behavior
- Refetching
- Invalidation

React Query is built exactly for that.

## 8. Why Zustand Is Used

Zustand is used for small, app-level client state.

Examples in this project:

- Auth token
- Logged-in user
- Theme

This is data created and owned by the client app, not fetched as a cacheable resource list.

## 9. Clean Architecture in Simple Words

Clean Architecture means the app is separated by responsibility.

Simple version:

- Presentation shows data
- Application decides what to do
- Infrastructure talks to APIs
- Domain defines the data shapes

Why this helps:

- Easier to read
- Easier to change
- Easier to debug
- Easier to scale

## 10. SOLID in Simple Words

This project tries to follow SOLID thinking.

### Single Responsibility Principle

Each part should do one kind of job.

Examples:

- Components render UI
- Services call APIs
- Hooks orchestrate behavior
- Models define data shapes

### Open/Closed Principle

The code should be easy to extend without rewriting everything.

Example:

- You can add another service or page without changing the entire structure

### Liskov Substitution Principle

This matters more in object-oriented systems, but the main idea is to keep contracts predictable.

In TypeScript here, predictable interfaces help with that.

### Interface Segregation Principle

Use small, focused contracts instead of huge ones.

Example:

- Separate model interfaces for auth, weather, crypto, and users

### Dependency Inversion Principle

Higher-level code should not depend directly on low-level details.

Example:

- Pages depend on hooks
- Hooks depend on services
- Services depend on Axios clients

The page does not directly depend on raw API code.

## 11. How to Read a File in This Project

When you open a file, ask these questions:

1. Which layer is this file in?
2. What is this file responsible for?
3. Does it break separation of concerns?
4. Where does data come from?
5. Where does data go next?

Examples:

- If you open a page file, expect rendering logic
- If you open a service file, expect API logic
- If you open a model file, expect types only

## 12. Good Beginner Reading Order

If you want to study the project slowly, use this order:

1. `src/main.tsx`
2. `src/App.tsx`
3. `src/app/providers/AppProviders.tsx`
4. `src/app/routes/router.tsx`
5. `src/presentation/layouts/AppLayout.tsx`
6. `src/presentation/pages/LoginPage.tsx`
7. `src/application/hooks/useAuth.ts`
8. `src/infrastructure/services/authService.ts`
9. `src/infrastructure/api/axiosInstance.ts`
10. `src/presentation/pages/UsersPage.tsx`
11. `src/application/hooks/useUsers.ts`
12. `src/infrastructure/services/userService.ts`

That reading order helps you move from UI to logic to API.

## 13. Common Beginner Confusions in This Project

### “Why are there so many layers?”

Because small apps can put everything in one file, but real apps become hard to manage that way.

Layers reduce confusion later.

### “Why not fetch in the component?”

Because the component should focus on showing UI.

If it also handles requests, retries, caching, transformation, and navigation, it becomes hard to maintain.

### “Why do hooks exist when services already exist?”

Because services only fetch data.

Hooks connect that data to React.

Hooks know about:

- React Query
- loading state
- error state
- enabled conditions
- navigation side effects

Services should not know about those things.

### “Why TypeScript models?”

Because they make data safer and easier to understand.

Without models, you would keep guessing what fields exist.

## 14. What You Should Learn Next

To understand this project better, focus on these topics one by one:

1. React components and JSX
2. `useState`
3. Props
4. Custom hooks
5. React Router basics
6. React Query basics
7. Zustand basics
8. TypeScript interfaces
9. Async API calls with Axios

## 15. Final Mental Model

If you remember only one thing, remember this:

```text
Pages render UI.
Hooks control feature logic.
Services call APIs.
Models describe data.
Stores keep client-only global state.
```

That sentence explains most of the architecture.

## 16. Short Summary of Each Folder

```text
app            = app setup and wiring
application    = feature logic through hooks
domain         = data contracts and models
infrastructure = API clients and services
presentation   = UI
shared         = reusable helpers
```

If you understand that summary clearly, you already understand the main architecture of the project.
