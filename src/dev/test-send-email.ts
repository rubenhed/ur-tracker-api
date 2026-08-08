// src/dev/test-send-email.ts

import { sendEmail } from '../lib/send-email';
import type { UrDanchi } from '../types';

const fixture: UrDanchi[] = [
	{
		allCount: '1',
		shisya: '20',
		danchi: '295',
		shikibetu: '0',
		danchiNm: '金町第二',
		place: '葛飾区南水元3-6ほか',
		traffic: '<li>JR常磐線「金町」駅 徒歩10~12分</li>',
		floorAll: '32',
		room: [
			{
				id: '000010738',
				roomNmMain: '1号棟',
				roomNmSub: '738号室',
				rent: '111,300円',
				commonfee: '4,400円',
				type: '2LDK',
				floorspace: '63&#13217;',
				floor: '7階',
				roomLinkPc: '/chintai/kanto/tokyo/20_2950_room.html?JKSS=000010738',
				allRoomUrl: '/chintai/kanto/tokyo/20_2950.html',
			},
		],
	},
];

export default {
	async fetch(req: Request, env: Env): Promise<Response> {
		await sendEmail(env, fixture);
		return new Response('Sent');
	},
};
