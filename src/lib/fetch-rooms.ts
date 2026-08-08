// src/lib/fetch-rooms.ts

import { TOKYO_23KU } from '../data';
import type { UrDanchi } from '../types';

const UR_SEARCH_URL = 'https://chintai.r6.ur-net.go.jp/chintai/api/bukken/result/bukken_result/';
const FLOORSPACE_LOW = '50';
const PAGE_SIZE = '50';

const UR_HEADERS: Record<string, string> = {
	Accept: 'application/json, text/javascript, */*; q=0.01',
	'Accept-Language': 'en,sv;q=0.9,en-US;q=0.8',
	'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',

	Origin: 'https://www.ur-net.go.jp',
	Referer: 'https://www.ur-net.go.jp/',

	'sec-ch-ua': '"Not;A=Brand";v="8", "Chromium";v="150", "Google Chrome";v="150"',
	'sec-ch-ua-mobile': '?0',
	'sec-ch-ua-platform': 'Windows',

	'sec-fetch-dest': 'empty',
	'sec-fetch-mode': 'cors',
	'sec-fetch-site': 'same-site',

	'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36',
};

function buildSearchParams(): URLSearchParams {
	const params = new URLSearchParams();

	params.append('rent_low', '');
	params.append('rent_high', '');
	params.append('walk', '');

	params.append('floorspace_low', FLOORSPACE_LOW);
	params.append('floorspace_high', '');

	params.append('years', '');

	params.append('popular_floor_2', '1');
	params.append('floor', '2');

	params.append('mode', 'area');

	params.append('block', 'kanto');
	params.append('tdfk', '13'); // Tokyo = 13
	params.append('rireki_tdfk', '13');

	params.append('orderByField', '1');

	params.append('pageSize', PAGE_SIZE);
	params.append('pageIndex', '0');

	params.append('shisya', '');
	params.append('danchi', '');
	params.append('shikibetsu', '');

	params.append('pageIndexRoom', '0');

	params.append('sp', '');

	// multiple skcs values become: skcs=104&skcs=105&skcs=107
	for (const code of TOKYO_23KU) {
		params.append('skcs', code);
	}

	return params;
}

async function fetchRoomsOnce(): Promise<UrDanchi[]> {
	const body = buildSearchParams();

	const response = await fetch(UR_SEARCH_URL, {
		method: 'POST',
		headers: UR_HEADERS,
		body,
	});

	if (!response.ok) {
		throw new Error(`UR API request failed: ${response.status} ${response.statusText}`);
	}

	return (await response.json()) as UrDanchi[];
}

// Public entry point. Thin wrapper on purpose — retry/backoff goes here
// later without touching any call sites.
export async function fetchRooms(): Promise<UrDanchi[]> {
	return fetchRoomsOnce();
}
