export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
  venueManager: boolean;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type User = {
  name: string;
  email: string;
  accessToken: string;
  venueManager: boolean;
};
