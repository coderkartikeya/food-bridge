# ---------- Dependencies ----------
FROM node:20-alpine AS deps

WORKDIR /app

RUN npm install -g pnpm

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/web/package.json apps/web/

RUN pnpm install --frozen-lockfile


# ---------- Build ----------
FROM deps AS build

WORKDIR /app

COPY . .

RUN pnpm --filter web build


# ---------- Runtime ----------
FROM nginx:alpine

COPY --from=build /app/apps/web/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]