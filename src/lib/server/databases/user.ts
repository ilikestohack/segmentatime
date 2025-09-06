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
			name: 'Default'
		}
	});

	return defaultUser;
}

export function getSegmentOrder() {
	// return [0, 1, 2];
	const arr = [0, 1, 2];
	const repeated = Array.from({ length: 5 }, () => arr).flat();
	return repeated;
}

export function getSegmentTypes() {
	return ['School', 'Work', 'Etc'];
}

export function getLimitOptions() {
	return ['Test', '2'];
}
