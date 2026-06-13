# Pokémon Explorer

Web app untuk explore data Pokémon dan Berry dari [PokéAPI](https://pokeapi.co). Bisa search, lihat detail, dan tambah Pokémon/Berry custom sendiri.

## Stack

- Next.js 15 (App Router)
- Tailwind CSS v4
- TanStack Query v5
- React Hook Form + Yup
- Framer Motion
- Vitest + Testing Library

## Cara Jalankan

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

## Fitur

**Pokémon Library** (`/pokemon`)
- Browse 1000+ Pokémon dengan pagination
- Search by name (min 3 karakter)
- Filter: Semua / API / Custom
- Detail: types, abilities, base stats
- Tambah Pokémon custom (nama, tipe, abilities, stats)

**Berry Library** (`/berries`)
- Browse semua berry
- Search dan pagination
- Detail tiap berry
- Tambah Berry custom

## Struktur Project

```
modules/
  pokemon/         → semua yang berhubungan dengan pokemon
    actions/       → server actions (add, get)
    components/    → UI components per fitur
    hooks/         → custom hooks (useGetPokemonList, useFilteredPokemons, dll)
    mappers/       → transform data dari API
    schemas/       → validasi form (yup)
    services/      → fetch ke PokéAPI
    types/         → TypeScript types
  berries/         → struktur sama
components/ui/     → shared UI (Button, Card, Modal, dll)
lib/               → utilities (cn, useDebounce)
app/               → Next.js routes
data/              → JSON storage untuk custom pokemon/berry
```

## UI Design

Tampilan pakai efek **Liquid Glass** — terinspirasi dari [CodePen ini](https://codepen.io/Margarita-the-solid/pen/NPRPBjd). Background gelap dengan elemen glass/frosted yang responsif terhadap konten di belakangnya.

## Technical Notes

**Server vs Client fetch** — list dan detail pokemon di-prefetch di server (HydrationBoundary), lanjut di client pakai TanStack Query cache. Tidak ada double fetch.

**Custom Pokemon/Berry** — disimpan di `data/*.json` via Server Action. Tidak pakai database, sesuai scope assessment.

**Search** — client-side filter dari 20 item per page. Pagination otomatis jadi 1 halaman saat search aktif karena PokéAPI tidak support server-side search.

**URL Custom Pokemon** — `/pokemon/custom/[id]` (bukan by name) untuk hindari konflik dengan API pokemon dan masalah spasi di URL.

## Tests

```bash
npm run test
```

Coverage: mapper, schema validation, useDebounce hook.
