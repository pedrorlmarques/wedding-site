declare interface Credentials {
  email: string;
  password: string;
  name?: string;
  provider?: "email" | "google" | undefined;
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
  isRemoved: boolean;
  isEdited: boolean;
  added: boolean;
  isOpen: boolean;
}

declare interface InvitedPerson {
  name: string;
  uuid: string;
  guests: Guest[] | [];
}
