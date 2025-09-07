import type { Actions, PageServerLoad } from './$types';
import {
	getDefaultSegment,
	getNextSegment,
	setItem,
	type SegmentI
} from '$lib/server/databases/segment';
import { getSegmentOrder, getUser, setUserItem } from '$lib/server/databases/user';

let user = await getUser();
const segmentOrder = await getSegmentOrder();
let firstSegment: SegmentI | null | false = false;

export const load: PageServerLoad = async () => {
	// Backend logic here (e.g., DB query)
	user = await getUser();
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

	if (firstSegment === false) firstSegment = await getDefaultSegment();

	const fsOut = firstSegment as SegmentI | null;

	return {
		user,
		firstSegment: fsOut,
		segments
	};
};

async function complete(segment: SegmentI, value: -1 | 0 | 1) {
	await setItem(segment.id, user.id, { completion: value });

	if (value > 0) {
		// Increase points
		const points = user.points + segment.pointsAvailable;
		await setUserItem(user.id, { points });
	}

	segmentOrder.shift();
}

export const actions: Actions = {
	complete: async () => {
		await complete(firstSegment as SegmentI, 1);
		return { success: true };
	},
	skip: async () => {
		await complete(firstSegment as SegmentI, 0);
		return { success: true };
	}
};
