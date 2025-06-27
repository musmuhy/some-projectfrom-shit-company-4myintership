import { User } from "../types/chatTypes";

export const mockUsers: User[]  = [
  {
    id: "1",
    name: "Admin",
    email: "Admin@mail.com",
    role: "Administrator",
    lastSeen: "Online",
    online: true,
  },
  {
    id: "2",
    name: "Jane Doe",
    email: "Janedoe@mail.com",
    role: "Designer",
    lastSeen: "Online",
    online: true,
  },
];