import { Session, SupabaseClient, type Subscription } from '@supabase/supabase-js';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Platform {}
		interface Locals {
			supabase: SupabaseClient;
			getSession(): Promise<Session | null>;
			onAuthStateChange(
				callback: (event: any, session: Session | null) => void
			): Promise<Subscription>;
		}
		interface PageData {
			session: Session | null;
		}
	}
}

export {};
