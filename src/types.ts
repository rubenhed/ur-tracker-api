export type UrRoom = {
	id: string; // unique vacancy id, e.g. "000010738" — what compareRooms diffs on
	roomNmMain: string; // building label, e.g. "1号棟"
	roomNmSub: string; // room number, e.g. "738号室"
	rent: string; // monthly rent, e.g. "111,300円"
	commonfee: string | null; // common area fee, e.g. "4,400円" — can be null
	type: string; // layout, e.g. "2LDK"
	floorspace: string; // e.g. "63&#13217;" (m², HTML-entity encoded)
	floor: string; // e.g. "7階"
	roomLinkPc: string; // relative path to the room's detail page, needs domain prefixed
	allRoomUrl: string; // link to the danchi's full room listing page
};

export type UrDanchi = {
	allCount: string; // total danchis matching this search — same value repeated on every entry
	shisya: string; // office/branch code
	danchi: string; // complex code
	shikibetu: string; // sub-identifier — shisya + danchi + shikibetu together uniquely id the complex
	danchiNm: string; // complex name, e.g. "金町第二"
	place: string; // address
	traffic: string; // nearest station(s) + walk time, HTML string (<li> list)
	floorAll: string;
	room: UrRoom[]; // currently vacant rooms in this complex
};
