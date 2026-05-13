# syntax=docker/dockerfile:1.7
# Build context = repo root (workspace-aware).

FROM node:20-alpine AS base
ENV PNPM_HOME=/pnpm \
    PATH=/pnpm:$PATH \
    CI=true
RUN apk add --no-cache libc6-compat && corepack enable
WORKDIR /repo

# ---- deps: install all workspace deps using the root lockfile ----
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY backend/package.json backend/package.json
COPY frontend/package.json frontend/package.json
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm config set store-dir /pnpm/store && \
    pnpm install --frozen-lockfile

# ---- build: produce Next.js standalone output ----
FROM deps AS build
ENV NEXT_TELEMETRY_DISABLED=1
COPY frontend frontend
RUN pnpm --filter frontend build

# ---- runner: minimal runtime image using standalone output ----
FROM node:20-alpine AS runner
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# With outputFileTracingRoot set to the repo root, standalone preserves
# the workspace layout (frontend/server.js, node_modules at root, ...).
COPY --from=build --chown=nextjs:nodejs /repo/frontend/public ./frontend/public
COPY --from=build --chown=nextjs:nodejs /repo/frontend/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /repo/frontend/.next/static ./frontend/.next/static

USER nextjs
EXPOSE 3000
CMD ["node", "frontend/server.js"]
