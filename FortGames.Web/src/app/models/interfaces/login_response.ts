import { User } from "./users.interface";

export interface LoginResponse {
  token: string;
  user: User;
}
