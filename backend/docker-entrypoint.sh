#!/bin/sh

echo "Backend: Waiting for PostgreSQL to be ready..."

until nc -z database 5432; do
  echo "Backend: PostgreSQL is unavailable - sleeping"
  sleep 1
done

echo "Backend: PostgreSQL is up - executing commands"

echo "Backend: Installing dependencies..."
npm install

if [ -f "prisma/schema.prisma" ]; then
  echo "Backend: Generating Prisma client..."
  npx prisma generate

  echo "Backend: Running migrations..."
  npx prisma migrate dev --name init
fi

echo "Backend: Seed default values..."
npx prisma db seed

echo "Backend: Starting application..."
npm run start:dev
