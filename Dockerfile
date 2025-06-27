###################################
# Base Stage                     #
###################################
FROM node:22-bookworm-slim AS base

LABEL Maintainer="Mahdi Haghverdi <mahdihaghverdiliewpl@gmail.com>"

RUN apt-get update -y && \
    apt-get upgrade -y && \
    apt-get install -y openssl && \
    apt-get install -y bash

WORKDIR /app
COPY ./ ./

###################################
# Build Stage                     #
###################################
FROM base AS build

RUN npm ci && \
    npx tsoa spec-and-routes && \
    npx prisma generate --schema=./src/db/schema.prisma && \
    npx tsc

###################################
# Runtime Stage                   #
###################################
FROM base AS runtime

WORKDIR /app

COPY --from=build /app/package*.json /app/src/db /app/entrypoint.sh ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/build ./build

ENTRYPOINT ["./entrypoint.sh"]
RUN chmod 755 ./entrypoint.sh

CMD ["npm", "start"]
