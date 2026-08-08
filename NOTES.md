# Notes

## 1. What did you prioritize?
Production realism over breadth. For a task-board admin UI, I prioritized a clean information hierarchy, strict TypeScript modeling, defensive localStorage handling, and interactions that are easy to explain, test, and maintain.

## 2. What trade-offs did you make?
I chose explicit status controls instead of drag-and-drop. That keeps the implementation simpler, more accessible, and easier to prove with Cypress while still covering the core workflow completely. I also kept state local instead of introducing global machinery that this scope does not need.

## 3. What would you improve next?
Before shipping to production, I would harden observability and QA: add analytics/error reporting, expand automated coverage, verify accessibility with real keyboard and screen-reader passes, and tighten visual regression review. I would also review storage/migration behavior, cross-tab sync, and failure modes around corrupted local data.

## Design decisions
- Three fixed columns keep the workflow aligned with the product's status model.
- Theme selection defaults to system preference and can be overridden with a persistent toggle.
- Validation is strict on title and forgiving on optional description, which matches how a real admin console should handle fast data entry.
- The UI leans polished and restrained rather than flashy so it reads like an internal product tool, not a demo.

## Scale
For a billion users, I would scale the frontend through code splitting, route- and feature-level lazy loading, aggressive caching, asset optimization, and careful data-fetching boundaries. The bigger win is usually keeping the interface fast, predictable, and cheap to re-render rather than adding more state layers.

## Debugging repeated API calls
I would trace the request source in DevTools, inspect React render patterns, compare request timing to component mounts/effects, and check whether retries, polling, or unstable dependencies are multiplying calls. Then I would narrow it down with logging and breakpoints, fix the root cause, and add a regression test so the behavior stays fixed.
