import type { PageServerLoad } from './$types';
import dictionary from '#lib/wordle/dictionary.json';

export const load: PageServerLoad = async () => {
	return {
		words: dictionary
	};
};
