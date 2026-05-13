# syntax=docker/dockerfile:1.7
# Build context = repo root (workspace-aware).

FROM node:20-alpine AS base
ENV PNPM_HOME=/pnpm \
    PATH=/pnpm:$PATH \
    CI=true
RUN corepack enable
WORKDIR /repo

# ---- deps: install all workspace deps using the root lockfile ----
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY backend/package.json backend/package.json
COPY frontend/package.json frontend/package.json
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm config set store-dir /pnpm/store && \
    pnpm install --frozen-lockfile

# ---- build: compile NestJS and deploy isolated prod bundle ----
FROM deps AS build
COPY backend backend
RUN pnpm --filter backend build && \
    pnpm --filter backend --prod deploy /out && \
    cp -r backend/dist /out/dist

# ---- prod: minimal runtime image ----
FROM node:20-alpine AS prod
ENV NODE_ENV=production
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nestjs
COPY --from=build --chown=nestjs:nodejs /out/node_modules ./node_modules
COPY --from=build --chown=nestjs:nodejs /out/dist ./dist
COPY --from=build --chown=nestjs:nodejs /out/package.json ./package.json
USER nestjs
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q --spider http://localhost:3000/health || exit 1
CMD ["node", "dist/main.js"]
