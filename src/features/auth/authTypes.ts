export type ArgLoginType = {
  email: string
  password: string
  rememberMe: boolean
}
export type ArgRegistrationType = Omit<ArgLoginType, "rememberMe">;

export type ProfileType = {
  _id: string;
  email: string;
  rememberMe: boolean;
  isAdmin: boolean;
  name: string;
  verified: boolean;
  publicCardPacksCount: number;
  created: string;
  updated: string;
  avatar:string;
  __v: number;
  token: string;
  tokenDeathTime: number;
}

export type ArgForgotType = {
  email: string
  from: string
  message: string
}
export type ArgChangePassword = {
  password: string | undefined,
  resetPasswordToken: string
}

export type   ValueType = {
  email?: null | string
  password?: null | string
  rememberMe?: boolean
  confirmPassword?: null | string
}


export type FormikErrorType = {
  email?: string
  password?: string
  rememberMe?: boolean
  confirmPassword?: string
}

export type ChangeProfileType = {
  name: string | undefined,
  avatar: string
}

