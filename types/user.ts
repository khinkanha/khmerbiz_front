export interface User {
  userid: number
  username: string
  domain_id: number
  full_name: string
  phone: string
  address: string | null
  email: string
  sitebuilder: number
  user_level: UserLevel
  
  
}

export enum UserLevel {
  SUPPER_ADMIN = -1,
  WEB_ADMIN = 1,
  NORMAL = 2,
}

export interface AuthResponse {
  user: User
  accessToken: string
  refreshToken: string
}

export interface LoginForm {
  username: string
  password: string
}

export interface SignupForm {
  username: string
  email: string
  full_name: string
  password: string
  phone?: string
}

export interface ProfileForm {
  full_name: string
  phone: string
  email: string
}

export interface PasswordForm {
  current_password: string
  new_password: string
  confirm_password: string
}
