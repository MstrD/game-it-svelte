<script lang="ts">
	import Letter from './Letter.svelte';
	import { WORD_LENGTH } from '../wordle.svelte';

	const { index: wordIndex }: { index: number } = $props();
</script>

<div class="word">
	{#each Array.from({ length: WORD_LENGTH }).map((_, index) => index) as index (index)}
		<Letter wordIndex={wordIndex} index={index} />
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
