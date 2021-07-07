# Stats

This directory primarily contains stats.ts, a file of various statistics about Smaghetti levels. So far it's just entity by count.

## How to generate stats.ts

`PGHOST=<postgres-host> PGPORT=5432 PGUSER=postgres PGPASSWORD=<supabase-db-password> TS_NODE_FILES=true yarn run-ts-node scripts/generateStats.ts`

## How to add more statistics

Define them in the `LevelStats` type in `types.ts`.

Generate them in `scripts/generateStats.ts`

TODO: extract out stats generation into a simple plugin architecture

## consumed at

These stats are consumed by `src/components/stats/StatsPage`