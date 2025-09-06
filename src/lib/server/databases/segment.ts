import { PrismaClient } from '@prisma/client';
import { getSegmentTypes, getUser } from './user';

const prisma = new PrismaClient();
const user = await getUser();

export enum TimeExtensionMode {
	EXTEND,
	MATHEMATICAL,
	CUTOFF
}

export interface SegmentI {
	id: number;
	ts: bigint;
	userId: number;
	type: string;
	title: string;
	timeAllocation: number;
	timeExtension: TimeExtensionMode;
	timeExtensionDifference: number;
	maxBreaks: number;
	limits: string[];
	pointsAvailable: number;
	notes: string;
	completion: number;
}

interface PrismaSegment {
	id: number;
	ts: bigint;
	type: number;
	title: string;
	timeAllocation: number;
	timeExtension: number;
	timeExtensionDifference: number;
	maxBreaks: number;
	limits: string;
	pointsAvailable: number;
	notes: string;
	completion: number;
	userId: number;
}

function prismaToSegment(ps: PrismaSegment): SegmentI {
	return {
		id: ps.id,
		ts: ps.ts,
		userId: ps.userId,
		type: getSegmentTypes()[ps.type],
		title: ps.title,
		timeAllocation: ps.timeAllocation,
		timeExtension: ps.timeExtension as TimeExtensionMode,
		timeExtensionDifference: ps.timeExtensionDifference,
		maxBreaks: ps.maxBreaks,
		limits: ps.limits.split(','),
		pointsAvailable: ps.pointsAvailable,
		notes: ps.notes,
		completion: ps.completion
	};
}

function segmentToPrisma(s: SegmentI): PrismaSegment {
	return {
		id: s.id,
		ts: s.ts,
		type: getSegmentTypes().indexOf(s.type),
		title: s.title,
		timeAllocation: s.timeAllocation,
		timeExtension: s.timeExtension,
		timeExtensionDifference: s.timeExtensionDifference,
		maxBreaks: s.maxBreaks,
		limits: s.limits.join(','),
		pointsAvailable: s.pointsAvailable,
		notes: s.notes,
		completion: s.completion,
		userId: s.userId
	};
}

export async function getSegment(id: number, userId: number = user.id): Promise<SegmentI | null> {
	const segment = await prisma.segment.findFirst({
		where: {
			id,
			userId
		}
	});
	return segment === null ? null : prismaToSegment(segment);
}

export async function getNextSegment(
	typeIn: number,
	userId: number = user.id
): Promise<SegmentI | null> {
	// const type: number = typeof typeIn === 'number' ? typeIn : getSegmentTypes().indexOf(typeIn);
	const type = typeIn;

	const segment = await prisma.segment.findFirst({
		where: {
			userId,
			type,
			completion: 0
		},
		orderBy: {
			ts: 'asc'
		}
	});

	return segment === null ? null : prismaToSegment(segment);
}

export async function setSegment(segment: SegmentI) {
	const { id, ...idLessSegment } = segmentToPrisma(segment);

	await prisma.segment.upsert({
		where: { id },
		update: idLessSegment,
		create: idLessSegment
	});
}

export async function setItem(segmentId: number, userId: number, data: object) {
	return await prisma.segment.update({
		where: {
			id: segmentId,
			userId
		},
		data
	});
}

export function getDefaultSegment(): SegmentI {
	return {
		id: -1,
		type: getSegmentTypes()[0],
		title: 'Example Segment',
		ts: BigInt(Date.now()),
		userId: user.id,
		timeAllocation: 30,
		timeExtension: TimeExtensionMode.EXTEND,
		timeExtensionDifference: 10,
		maxBreaks: 3,
		limits: [],
		pointsAvailable: 3,
		notes: '',
		completion: 0
	};
}
