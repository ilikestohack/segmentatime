import type { Actions, PageServerLoad } from './$types';
import {
	getDefaultSegment,
	getNextSegment,
	setItem,
	type SegmentI
} from '$lib/server/databases/segment';
import { getSegmentOrder, getUser } from '$lib/server/databases/user';

const user = await getUser();
const segmentOrder = getSegmentOrder();
let firstSegment: SegmentI | null | false = false;

export const load: PageServerLoad = async () => {
	// Backend logic here (e.g., DB query)
	const segments: SegmentI[] = [];
	firstSegment = false;

	for (const segmentTypeIndex of segmentOrder) {
		const segment = await getNextSegment(segmentTypeIndex);
		if (firstSegment === false && segment !== null) {
			firstSegment = segment;
		} else {
			if (segment !== null) segments.push(segment);
		}
	}

	if (firstSegment === false) firstSegment = getDefaultSegment();

	const fsOut = firstSegment as SegmentI | null;

	return {
		user: { name: 'Charlie', role: 'admin' },
		firstSegment: fsOut,
		segments
	};
};

async function complete(segmentId: number, value: -1 | 0 | 1) {
	await setItem(segmentId, user.id, { completion: value });
	segmentOrder.shift();
}

export const actions: Actions = {
	complete: async () => {
		await complete((firstSegment as SegmentI).id, 1);
		return { success: true };
	},
	skip: async () => {
		await complete((firstSegment as SegmentI).id, 0);
		return { success: true };
	}
};
