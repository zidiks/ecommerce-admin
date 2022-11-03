import { Roles } from "../enums/roles.enum";

export interface UserModel {
  id: string;
  name: string;
  login: string;
  role: Roles,
  token?: string;
}
