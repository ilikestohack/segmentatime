import type { PageServerLoad } from './$types';
import { getUser } from '$lib/server/databases/user';
import { getAllIncompleteSegments } from '$lib/server/databases/segment';

let user = await getUser();

export const load: PageServerLoad = async () => {
	// Backend logic here (e.g., DB query)
	user = await getUser();
	const segments = await getAllIncompleteSegments();

	return {
		user,
		segments
	};
};
