# PokémonKu

A web app to explore Pokémon and Berry data from [PokéAPI](https://pokeapi.co). Browse, search, view details, and add your own custom Pokémon or Berry.

**Live:** [pokemonku-reynaldirp.vercel.app](https://pokemonku-reynaldirp.vercel.app)
**Author:** [reynaldirp.vercel.app](https://reynaldirp.vercel.app)

## Stack

- Next.js 15 (App Router)
- Tailwind CSS v4
- TanStack Query v5
- React Hook Form + Yup
- Motion
- Vitest + Testing Library

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

Create a `.env` file at the project root:

```env
NEXT_PUBLIC_POKEAPI_BASE_URL=https://pokeapi.co/api/v2
```

## Features

**Pokémon Library** (`/pokemon`)

- Browse 1000+ Pokémon with pagination
- Search by name (min 3 characters)
- Filter: All / API / Custom
- Detail view: types, abilities, base stats
- Add custom Pokémon (name, types, abilities, stats)
- Delete custom Pokémon

**Berry Library** (`/berries`)

- Browse all berries with pagination
- Search by name and filter: All / API / Custom
- Detail view: firmness, flavors, natural gift type, and stats (size, growth time, etc.)
- Add custom Berry (name, natural gift type, flavors, smoothness, firmness)
- Delete custom Berry

## Project Structure

```
modules/
  pokemon/         → everything related to pokemon
    actions/       → server actions (add, delete, get)
    components/    → feature UI components
    hooks/         → custom hooks (useGetPokemonList, useFilteredPokemons, etc.)
    mappers/       → transform data from API
    schemas/       → form validation (yup)
    services/      → fetch from PokéAPI (server & client)
    types/         → TypeScript types
    data/          → static constants (pokemon types, stats config)
  berries/         → same structure as pokemon
components/ui/     → shared UI (Button, Card, Modal, Input, etc.)
lib/               → utilities (api client, cn, useDebounce)
app/               → Next.js routes
data/              → JSON storage for custom pokemon/berry
```

## Architecture

**Microfrontend-style** — `pokemon` and `berries` modules are fully independent. No cross-imports between them. Shared code lives only in `components/ui/` and `lib/`.

**Data flow:**

```
Page (Server Component)
  └─ prefetchQuery → cached on server
       └─ HydrationBoundary
            └─ Client Component
                 └─ useQuery (reads from cache, no double fetch)
```

**Custom Pokémon/Berry** — stored in `data/*.json` via Server Actions. No database used, in line with the assessment scope. This approach works fine in standard Node.js environments (VPS, AWS EC2, etc.). For serverless platforms like Vercel, the storage layer needs to be replaced with a proper database (PostgreSQL, Redis, etc.) since the filesystem is read-only in production.

**Search** — client-side filter over the current page results. Pagination resets to page 1 when search is active since PokéAPI doesn't support server-side search by name.

**Custom URLs** — `/pokemon/custom/[id]` and `/berries/custom/[id]` use ID instead of name to avoid conflicts with API routes and URL encoding issues.

**Navbar** — hidden on the `/` page. Implemented using a `(main)` route group — `pokemon/` and `berries/` folders live inside `app/(main)/`, so the Navbar is only rendered on those pages without affecting the URL structure.

## UI Design

Uses a **Liquid Glass** effect — inspired by [this CodePen](https://codepen.io/Margarita-the-solid/pen/NPRPBjd). Dark background with glass/frosted elements that react to the content behind them.

## Caching

- **API responses** — cached at the fetch level with `revalidate: 3600` (1 hour)
- **Client state** — managed by TanStack Query, hydrated from the SSR cache

## Tests

```bash
npm run test
```

Files covered:

| File                                       | What's tested                                        |
| ------------------------------------------ | ---------------------------------------------------- |
| `pokemon/schemas/addPokemonSchema.test.ts` | Form validation: name, types, stats                  |
| `berries/schemas/addBerrySchema.test.ts`   | Form validation: name, flavors, firmness, smoothness |
| `pokemon/mappers/index.test.ts`            | Extract ID from URL, data shape                      |
| `berries/mappers/index.test.ts`            | Extract ID from URL, data shape                      |
| `pokemon/actions/addCustomPokemon.test.ts` | Add, delete, get — mock fs & revalidatePath          |
| `berries/actions/addCustomBerry.test.ts`   | Add, delete, get — mock fs & revalidatePath          |
| `lib/useDebounce.test.ts`                  | Debounce timing                                      |
