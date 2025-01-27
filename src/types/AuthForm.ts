export interface LoginForm {
  email: string
  password: string
}

export interface RegisterForm extends LoginForm {
  orderNumber: number | null
  fullName: string
  passwordConfirm: string
}
