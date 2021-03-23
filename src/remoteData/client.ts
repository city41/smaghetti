import { createClient } from '@supabase/supabase-js';

const client = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL as string,
	process.env.NEXT_PUBLIC_SUPABASE_KEY as string
);

function isLoggedIn() {
	return !!client.auth.user()?.confirmed_at;
}

export { client, isLoggedIn };
