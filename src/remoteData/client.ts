import { createClient } from '@supabase/supabase-js';

const client = createClient(
  process.env.GATSBY_SUPABASE_URL as string,
  process.env.GATSBY_SUPABASE_KEY as string
);

export { client };
