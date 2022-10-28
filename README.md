# Getting Started with [Poddit](https://poddit.netlify.app/)

## Setup

- Clone Repository
- Run:

```
npm install
```

- Start Dev-Server:

```
npm start
```

## Folder Structure

```
src
├── pages --> Screens
├── routing --> Routing Options (Routes)
├── components --> JSX Components
└── states --> Zustand State Management Files
.husky
└── --> Commit Hooks
cypress
└── --> E2E Tests (Tests, Mocks)
```

## Testing (local)

Unit tests run automatically before commiting

### Manual Unit+Integration Tests:

```
npm test
```

### Manual End to End tests:

```
npm run cypress:open
```

## Linter / Prettier

Linter Check runs automatically before committing

### Check for linting errors:

```
npm run lint:github-actions
```

### Fix linting errors:

```
npm run prettier:fix
```

## Contributing to this Project

### Workflow:

1. Create Feature branch from "main"
2. Contribute
3. Run test/linter locally (see [Testing (local)](<#Testing-(local)>) and [Linter / Prettier](#Linter-/-Prettier))
4. Commit Changes - Tests and Linter will run automatically
5. Create Pullrequest to "main"
6. Checks will run within Github Actions (Linter, Unit Tests, E2E Tests)
7. Pullrequest gets approved
8. ✨ You Contributed successful to this project ✨

## Deployment

This Project makes use of Continues Deployment, every code change on the "main" branch results in a Deployment. Therefore the main Branch is protected from direct committing (see also [Workflow](#workflow)).

### Preview Deployment

If you want to deploy your feature branch in a production like environment you can create a pullrequest to main with the label prefix "WIP:". The pullrequest will trigger a preview deployment on Netlify which can be found on github within the pullrequest.
