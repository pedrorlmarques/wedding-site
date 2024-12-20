interface Artist {
	external_urls: {
		spotify: string;
	};
	href: string;
	id: string;
	name: string;
	type: string;
	uri: string;
}

interface Image {
	height: number;
	url: string;
	width: number;
}

interface Album {
	album_group: string;
	album_type: string;
	artists: Artist[];
	available_markets: string[];
	external_urls: {
		spotify: string;
	};
	href: string;
	id: string;
	images: Image[];
	name: string;
	release_date: string;
	release_date_precision: string;
	total_tracks: number;
	type: string;
	uri: string;
}

declare interface Track {
	album: Album;
	artists: Artist[];
	available_markets: string[];
	disc_number: number;
	duration_ms: number;
	explicit: boolean;
	external_ids: {
		isrc: string;
	};
	external_urls: {
		spotify: string;
	};
	href: string;
	id: string;
	is_local: boolean;
	is_playable: boolean;
	name: string;
	popularity: number;
	preview_url: string;
	track_number: number;
	type: string;
	uri: string;
	status?: 'APPROVED' | 'PENDING' | 'REJECTED';
}

declare interface UserSongRequest {
	created_at?: string;
	link: string;
	track_id: string;
	user_id: string;
	track_approval_status: 'APPROVED' | 'PENDING' | 'REJECTED';
}

declare interface SpotifySearchResult {
	tracks: {
		href: string;
		items?: Track[];
		limit: number;
		next: string | null;
		offset: number;
		previous: string | null;
		total: number;
	};
}
