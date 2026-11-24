import type { Evaluation } from './types';

export const validateGuess = (guess: string, target: string): Evaluation[] => {
	const [_guess, _target] = [guess, target].map((str) => str.toLowerCase());
	const evaluations: Evaluation[] = Array.from({ length: _guess.length }, () => 'absent');
	const remaining = new Map<string, number>();

	for (let index = 0; index < _guess.length; index++) {
		if (_guess[index] === _target[index]) {
			evaluations[index] = 'correct';
			continue;
		}
		const letter = _target[index];
		if (!letter) continue;
		remaining.set(letter, (remaining.get(letter) ?? 0) + 1);
	}

	for (let index = 0; index < _guess.length; index++) {
		if (evaluations[index] === 'correct') continue;
		const letter = _guess[index];
		const count = remaining.get(letter) ?? 0;
		if (count === 0) continue;
		evaluations[index] = 'present';
		remaining.set(letter, count - 1);
	}

	return evaluations;
};

export const isGuessed = (guess: string, target: string): boolean => {
	const [_guess, _target] = [guess, target].map((str) => str.toLowerCase());
	return _guess === _target;
};
