# ---------- Base ----------
FROM node:22-alpine AS base

RUN npm install -g pnpm@10.10.0

WORKDIR /app


# ---------- Build ----------
FROM base AS build

COPY . .

# cache pnpm store
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

# build only api service
RUN pnpm --filter api build

# deploy production bundle
RUN pnpm --filter api --prod deploy /pruned --legacy


# ---------- Runtime ----------
FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=build /pruned .

ENV NODE_ENV=production

EXPOSE 4000

CMD ["node","dist/server.js"]