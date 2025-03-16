export type User = {
  id: string;
  username: string;
  email?: string | null;
  sessions?: Session[];
};

export type Session = {
  id: string;
  userId: string;
  token: string;
  expiresAt: string;
};
