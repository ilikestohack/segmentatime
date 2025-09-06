import { setItem } from '$lib/server/databases/segment';
import { getUser } from '$lib/server/databases/user';
import type { RequestHandler } from './$types';

interface ApiRequest {
	segmentId: number;
	text: string;
}

export const POST: RequestHandler = async ({ request }) => {
	const { segmentId, text } = (await request.json()) as ApiRequest;

	console.log('Got text:', segmentId, '|', text); // <- runs on the server

	await setItem(segmentId, (await getUser()).id, { notes: text });

	// do whatever you want (DB insert, etc.)
	return new Response(JSON.stringify({ ok: true }), {
		headers: { 'Content-Type': 'application/json' }
	});
};
