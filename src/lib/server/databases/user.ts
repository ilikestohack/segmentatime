import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getUser() {
	let defaultUser = await prisma.user.findFirst({
		where: {
			id: 1
		}
	});

	defaultUser ??= await prisma.user.create({
		data: {
			name: 'Default',
			points: 0,
			segmentOrder: JSON.stringify([0, 1, 2, 3]),
			segmentTypes: JSON.stringify(['School', 'Work', 'Home', 'Misc'])
		}
	});

	return defaultUser;
}

export async function setUserItem(userId: number, data: object) {
	return await prisma.user.update({
		where: {
			id: userId
		},
		data
	});
}

export async function getSegmentOrder() {
	return JSON.parse((await getUser()).segmentOrder) as number[];
}

export async function getSegmentTypes() {
	return JSON.parse((await getUser()).segmentTypes) as string[];
}

export function getLimitOptions() {
	return ['Test', '2'];
}
