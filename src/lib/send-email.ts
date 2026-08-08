// src/lib/send-email.ts

import { Resend } from 'resend';
import type { UrDanchi } from '../types';

const UR_DOMAIN = 'https://www.ur-net.go.jp';

const BUTTON_STYLE =
	'display:inline-flex;align-items:center;gap:6px;padding:6px 12px;border-radius:20px;color:#0f172a;text-decoration:none;font-size:13px;font-weight:500;background:transparent;border:1px solid #0f172a';

export function buildRoomRow(danchi: UrDanchi, room: UrDanchi['room'][number]): string {
	const roomLink = `${UR_DOMAIN}${room.roomLinkPc}`;
	const danchiLink = `${UR_DOMAIN}${room.allRoomUrl}`;
	const rentDisplay = room.commonfee ? `${room.rent}(${room.commonfee})` : room.rent;

	return `
    <tr>
      <td style="padding:12px;border-bottom:1px solid #f1f5f9">${danchi.danchiNm}</td>
      <td style="padding:12px;border-bottom:1px solid #f1f5f9">${danchi.place}</td>
      <td style="padding:12px;border-bottom:1px solid #f1f5f9">${rentDisplay}</td>
      <td style="padding:12px;border-bottom:1px solid #f1f5f9">${room.type} / ${room.floorspace}</td>
      <td style="padding:12px;border-bottom:1px solid #f1f5f9">${room.floor} / ${danchi.floorAll}階</td>
      <td style="padding:12px;border-bottom:1px solid #f1f5f9">
        <a href="${roomLink}" style="${BUTTON_STYLE}">Room ↗</a>
      </td>
      <td style="padding:12px;border-bottom:1px solid #f1f5f9">
        <a href="${danchiLink}" style="${BUTTON_STYLE}">Building ↗</a>
      </td>
    </tr>`;
}

export function buildEmailHtml(danchis: UrDanchi[]): string {
	const rows = danchis.flatMap((danchi) => danchi.room.map((room) => buildRoomRow(danchi, room))).join('');

	return `
    <div style="font-family:sans-serif;max-width:640px;margin:0 auto;padding:24px">
      <h2 style="margin-bottom:16px">New UR Rooms Available</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <thead>
          <tr style="background:#f8fafc">
            <th style="padding:10px 12px;text-align:left;border-bottom:2px solid #e2e8f0;font-weight:600">Apartment</th>
            <th style="padding:10px 12px;text-align:left;border-bottom:2px solid #e2e8f0;font-weight:600">Address</th>
            <th style="padding:10px 12px;text-align:left;border-bottom:2px solid #e2e8f0;font-weight:600">Rent</th>
            <th style="padding:10px 12px;text-align:left;border-bottom:2px solid #e2e8f0;font-weight:600">Type / Size</th>
            <th style="padding:10px 12px;text-align:left;border-bottom:2px solid #e2e8f0;font-weight:600">Floor</th>
            <th style="padding:10px 12px;text-align:left;border-bottom:2px solid #e2e8f0;font-weight:600">Room</th>
            <th style="padding:10px 12px;text-align:left;border-bottom:2px solid #e2e8f0;font-weight:600">Building</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

export async function sendEmail(env: Env, danchis: UrDanchi[]): Promise<void> {
	const resend = new Resend(env.RESEND_API_KEY);
	const html = buildEmailHtml(danchis);

	const { error } = await resend.emails.send({
		from: 'UR Tracker API Version <onboarding@resend.dev>',
		to: [env.NOTIFY_EMAIL],
		subject: 'New UR Rooms Available',
		html,
	});

	if (error) {
		throw new Error(`Resend send failed: ${error.message}`);
	}
}
