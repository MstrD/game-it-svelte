import type { WordEntry } from './types';

const dictionary = new Map<string, string>();

export const setDictionary = (words: WordEntry[]) => {
	for (const word of words) {
		dictionary.set(word.unicode, word.word);
	}
};

export const getRandomWord = (): WordEntry => {
	const unicode = Array.from(dictionary.keys())[Math.floor(Math.random() * dictionary.size)];
	const word = unicode === undefined ? undefined : dictionary.get(unicode);
	if (!unicode || !word) throw new Error('Dictionary is empty');
	return { unicode, word };
};

export const getWord = (unicode: string): string => {
	const word = dictionary.get(unicode);
	if (!word) throw new Error('Word is not in the dictionary');
	return word;
};

export const existsWord = (unicode: string): boolean => {
	return dictionary.has(unicode);
};
