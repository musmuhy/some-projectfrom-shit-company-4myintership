export interface User {
  id: string;
  name: string;
  avatar?: string;
  role: string;
  lastSeen: string;
  online?: boolean;
  email?: string;
  contactNumber?: string;
  address?: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
}