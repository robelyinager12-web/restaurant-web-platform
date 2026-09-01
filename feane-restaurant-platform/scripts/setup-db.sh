#!/bin/bash
# File: scripts/setup-db.sh
# Creates the database and runs all migrations + seeds in order.
# Usage: ./scripts/setup-db.sh (run from project root or scripts/, both work)

set -e

DB_NAME="restaurant_web_db"
DB_USER="postgres"

echo "Creating database (if it doesn't exist)..."
PGPASSWORD=1234 createdb -U "$DB_USER" -h localhost "$DB_NAME" 2>/dev/null || echo "Database already exists, continuing..."

echo "Running migrations..."
for file in ../database/migrations/*.sql; do
  echo "  -> $file"
  PGPASSWORD=1234 psql -U "$DB_USER" -h localhost -d "$DB_NAME" -f "$file"
done

echo "Running seeds..."
for file in ../database/seeds/*.sql; do
  echo "  -> $file"
  PGPASSWORD=1234 psql -U "$DB_USER" -h localhost -d "$DB_NAME" -f "$file"
done

echo "Database setup complete."