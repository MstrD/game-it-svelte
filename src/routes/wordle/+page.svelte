<script lang="ts">
	import { onMount } from 'svelte';
	import Board from '../../lib/wordle/components/Board.svelte';
	import wordle from '../../lib/wordle/wordle.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	onMount(() => {
		wordle.start(data.words);
	});
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,560;9..144,650&family=Outfit:wght@400;500;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="page">
	<header>
		<p>Em Svelte</p>
		<h1>Wordle</h1>
	</header>
	<Board />
</div>

<style>
	:global(body) {
		margin: 0;
		background: #12140f;
	}

	.page {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0 1rem 2rem;
		box-sizing: border-box;
		color: #f4f0e6;
		background:
			radial-gradient(ellipse 70% 42% at 50% -8%, rgba(212, 168, 74, 0.18), transparent 60%),
			#12140f;
		font-family: Outfit, 'Segoe UI', sans-serif;
	}

	header {
		width: min(100%, 30rem);
		margin-bottom: 1.5rem;
		padding: 1.75rem 0 1.1rem;
		text-align: center;
		border-bottom: 1px solid rgba(244, 240, 230, 0.12);
	}

	p {
		margin: 0 0 0.35rem;
		color: #d4a84a;
		font-size: 0.72rem;
		font-weight: 500;
		letter-spacing: 0.32em;
		text-transform: uppercase;
	}

	h1 {
		margin: 0;
		font-family: Fraunces, Georgia, serif;
		font-size: clamp(2rem, 6vw, 2.75rem);
		font-weight: 560;
		letter-spacing: 0.22em;
		text-indent: 0.22em;
		text-transform: uppercase;
	}
</style>
