export interface User {
  email: string,
  password: string
}

export interface UserSuccess{
  loggedUserId: string,
  message: string
  token: string
}
