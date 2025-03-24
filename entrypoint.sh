#!/bin/bash

npx prisma db push --schema=schema.prisma
exec "$@"
