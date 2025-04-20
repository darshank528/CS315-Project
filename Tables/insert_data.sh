#!/bin/bash

DB_NAME="hotel_management"
DB_USER="postgres"

psql -U "$DB_USER" -d "$DB_NAME" -f tables.sql
psql -U "$DB_USER" -d "$DB_NAME" -f triggers.sql
python3 generate_data.py

echo "Running ingredients.sql..."
psql -U "$DB_USER" -d "$DB_NAME" -f "ingredients.sql"

echo "Running dishes.sql..."
psql -U "$DB_USER" -d "$DB_NAME" -f "dishes.sql"

echo "Running customers.sql..."
psql -U "$DB_USER" -d "$DB_NAME" -f "customers.sql"

echo "Running staff.sql..."
psql -U "$DB_USER" -d "$DB_NAME" -f "staff.sql"

echo "Running customers_contact.sql..."
psql -U "$DB_USER" -d "$DB_NAME" -f "customers_contact.sql"

echo "Running staff_contact.sql..."
psql -U "$DB_USER" -d "$DB_NAME" -f "staff_contact.sql"

echo "Running contains.sql..."
psql -U "$DB_USER" -d "$DB_NAME" -f "contains.sql"

echo "Running orders.sql..."
psql -U "$DB_USER" -d "$DB_NAME" -f "orders.sql"

echo "Running cooks.sql..."
psql -U "$DB_USER" -d "$DB_NAME" -f "cooks.sql"

echo "Running delivers.sql..."
psql -U "$DB_USER" -d "$DB_NAME" -f "delivers.sql"

echo "Running payment.sql..."
psql -U "$DB_USER" -d "$DB_NAME" -f "payment.sql"

echo "✅ All SQL files have been executed successfully."
