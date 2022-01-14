import { createClient, SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient;

const MOCK_CLIENT = {
	auth: {
		user() {
			return null;
		},
		onAuthStateChange() {},
	},
};

try {
	client = createClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL as string,
		process.env.NEXT_PUBLIC_SUPABASE_KEY as string
	);
} catch {
	client = (MOCK_CLIENT as unknown) as SupabaseClient;
}

export { client };
