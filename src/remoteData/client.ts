import { createClient, SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient;

try {
	client = createClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL as string,
		process.env.NEXT_PUBLIC_SUPABASE_KEY as string
	);
} catch {
	client = ({} as unknown) as SupabaseClient;
}

export { client };
