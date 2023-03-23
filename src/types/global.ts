declare interface Credentials {
  email: string;
  password: string;
  provider?: "email" | "google" | undefined;
}

declare interface User {
  email: string;
  password: string;
  confirmPassword?: string;
}
