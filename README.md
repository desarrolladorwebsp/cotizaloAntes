# Cotízalo Antes

Base técnica de la plataforma de cotización de productos financieros y aseguradores.

**Dominio:** https://cotizaloantes.cl  
**Hosting:** Vercel

## Stack

- Next.js 15 (App Router)
- TypeScript (strict)
- Tailwind CSS v4
- Motion
- React Hook Form + Zod
- Zustand
- TanStack Query
- Axios
- Lucide React

## Inicio rápido

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo (Turbopack) |
| `npm run build` | Build de producción |
| `npm run start` | Servidor de producción |
| `npm run lint` | ESLint |
| `npm run lint:fix` | ESLint con auto-fix |
| `npm run format` | Prettier |
| `npm run typecheck` | Verificación de tipos |

## Arquitectura

Feature Driven Architecture organizada por dominios de producto.

```
src/
├── app/              # App Router: rutas, layouts, metadata, SEO
├── components/
│   ├── ui/           # Design System (componentes reutilizables)
│   ├── layout/       # Componentes de layout global
│   └── providers/    # Providers de React (Query, Motion)
├── features/         # Módulos de negocio por dominio
│   ├── insurance/    # Seguros (activo)
│   └── isapre/       # Isapres (futuro)
├── hooks/            # Hooks compartidos
├── services/         # Clientes API y servicios externos
├── stores/           # Estado global (Zustand)
├── lib/              # Utilidades, Motion, validación
├── types/            # Tipos TypeScript compartidos
├── constants/        # Constantes y configuración
└── styles/           # Estilos globales y tokens
```

### Responsabilidad por carpeta

| Carpeta | Responsabilidad |
|---------|-----------------|
| `app/` | Routing, layouts, metadata, páginas |
| `components/ui/` | Design System sin lógica de negocio |
| `components/layout/` | Estructura visual reutilizable |
| `features/` | Lógica de negocio aislada por dominio |
| `hooks/` | Hooks transversales |
| `services/` | Comunicación con APIs |
| `stores/` | Estado global de UI/app |
| `lib/` | Utilidades puras, Motion, Zod |
| `types/` | Contratos TypeScript |
| `constants/` | Valores estáticos y config |

### Estructura por feature

```
features/[domain]/
├── components/
├── hooks/
├── services/
├── stores/
├── types/
├── schemas/
├── utils/
└── index.ts
```

## Convenciones

### Nombres de archivos

- Componentes: `kebab-case.tsx` (ej. `quote-card.tsx`)
- Hooks: `use-kebab-case.ts`
- Stores: `kebab-case-store.ts`
- Tipos: `kebab-case.ts`

### Imports

- Usar alias `@/` para imports absolutos
- Orden: externos → internos → tipos → estilos
- Preferir `import type` para tipos

### Componentes

- Server Components por defecto
- `"use client"` solo cuando sea necesario (estado, efectos, Motion)
- Props tipadas con interfaces exportadas

### Features

- Cada dominio expone su API pública vía `index.ts`
- No importar internamente entre features; usar `services/` o eventos
- Dominios futuros: `afp`, `credit`, `financial`

## Sistema de diseño

Tokens definidos en `src/styles/globals.css`:

| Token | Valor |
|-------|-------|
| Primary | `#F58220` |
| Secondary | `#1A1A1A` |
| Background | `#F8F8F8` |
| Border | `#E5E5E5` |
| Success | `#16A34A` |
| Error | `#DC2626` |
| Warning | `#F59E0B` |

Componentes base: Button, Input, Select, Textarea, Card, Badge, Modal, Drawer, Skeleton, Loader.

## Motion

Configuración centralizada en `src/lib/motion/`:

- Variants: `fadeIn`, `fadeInUp`, `scaleIn`, `slideInRight`, `slideInBottom`, `stagger`
- Duraciones: fast (150ms), normal (250ms), slow (400ms)
- LazyMotion habilitado para performance

## Mobile First

- `min-h-dvh` en lugar de `100vh`
- Safe areas: `safe-area-padding`, `safe-area-top`, `safe-area-bottom`
- `viewport-fit: cover` configurado
- Sin scroll horizontal (`overflow-x: hidden`)

## SEO

- Metadata global en `app/layout.tsx`
- Open Graph y Twitter Cards configurados
- `sitemap.ts` y `robots.ts` listos
- `metadataBase` apuntando a producción

## Variables de entorno

```env
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_SITE_URL=https://cotizaloantes.cl
```

## Despliegue (Vercel)

1. Conectar repositorio en Vercel
2. Configurar variables de entorno
3. Deploy automático en cada push
