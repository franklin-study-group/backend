export interface AuthenticationBody {
  email: string
  password: string
}

export enum Field {
  EMAIL = "email",
  PASSWORD = "password"
}

export interface AuthenticationRespose {
  successful: boolean
  error?: {
    field: Field
    message: string
  }
}
