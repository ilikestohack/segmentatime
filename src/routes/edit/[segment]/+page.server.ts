/* eslint-disable @typescript-eslint/no-base-to-string */

import type { Actions, PageServerLoad } from '../$types';
import {
	getDefaultSegment,
	getSegment,
	setSegment,
	type SegmentI
} from '$lib/server/databases/segment';
import { getLimitOptions, getSegmentTypes } from '$lib/server/databases/user';

let segmentId = -1;

interface Params {
	segment: string;
}

function getLimits(limitsSelected: string[]) {
	const limitKeys = getLimitOptions();
	const limits: Record<string, boolean> = {};

	for (const limitKey of limitKeys) {
		limits[limitKey] = limitsSelected.includes(limitKey);
	}

	return limits;
}

export const load: PageServerLoad = async ({ params }) => {
	// Backend logic here (e.g., DB query)
	const segmentIdParam = (params as Params).segment;
	segmentId = Number(segmentIdParam);

	console.log('Request segment by id:', segmentId);

	let segment = await getSegment(segmentId);

	segment ??= getDefaultSegment();

	return {
		user: { name: 'Charlie', role: 'admin' },
		limits: getLimits(segment.limits),
		segmentTypes: getSegmentTypes(),
		segment
	};
};

export const actions: Actions = {
	save: async ({ request }) => {
		const form = await request.formData();

		const segment: SegmentI = {
			id: segmentId,
			ts: BigInt(Date.now()),
			userId: 1, // TODO: User ID
			type: form.get('segmentType')?.toString() ?? '',
			title: form.get('taskName')?.toString() ?? '',
			timeAllocation: Number(form.get('timeAlloc')),
			timeExtension: 0,
			timeExtensionDifference: Number(form.get('timeExt')),
			limits: form.getAll('selectedLimits').map((l) => l.toString()),
			maxBreaks: Number(form.get('maxBreaks')),
			pointsAvailable: Number(form.get('points')),
			notes: form.get('notes')?.toString() ?? '',
			completion: 0
		};

		await setSegment(segment);
		return { success: true };
	}
};
