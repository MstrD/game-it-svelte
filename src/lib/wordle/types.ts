export type GameStatus = 'playing' | 'won' | 'lost';
export type Evaluation = 'empty' | 'absent' | 'present' | 'correct';

export type WordleState = {
	attempt: number;
	guesses: string[];
	target: WordEntry | null;
	guess: string;
	status: GameStatus;
	evaluations: Evaluation[][];
	readonly canPlay: boolean;
	readonly canSubmit: boolean;
	readonly canReset: boolean;
	start: (words: WordEntry[]) => void;
	typeLetter: (letter: string) => void;
	deleteLetter: () => void;
	submitGuess: () => void;
	reset: () => void;
};

export type WordEntry = {
	word: string;
	unicode: string;
};
