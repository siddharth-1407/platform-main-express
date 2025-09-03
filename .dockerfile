# -------- Stage 1: Build the TypeScript code --------
    FROM node:20-slim AS build

    WORKDIR /usr/src/app

    # Copy package files first for caching
    COPY package*.json ./

    # Install deps (including devDeps for build)
    RUN npm install

    # Copy the full project (including src + apryse binaries)
    COPY . .

    # Build TypeScript -> dist/
    RUN npm run build


    # -------- Stage 2: Runtime container --------
    FROM node:20-slim

    WORKDIR /usr/src/app

    # Copy only package.json + lock first
    COPY package*.json ./

    # Install production dependencies
    RUN npm install --omit=dev

    # Copy build output
    COPY --from=build /usr/src/app/dist ./dist

    # Copy Apryse Linux binaries (only StructuredOutputLinux)
    COPY --from=build /usr/src/app/src/lib/apryse/StructuredOutputLinux ./src/lib/apryse/StructuredOutputLinux

    # Copy any helper utils if needed
    COPY --from=build /usr/src/app/src/lib/utils.ts ./src/lib/utils.ts

    # Run postinstall to fix permissions for StructuredOutput binaries
    RUN npm run postinstall || true

    # Expose port for Cloud Run
    EXPOSE 8080

    CMD ["node", "dist/server.js"]
