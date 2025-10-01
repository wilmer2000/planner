#!/bin/sh

echo "Waiting for PostgreSQL to be ready..."

# Esperar a que PostgreSQL esté disponible
until nc -z database 5432; do
  echo "PostgreSQL is unavailable - sleeping"
  sleep 1
done

echo "PostgreSQL is up - executing commands"

# Instalar dependencias
echo "Installing dependencies..."
npm install

# Prisma setup
if [ -f "prisma/schema.prisma" ]; then
  echo "Generating Prisma client..."
  npx prisma generate
  
  echo "Running migrations..."
#  npx prisma migrate deploy
  npx prisma migrate dev --name init

fi

# Iniciar aplicación
echo "Starting application..."
npm run start
