import { describe, it, expect, beforeAll, afterAll } from 'vitest';

import wordle from './wordle.svelte';
import dictionary from './dictionary.json';

import { validateGuess, isGuessed } from './validations';
import { existsWord, getRandomWord, getWord } from './dictionary';

import type { WordEntry } from './types';

const initGameState = (target: WordEntry) => {
	wordle.start(dictionary);
	wordle.target = target;
};

const resetGameState = () => {
	wordle.reset();
};


describe('Guesses', () => {
    it('no letters in common', () => {
        expect(validateGuess('molho', 'pista')).toEqual(['absent', 'absent', 'absent', 'absent', 'absent']);
        expect(isGuessed('molho', 'pista')).toBe(false);
    });

    it('all letters in common', () => {
        expect(validateGuess('pista', 'pista')).toEqual(['correct', 'correct', 'correct', 'correct', 'correct']);
        expect(isGuessed('pista', 'pista')).toBe(true);
    });

    it('some letters in common, no wrong positions', () => {
        expect(validateGuess('trapo', 'brado')).toEqual(['absent', 'correct', 'correct', 'absent', 'correct']);
        expect(isGuessed('trapo', 'brado')).toBe(false);
    });

    it('all letters in common, some wrong positions', () => {
        expect(validateGuess('trapo', 'prato')).toEqual(['present', 'correct', 'correct', 'present', 'correct']);
        expect(isGuessed('trapo', 'prato')).toBe(false);
    });

    it('some letters in common, some absent', () => {
        expect(validateGuess('trapo', 'pista')).toEqual(['present', 'absent', 'present', 'present', 'absent']);
        expect(isGuessed('trapo', 'pista')).toBe(false);
    });

    it('normalized lowercase letters', () => {
        expect(validateGuess('tRapO', 'PiStA')).toEqual(['present', 'absent', 'present', 'present', 'absent']);
        expect(isGuessed('tRapO', 'PiStA')).toBe(false);
    });
});

describe('Dictionary', () => {
    beforeAll(() => {
        wordle.start(dictionary);
    });

    it('word exists in dictionary', () => {
        expect(existsWord('pista')).toBe(true);
    });

    it('word does not exist in dictionary', () => {
        expect(existsWord('sdadr')).toBe(false);
    });

    it('word ÁBACO has different unicode and utf-8 versions', () => {
        expect(existsWord('abaco')).toBe(true);
        expect(existsWord('ábaco')).toBe(false);
        expect(getWord('abaco')).toBe('ábaco');
    });

    it('random word exists in dictionary', () => {
        const word = getRandomWord();
        expect(existsWord(word.unicode)).toBe(true);
    });
});

describe('Game won for word RASTO', { shuffle: false }, () => {
	const target: WordEntry = { word: 'rasto', unicode: 'rasto' };

	beforeAll(() => {
		initGameState(target);
	});

    afterAll(() => {
        resetGameState();
    });

	it('first guess: PORTA', () => {
		wordle.guess = 'porta';
		wordle.submitGuess();
		expect(wordle.evaluations[0]).toEqual(['absent', 'present', 'present', 'correct', 'present']);
        expect(wordle.status).toBe('playing');
	});

    it('second guess: FARTO', () => {
        wordle.guess = 'farto';
		wordle.submitGuess();
		expect(wordle.evaluations[1]).toEqual(['absent', 'correct', 'present', 'correct', 'correct']);
        expect(wordle.status).toBe('playing');
    });

    it('guess word not in dictionary', () => {
        wordle.guess = 'sdadr';
		wordle.submitGuess();
		expect(wordle.evaluations[2]).toEqual(['empty', 'empty', 'empty', 'empty', 'empty']);
        expect(wordle.status).toBe('playing');
    });

    it('third guess: RASTO', () => {
        wordle.guess = 'rasto';
		wordle.submitGuess();
		expect(wordle.evaluations[2]).toEqual(['correct', 'correct', 'correct', 'correct', 'correct']);
		expect(wordle.status).toBe('won');
	});
});

describe('Game lost for word PISTA', { shuffle: false }, () => {
	const target: WordEntry = { word: 'pista', unicode: 'pista' };

	beforeAll(() => {
		initGameState(target);
	});

    afterAll(() => {
        resetGameState();
    });

	it('first guess: MOLHO', () => {
		wordle.guess = 'molho';
		wordle.submitGuess();
		expect(wordle.evaluations[0]).toEqual(['absent', 'absent', 'absent', 'absent', 'absent']);
        expect(wordle.status).toBe('playing');
	});

	it('second guess: TRAPO', () => {
		wordle.guess = 'trapo';
		wordle.submitGuess();
		expect(wordle.evaluations[1]).toEqual(['present', 'absent', 'present', 'present', 'absent']);
        expect(wordle.status).toBe('playing');
	});

	it('third guess: BRADO', () => {
		wordle.guess = 'brado';
		wordle.submitGuess();
		expect(wordle.evaluations[2]).toEqual(['absent', 'absent', 'present', 'absent', 'absent']);
        expect(wordle.status).toBe('playing');
	});

    it('guess word does not have 5 letters yet', () => {
        wordle.guess = 'cant';
		wordle.submitGuess();
		expect(wordle.evaluations[3]).toEqual(['empty', 'empty', 'empty', 'empty', 'empty']);
        expect(wordle.status).toBe('playing');
    });

	it('fourth guess: CANTO', () => {
		wordle.guess = 'canto';
		wordle.submitGuess();
		expect(wordle.evaluations[3]).toEqual(['absent', 'present', 'absent', 'correct', 'absent']);
        expect(wordle.status).toBe('playing');
	});

	it('fifth guess: LIVRO', () => {
		wordle.guess = 'livro';
		wordle.submitGuess();
		expect(wordle.evaluations[4]).toEqual(['absent', 'correct', 'absent', 'absent', 'absent']);
        expect(wordle.status).toBe('playing');
	});

	it('sixth guess: PORTA', () => {
		wordle.guess = 'porta';
		wordle.submitGuess();
		expect(wordle.evaluations[5]).toEqual(['correct', 'absent', 'absent', 'correct', 'correct']);
		expect(wordle.status).toBe('lost');
	});
});