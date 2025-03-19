export type User = {
  id: string;
  username: string;
  email?: string | null;
  session?: Session;
};

export type Session = {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
};
