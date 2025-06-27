#!/bin/bash

npx prisma db push --schema=schema.prisma --accept-data-loss
exec "$@"
