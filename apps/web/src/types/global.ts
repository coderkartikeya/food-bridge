

export type Role = 'VOLUNTEER' | 'NGO' | 'DONOR' | 'ADMIN';

export interface LocationDTO {
  latitude: number;
  longitude: number;
}


export interface User {
  id?: string; 
  name: string;
  email: string;
  phoneNumber: string | null;
  role: Role;
  location: LocationDTO | null;
  avatar?:string;
}


export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
}
