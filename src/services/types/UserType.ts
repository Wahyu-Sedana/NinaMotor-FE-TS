export interface User {
  id: string;
  nama: string;
  email: string;
  password: string;
  alamat?: string;
  no_telp?: string;
}

export interface AuthenticationModel {
  token: string;
  status: number;
  message: string;
  user: User;
}

export interface AuthenticationLogoutModel {
  status: number;
  message: string;
}
