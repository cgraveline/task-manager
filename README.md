# Task Manager

A polished React + TypeScript + MUI task board with local persistence, theme control, tests, and Cypress coverage.

## Setup

```bash
npm install
```

## Run locally

```bash
npm run dev
```

## Test

```bash
npm run test
npm run build
npm run e2e
```

To run Cypress directly:

```bash
npx cypress run
```

If you want to run a single spec:

```bash
npx cypress run --spec cypress/e2e/task-manager.cy.ts
```

## Notes

- Tasks persist in `localStorage`.
- Theme defaults to system preference and can be switched to light or dark.
- If storage is unavailable or corrupted, the app safely falls back to in-memory state.
