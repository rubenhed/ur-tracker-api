// src/dev/seed-kv.ts

import { fetchRooms } from '../lib/fetch-rooms';
import { buildRoomId } from '../lib/snapshot';

export default {
	async fetch(req: Request, env: Env): Promise<Response> {
		const danchis = await fetchRooms();

		const roomIds = danchis.flatMap((danchi) => danchi.room.map((room) => buildRoomId(danchi, room)));

		await env.UR_ROOMS.put('ur:rooms', JSON.stringify(roomIds));

		return Response.json(roomIds);
	},
};
