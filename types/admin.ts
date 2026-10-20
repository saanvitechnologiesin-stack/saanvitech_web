export interface AdminUserType {
  id?: number | string;
  email: string;
  password_hash: string;
  username?: string;
  name?: string;
  created_at?: string;
  updated_at?: string;
}
