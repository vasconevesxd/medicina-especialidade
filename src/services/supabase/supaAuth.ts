import { supabase } from '@/services/supabase/supabaseClient'
import type { LoginForm, RegisterForm } from '@/types/AuthForm'

export const login = async (formData: LoginForm) => {
  const { error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  })

  return { error }
}

export const register = async (formData: RegisterForm) => {
  const { error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        order_number: formData.orderNumber,
        full_name: formData.fullName,
      },
    },
  })

  if (error) return console.log(error)

  return true
}

export const logout = async () => {
  const { error } = await supabase.auth.signOut()

  if (error) return console.log(error)

  return true
}
