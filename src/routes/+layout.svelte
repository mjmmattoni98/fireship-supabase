<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import '../styles.css';

	export let data;

	$: ({ supabase, session } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<svelte:head>
	<title>Message board</title>
</svelte:head>

<header>
	<nav class="nav-bar">
		<a class="nav-logo-link" href="/">
			<img
				id="logo"
				class="nav-logo"
				src="https://supaship.io/supaship_logo_with_text.svg"
				alt="logo"
			/>
		</a>
	
		<ul class="nav-right-list">
			<li class="nav-message-board-list-item">
				<a href="/1" class="nav-message-board-link">
					message board
				</a>
			</li>
		</ul>
	</nav>	
</header>

<main>
	<slot />
</main>
