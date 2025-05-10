import { v4 as uuidv4 } from "uuid";

export interface GuestUser {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

export const createGuestUser = (): GuestUser => {
  const guestId = uuidv4();
  return {
    id: guestId,
    name: `Guest-${guestId.slice(0, 8)}`,
    email: `guest-${guestId.slice(0, 8)}@guest.com`,
    createdAt: new Date(),
  };
};
