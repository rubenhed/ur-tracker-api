import type { UrDanchi } from '../types';

export async function sendNtfy(env: Env, newRoomCount: number, newDanchis: UrDanchi[]) {
	const places = [...new Set(newDanchis.map((d) => d.place))];

	await fetch(`https://ntfy.sh/${env.NTFY_TOPIC}`, {
		method: 'POST',
		headers: {
			Title: `${newRoomCount} new UR room${newRoomCount > 1 ? 's' : ''}`,
			Priority: 'high',
			Tags: 'house,new',
		},
		body: places.join(' / '),
	});
}
