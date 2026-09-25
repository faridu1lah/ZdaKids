# ZdaKids

Production-oriented starter monorepo for a learning app for children aged 3–8.
It contains a NestJS REST API, an Expo mobile app, and small shared TypeScript
packages. Product modules are intentionally not implemented yet.

## Stack

- pnpm workspaces and Turborepo
- TypeScript across apps and packages
- NestJS, Swagger, Prisma ORM, and PostgreSQL
- Expo, React Native, Expo Router, TanStack Query, and Zustand
- English and Pashto localization with RTL-aware layouts

## Prerequisites

- Node.js 22.13 or newer
- pnpm 11 or newer
- Docker with Docker Compose
- Expo Go, an iOS Simulator, or an Android Emulator for mobile development

## Local setup

```bash
pnpm install
cp apps/api/.env.example apps/api/.env
cp apps/mobile/.env.example apps/mobile/.env.local
docker compose up -d postgres
pnpm db:generate
pnpm dev
```

`pnpm dev` starts the API and Expo development server through Turborepo.

- API: http://localhost:3000/api
- Health: http://localhost:3000/api/health
- Swagger: http://localhost:3000/docs
- Expo development server: shown in the terminal (normally port 8081)

For an iOS simulator or web browser, set `EXPO_PUBLIC_API_URL` to
`http://localhost:3000/api`. The Android emulator defaults to
`http://10.0.2.2:3000/api`. A physical device must use the computer's LAN IP,
and the phone and computer must be on the same network.

## Useful commands

```bash
pnpm dev:api          # API only
pnpm dev:mobile       # Expo only
pnpm build            # build every workspace
pnpm lint             # lint every workspace
pnpm typecheck        # type-check every workspace
pnpm test             # unit tests
pnpm db:migrate       # create/apply a Prisma development migration
pnpm db:studio        # open Prisma Studio
docker compose down   # stop PostgreSQL, preserving its volume
```

After adding Prisma models, run `pnpm db:migrate -- --name <migration-name>`.

## Architecture

```text
.
├── apps
│   ├── api
│   │   ├── prisma
│   │   └── src
│   │       ├── config
│   │       ├── database
│   │       └── modules
│   │           ├── auth
│   │           └── health
│   └── mobile
│       └── src
│           ├── app
│           ├── lib
│           ├── localization
│           └── store
├── packages
│   ├── config
│   └── types
├── docker-compose.yml
├── pnpm-workspace.yaml
└── turbo.json
```

Backend features should be vertical Nest modules under `apps/api/src/modules`.
The empty auth boundary is reserved for parent identity, guards, and token logic.
Mobile routes stay in `src/app`; networking, state, and localization remain outside
the route tree. Shared packages should contain only platform-neutral code.

## Recommended next step

Implement parent authentication and the first parent/child-profile data model as
one thin end-to-end slice: add the Prisma migration, authentication module,
documented REST endpoints, secure token storage on mobile, and a child picker.
That establishes ownership and authorization rules before courses, progress,
offline sync, rewards, stories, games, or audio are added.
