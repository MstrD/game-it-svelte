import dictionary from '../../lib/wordle/dictionary.json';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		words: dictionary
	};
};
