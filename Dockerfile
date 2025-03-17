FROM node:22-alpine as build

WORKDIR /app

COPY ./package*.json .
RUN npm install

COPY tsconfig.json .
COPY ./src .

RUN tsc

#########################################################
FROM build as dev

WORKDIR /app

COPY --from=build /app/package*.json .
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/build ./build

ENV PORT=3000

EXPOSE 3000

CMD ["npm", "run", "dev:run"]