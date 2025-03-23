FROM node:22-alpine as base

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev
COPY ./ ./

###################################################
FROM base as build

RUN npx tsoa spec-and-routes && npx prisma generate --schema=./src/db/schema.prisma && npx tsc

###################################################
FROM node:22-alpine as runtime

WORKDIR /app

COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/build ./build

ENV PORT=8080

EXPOSE 8080

CMD ["npm", "start"]