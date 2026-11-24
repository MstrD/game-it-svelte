import { existsWord, getRandomWord, getWord, setDictionary } from './dictionary';
import type { Evaluation, GameStatus, WordEntry } from './types';
import { isGuessed, validateGuess } from './validations';

export const BOARD_LENGTH = 6;
export const WORD_LENGTH = 5;
const EMPTY_WORD = '';

const wordle = $state({
	attempt: 0,
	guesses: Array.from({ length: BOARD_LENGTH }, () => EMPTY_WORD),
	target: null as WordEntry | null,
	guess: EMPTY_WORD,
	status: 'playing' as GameStatus,
	evaluations: Array.from({ length: BOARD_LENGTH }, () =>
		Array.from({ length: WORD_LENGTH }, () => 'empty')
	) as Evaluation[][],
	get canPlay() {
		return this.status === 'playing' && this.attempt < BOARD_LENGTH;
	},
	get canSubmit() {
		return this.status === 'playing' && this.guess.length === WORD_LENGTH;
	},
	get canReset() {
		return this.status !== 'playing';
	},
	start: (words: WordEntry[]) => {
		setDictionary(words);
		if (!wordle.target) wordle.target = getRandomWord();
	},
	typeLetter: (letter: string) => {
		if (!wordle.canSubmit) {
			wordle.guess += letter;
		}
	},
	deleteLetter: () => {
		wordle.guess = wordle.guess.slice(0, -1);
	},
	submitGuess: () => {
		if (!wordle.canSubmit || !wordle.target || !existsWord(wordle.guess)) return;
		const unicode = wordle.guess;
		wordle.guesses[wordle.attempt] = getWord(unicode);
		wordle.evaluations[wordle.attempt] = validateGuess(unicode, wordle.target.unicode);
		if (isGuessed(unicode, wordle.target.unicode)) {
			wordle.status = 'won';
			return;
		}
		wordle.attempt++;
		if (wordle.canPlay) {
			wordle.guess = EMPTY_WORD;
		} else {
			wordle.status = 'lost';
		}
	},
	reset: () => {
		if (!wordle.canReset) return;
		wordle.attempt = 0;
		wordle.guesses = Array.from({ length: BOARD_LENGTH }, () => EMPTY_WORD);
		wordle.target = getRandomWord();
		wordle.guess = EMPTY_WORD;
		wordle.status = 'playing';
		wordle.evaluations = Array.from({ length: BOARD_LENGTH }, () =>
			Array.from({ length: WORD_LENGTH }, () => 'empty')
		) as Evaluation[][];
	}
});

export default wordle;
