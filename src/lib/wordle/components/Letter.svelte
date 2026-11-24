<script lang="ts">
	import wordle from '../wordle.svelte';

	const { index, wordIndex } = $props();
	const letter = $derived.by(() => {
		if (wordIndex > wordle.attempt) return '';
		return wordle.guesses[wordIndex][index] ?? wordle.guess[index];
	});
	const evaluation = $derived(wordle.evaluations[wordIndex][index]);
</script>

<div
	class="letter"
	class:filled={Boolean(letter) && evaluation === 'empty'}
	class:correct={evaluation === 'correct'}
	class:present={evaluation === 'present'}
	class:absent={evaluation === 'absent'}
	style:animation-delay={evaluation === 'empty' ? '0ms' : `${index * 160}ms`}
>
	{letter}
</div>

<style>
	.letter {
		display: grid;
		place-items: center;
		box-sizing: border-box;
		width: clamp(2.85rem, 14vw, 3.85rem);
		height: clamp(2.85rem, 14vw, 3.85rem);
		border: 2px solid #5e6756;
		border-radius: 0.4rem;
		background: rgba(244, 240, 230, 0.03);
		color: #f4f0e6;
		font-size: clamp(1.35rem, 5vw, 1.9rem);
		font-weight: 700;
		line-height: 1;
		text-transform: uppercase;
		user-select: none;

		&.filled {
			border-color: #f4f0e6;
			animation: pop 0.12s ease;
		}

		&.correct,
		&.present,
		&.absent {
			border-color: transparent;
			color: #f7f4ec;
			animation: reveal 0.5s ease both;
		}

		&.correct {
			background-color: #6a9a4e;
		}

		&.present {
			background-color: #c4a15a;
		}

		&.absent {
			background-color: #3a3f36;
		}
	}

	@keyframes pop {
		50% {
			transform: scale(1.08);
		}
	}

	@keyframes reveal {
		0% {
			transform: rotateX(0);
			background-color: transparent;
			border-color: #f4f0e6;
		}

		45% {
			transform: rotateX(-90deg);
			background-color: transparent;
			border-color: #f4f0e6;
		}

		55% {
			transform: rotateX(-90deg);
		}

		100% {
			transform: rotateX(0);
		}
	}
</style>
