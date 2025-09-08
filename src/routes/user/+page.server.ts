import type { Actions, PageServerLoad } from '../$types';
import { getSegmentOrder, getSegmentTypes, getUser, setUserItem } from '$lib/server/databases/user';

export const load: PageServerLoad = async () => {
	const segmentTypes = await getSegmentTypes();
	const segmentOrder = await getSegmentOrder();
	const segments = [];

	for (const s of segmentOrder) {
		segments.push(segmentTypes[s]);
	}

	return {
		segments,
		user: await getUser()
	};
};

export const actions: Actions = {
	save: async ({ request }) => {
		const form = await request.formData();
		const segments = form.getAll('segments[]');
		const segmentTypes = [...new Set(segments)];

		const segmentOrder = [];

		for (const s of segments) {
			segmentOrder.push(segmentTypes.indexOf(s));
		}

		console.log('AAAAAAAAAA', segments, segmentTypes, segmentOrder);

		await setUserItem((await getUser()).id, {
			segmentOrder: JSON.stringify(segmentOrder),
			segmentTypes: JSON.stringify(segmentTypes)
		});

		return { success: true };
	}
};
