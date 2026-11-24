<script lang="ts">
	import Word from './Word.svelte';
	import wordle, { BOARD_LENGTH } from '../wordle.svelte';

	const handleKeyDown = (event: KeyboardEvent) => {
		// Ignora atalhos do browser (ex: Ctrl+R, Cmd+Shift+I) e teclas de repetição longa
		if (event.ctrlKey || event.metaKey || event.altKey) return;
		if (event.repeat) return;

		const key = event.key;

		if (key === 'Backspace') {
			event.preventDefault();
			wordle.deleteLetter();
			return;
		}

		if (key === 'Enter') {
			event.preventDefault();
			wordle.submitGuess();
			return;
		}

		// Aceita apenas uma única letra (A-Z / a-z)
		if (/^[a-zA-Z]$/.test(key)) {
			wordle.typeLetter(key.toLowerCase());
		}
	};
</script>

<svelte:window onkeydown={handleKeyDown} />
<div class="board">
	{#each Array.from({ length: BOARD_LENGTH }).map((_, index) => index) as index (index)}
		<Word index={index} />
	{/each}
</div>
{#if wordle.status === 'playing'}
	<p class="hint">Escreve a palavra e submete com Enter</p>
{:else}
	<div class="result" class:won={wordle.status === 'won'}>
		<p>{wordle.status === 'won' ? 'Acertaste' : 'Desta vez não'}</p>
		<strong>{wordle.target?.word}</strong>
		<button type="button" onclick={wordle.reset}>Nova palavra</button>
	</div>
{/if}

<style>
	.board {
		display: flex;
		flex-flow: column nowrap;
		gap: 0.45rem;
	}

	.hint {
		margin: 1.5rem 0 0;
		color: rgba(244, 240, 230, 0.45);
		font-size: 0.8rem;
		letter-spacing: 0.04em;
		text-align: center;
	}

	.result {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.85rem;
		margin-top: 1.35rem;
		padding: 1.25rem 1.5rem 1.35rem;
		border: 1px solid rgba(244, 240, 230, 0.14);
		border-radius: 1rem;
		background: rgba(244, 240, 230, 0.04);
		text-align: center;
	}

	.result p {
		margin: 0;
		color: #e07a5f;
		font-size: 0.75rem;
		font-weight: 500;
		letter-spacing: 0.22em;
		text-transform: uppercase;
	}

	.result.won p {
		color: #8fbc78;
	}

	strong {
		font-family: Fraunces, Georgia, serif;
		font-size: 1.85rem;
		font-weight: 650;
		letter-spacing: 0.28em;
		text-indent: 0.28em;
		text-transform: uppercase;
	}

	button {
		margin-top: 0.25rem;
		padding: 0.7rem 1.25rem;
		border: 1px solid rgba(244, 240, 230, 0.35);
		border-radius: 999px;
		background: transparent;
		color: #f4f0e6;
		font: inherit;
		font-size: 0.78rem;
		font-weight: 500;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		cursor: pointer;
	}

	button:hover {
		background: #f4f0e6;
		color: #12140f;
	}
</style>
