<script lang="ts">
	import { ThemeSupa } from '@supabase/auth-ui-shared';
	import { Auth } from '@supabase/auth-ui-svelte';

	export let data;
</script>

<svelte:head>
	<title>Message board</title>
</svelte:head>

<!-- <div class="row flex-center flex">
	<div class="col-6 form-widget">
		<Auth
			additionalData={{ url: data.url }}
			supabaseClient={data.supabase}
			view="magic_link"
			redirectTo={`${data.url}/logging-in?redirect=/`}
			showLinks={false}
			appearance={{ theme: ThemeSupa, style: { input: 'color: #fff' } }}
		/>
	</div>
</div> -->

<div class="message-board-container">
	<a href="/1">
		<h2 class="message-board-header-link">Message Board</h2>
	</a>
	<!-- <Outlet /> -->
</div>