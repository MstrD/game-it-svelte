export type GameStatus = 'playing' | 'won' | 'lost';
export type Evaluation = 'empty' | 'absent' | 'present' | 'correct';

export type WordEntry = {
	word: string;
	unicode: string;
};
