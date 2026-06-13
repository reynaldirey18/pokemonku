# Pokémon Explorer

Web app untuk explore data Pokémon dan Berry dari [PokéAPI](https://pokeapi.co). Bisa search, lihat detail, dan tambah Pokémon/Berry custom sendiri.

**Live:** [pokemonku-reynaldirp.vercel.app](https://pokemonku-reynaldirp.vercel.app)
**Author:** [reynaldirp.vercel.app](https://reynaldirp.vercel.app)

## Stack

- Next.js 15 (App Router)
- Tailwind CSS v4
- TanStack Query v5
- React Hook Form + Yup
- Motion
- Vitest + Testing Library

## Cara Jalankan

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

### Environment Variables

Buat file `.env` di root project:

```env
NEXT_PUBLIC_POKEAPI_BASE_URL=https://pokeapi.co/api/v2
```

## Fitur

**Pokémon Library** (`/pokemon`)
- Browse 1000+ Pokémon dengan pagination
- Search by name (min 3 karakter)
- Filter: Semua / API / Custom
- Detail: types, abilities, base stats
- Tambah Pokémon custom (nama, tipe, abilities, stats)
- Hapus Pokémon custom

**Berry Library** (`/berries`)
- Browse semua berry dengan pagination
- Search by name dan filter: Semua / API / Custom
- Detail: firmness, flavors, natural gift type, dan stats (size, growth time, dll)
- Tambah Berry custom (nama, natural gift type, flavors, smoothness, firmness)
- Hapus Berry custom

## Struktur Project

```
modules/
  pokemon/         → semua yang berhubungan dengan pokemon
    actions/       → server actions (add, delete, get)
    components/    → UI components per fitur
    hooks/         → custom hooks (useGetPokemonList, useFilteredPokemons, dll)
    mappers/       → transform data dari API
    schemas/       → validasi form (yup)
    services/      → fetch ke PokéAPI (server & client)
    types/         → TypeScript types
    data/          → konstanta statis (tipe pokemon, config stats)
  berries/         → struktur sama dengan pokemon
components/ui/     → shared UI (Button, Card, Modal, Input, dll)
lib/               → utilities (api client, cn, useDebounce)
app/               → Next.js routes
data/              → JSON storage untuk custom pokemon/berry
```

## Arsitektur

**Microfrontend-style** — modul `pokemon` dan `berries` berdiri sendiri. Tidak saling import satu sama lain. Shared code hanya di `components/ui/` dan `lib/`.

**Data flow:**
```
Page (Server Component)
  └─ prefetchQuery → cache di server
       └─ HydrationBoundary
            └─ Client Component
                 └─ useQuery (ambil dari cache, tidak double fetch)
```

**Custom Pokemon/Berry** — disimpan di `data/*.json` via Server Action. Tidak pakai database, sesuai scope assessment.

**Search** — client-side filter dari hasil per page. Pagination otomatis jadi 1 halaman saat search aktif karena PokéAPI tidak support server-side search by name.

**URL Custom** — `/pokemon/custom/[id]` dan `/berries/custom/[id]` (by ID bukan name) untuk hindari konflik dengan route API dan masalah karakter di URL.

## UI Design

Tampilan pakai efek **Liquid Glass** — terinspirasi dari [CodePen ini](https://codepen.io/Margarita-the-solid/pen/NPRPBjd). Background gelap dengan elemen glass/frosted yang responsif terhadap konten di belakangnya.

## Caching

- **API responses** — di-cache di fetch level dengan `revalidate: 3600` (1 jam)
- **Client state** — dikelola TanStack Query, di-hydrate dari SSR cache

## Tests

```bash
npm run test
```

File yang di-cover:

| File | Yang ditest |
|---|---|
| `pokemon/schemas/addPokemonSchema.test.ts` | Validasi form: nama, tipe, stats |
| `berries/schemas/addBerrySchema.test.ts` | Validasi form: nama, flavors, firmness, smoothness |
| `pokemon/mappers/index.test.ts` | Extract ID dari URL, shape data |
| `berries/mappers/index.test.ts` | Extract ID dari URL, shape data |
| `pokemon/actions/addCustomPokemon.test.ts` | Add, delete, get — mock fs & revalidatePath |
| `berries/actions/addCustomBerry.test.ts` | Add, delete, get — mock fs & revalidatePath |
| `lib/useDebounce.test.ts` | Debounce timing |
