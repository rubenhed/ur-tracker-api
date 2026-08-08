const UR_ROOMS_KEY = 'ur:rooms';

import type { UrDanchi } from '../types';

export function buildRoomId(danchi: { shisya: string; danchi: string; shikibetu: string }, room: { id: string }): string {
	return `${danchi.shisya}-${danchi.danchi}-${danchi.shikibetu}-${room.id}`;
}

export function buildRoomIds(danchis: UrDanchi[]): string[] {
	return danchis.flatMap((danchi) => danchi.room.map((room) => buildRoomId(danchi, room)));
}

export async function getSnapshot(env: Env): Promise<string[]> {
	const raw = await env.UR_ROOMS.get(UR_ROOMS_KEY);

	if (!raw) {
		return [];
	}

	return JSON.parse(raw) as string[];
}

export async function updateSnapshot(env: Env, roomIds: string[]): Promise<void> {
	await env.UR_ROOMS.put(UR_ROOMS_KEY, JSON.stringify(roomIds));
}
