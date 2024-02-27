ARG NODE_VERSION=20.10.0
# base image
FROM node:${NODE_VERSION}-slim as base

# Set output property to standalone for minimal image size
ENV BUILD_STANDALONE="true"

# Disable telemetry
ENV NEXT_TELEMETRY_DISABLED="1"

# Set environment variables needed for the build process
ARG NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL}

ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY}

ARG NEXT_PUBLIC_SOCKET_URL
ENV NEXT_PUBLIC_SOCKET_URL=${NEXT_PUBLIC_SOCKET_URL}

# Install openssl for Prisma
RUN apt-get update && apt-get install -y openssl

# Install pnpm
ARG PNPM_VERSION=8.15.1
RUN npm install -g pnpm@$PNPM_VERSION

# Install dependencies
FROM base as deps
WORKDIR /app

# Install node modules
COPY --link package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Build the application
FROM base as build
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./package.json
COPY --from=deps /app/pnpm-lock.yaml ./pnpm-lock.yaml

# Generate Prisma Client
COPY --link prisma .
RUN npx prisma generate

# Copy application code
COPY --link . .

# Build application
RUN pnpm build

# Production image
FROM base as prod
WORKDIR /app

COPY --from=build /app/public ./public
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static

EXPOSE 3000
CMD [ "node", "server.js" ]
