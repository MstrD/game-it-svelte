<script lang="ts">
	import Letter from './Letter.svelte';
	import wordle, { WORD_LENGTH } from './wordle.svelte';

	const { index: wordIndex } = $props();
</script>

<div class="word">
	{#each Array.from({ length: WORD_LENGTH }) as _, index}
		<Letter {wordIndex} {index} />
	{/each}
</div>

<style>
	.word {
		display: flex;
		flex-flow: row nowrap;
		gap: 0.45rem;
		perspective: 700px;
	}
</style>
