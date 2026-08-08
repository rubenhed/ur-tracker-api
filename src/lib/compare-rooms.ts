import type { UrDanchi } from '../types';
import { buildRoomId } from './snapshot';

export function compareRooms(currentIds: string[], previousIds: string[]): string[] {
	const previousSet = new Set(previousIds);
	return currentIds.filter((id) => !previousSet.has(id));
}

export function filterNewDanchis(current: UrDanchi[], newIds: string[]): UrDanchi[] {
	const newIdSet = new Set(newIds);

	return current
		.map((danchi) => ({
			...danchi,
			room: danchi.room.filter((room) => newIdSet.has(buildRoomId(danchi, room))),
		}))
		.filter((danchi) => danchi.room.length > 0);
}
