declare interface Credentials {
	email: string;
	password: string;
	name?: string;
	provider?: 'email' | 'google' | undefined;
}

declare interface User {
	email: string;
	password: string;
	name?: string;
	confirmPassword?: string;
	rememberMe?: boolean;
}

declare interface Guest {
	name: string;
	restrictions: string;
	added: boolean;
	isOpen: boolean;
}

declare interface UserForInvitation {
	name: string;
	restrictions: string;
	added: boolean;
	isOpen: boolean;
}
declare interface CompanionsFromDB {
	companions: string;
	user_restrictions: string;
	user_id: string;
	created_at: string;
	id: string;
}
declare interface InvitedPerson {
	user: UserForInvitation;
	guests: Guest[];
}

declare interface IPublication {
	id: number;
	created_at: string;
	title: string;
	user_name: string;
	user_id: string;
	comments: {};
	files: {
		path: string;
		name: string;
		type: string;
	}[];
}
