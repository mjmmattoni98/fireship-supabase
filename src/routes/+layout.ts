import { PUBLIC_SUPABASE_API_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';
import type { LayoutLoad } from './$types';
import type { Database } from '../database.types';
import { writable } from 'svelte/store';
import type { RealtimeChannel } from '@supabase/supabase-js';

export interface UserProfile {
	username: string;
	avatarUrl?: string;
}

export const load: LayoutLoad = async ({ fetch, data, depends }) => {
	depends('supabase:auth');

	const supabase = createSupabaseLoadClient<Database>({
		supabaseUrl: PUBLIC_SUPABASE_API_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event: { fetch },
		serverSession: data.session
	});

	const {
		data: { session }
	} = await supabase.auth.getSession();

	const { subscribe, set } = writable<UserProfile>({
		username: '',
		avatarUrl: ''
	});

	const channel = writable<RealtimeChannel | null>(null);

	$: {
		if (session?.user) {
			listenToUserProfileChanges(session.user.id).then((newChannel) => {
				channel?.subscribe((channel) => {
					channel?.unsubscribe();
				});
				channel.set(newChannel);
			});
		} else if (!session?.user) {
			channel?.subscribe((channel) => {
				channel?.unsubscribe();
			});
			channel.set(null);
		}
	}

	async function listenToUserProfileChanges(userId: string) {
		const { data } = await supabase
			.from('user_profiles')
			.select('*')
			.eq('user_id', userId)
			.limit(1);

		// const { data } = supabase.from('user_profiles').select('*').filter('user_id', 'eq', userId);

		if (data?.[0]) {
			set(data?.[0]);
		}
		return supabase
			.channel(`public:user_profiles`)
			.on(
				'postgres_changes',
				{
					event: '*',
					schema: 'public',
					table: 'user_profiles',
					filter: `user_id=eq.${userId}`
				},
				(payload) => {
					set(payload.new as UserProfile);
				}
			)
			.subscribe();
	}

	return { supabase, session };
};
