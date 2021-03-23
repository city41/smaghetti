# Supabase projects

* smaghetti-test: used in dev only
* smaghetti-prod: used on deployed/public build of smaghetti

# Migrations

live in database/migrations

## to run them

```
DATABASE_URL="postgres://postgres:<password from 1password>@<db host from supabase>:5432/postgres" yarn migrations-up

NOTE: be sure to wrap DATABASE_URL value in quotes, to handle special characters in the password correctly.

To find the db host, in Supabase go to settings (gear icon) -> Database. The connection string at the bottom is exactly as the above

