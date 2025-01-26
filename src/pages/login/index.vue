<script lang="ts" setup>
import { useForm } from 'vee-validate'
import * as yup from 'yup'

const schema = yup.object({
  email: yup.string().required().email().label('Email Address'),
  password: yup.string().required().min(6).label('Password'),
})

interface FormData {
  orderNumber: number | null
  email: string
  password: string
}

const { defineField, handleSubmit, values, errors } = useForm<FormData>({
  validationSchema: schema,
  initialValues: {
    email: '',
    password: '',
  },
})

const [email] = defineField('email')
const [password] = defineField('password')

const onSubmit = handleSubmit((values) => {
  console.log('Submitted with', values)
})
</script>

<template>
  <div class="flex justify-center items-center min-h-screen">
    <div class="card w-full max-w-sm p-4 shadow-lg rounded-xl bg-white text-gray-600">
      <h2 class="text-center text-2xl font-semibold mb-4">Login</h2>
      <Form :initialValues="values" @submit="onSubmit" class="flex flex-col gap-4">
        <div class="flex flex-col gap-1">
          <InputText
            id="email"
            v-model="email"
            type="text"
            placeholder="Email"
            :class="{ 'p-invalid': errors?.email }"
          />
          <Message v-if="errors?.email" severity="error" size="small" variant="simple"
            >{{ errors?.email }}
          </Message>
        </div>

        <div class="flex flex-col gap-1">
          <Password
            type="text"
            v-model="password"
            placeholder="Password"
            :feedback="false"
            toggleMask
            fluid
            :invalid="errors?.password ? true : false"
          />
          <Message v-if="errors?.password" severity="error" size="small" variant="simple"
            >{{ errors?.password }}
          </Message>
        </div>

        <Button type="submit" severity="primary" label="Login" class="w-full p-button-rounded" />
      </Form>
      <p class="text-center text-sm mt-4">
        Don’t be a patient waiting.
        <RouterLink to="/signup" class="text-blue-500 hover:underline">Sign up!</RouterLink>
      </p>
    </div>
  </div>
</template>
