<script lang="ts" setup>
import { register } from '@/services/supabase/supaAuth'
import type { RegisterForm } from '@/types/AuthForm'
import { useForm } from 'vee-validate'
import * as yup from 'yup'

const router = useRouter()

const schema = yup.object({
  orderNumber: yup.number().required().label('Order Number'),
  fullName: yup.string().required().label('Full Name'),
  email: yup.string().required().email().label('Email Address'),
  password: yup.string().required().min(6).label('Password'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required()
    .label('Password confirmation'),
})

const { defineField, handleSubmit, values, errors } = useForm<RegisterForm>({
  validationSchema: schema,
  initialValues: {
    orderNumber: null,
    fullName: '',
    email: '',
    password: '',
    passwordConfirm: '',
  },
})

const [orderNumber] = defineField('orderNumber')
const [fullName] = defineField('fullName')
const [email] = defineField('email')
const [password] = defineField('password')
const [passwordConfirm] = defineField('passwordConfirm')

const onSubmit = handleSubmit(async (values) => {
  console.log(values)
  const isRegistered = await register(values)
  if (isRegistered) router.push({ name: '/login' })
})
</script>

<template>
  <div class="flex justify-center items-center min-h-screen">
    <div class="card w-full max-w-sm p-4 shadow-lg rounded-xl bg-white text-gray-600">
      <h2 class="text-center text-2xl font-semibold mb-4">Sign Up</h2>
      <Form :initialValues="values" @submit="onSubmit" class="flex flex-col gap-4">
        <div class="flex flex-col gap-1">
          <InputNumber
            id="orderNumber"
            v-model="orderNumber"
            :useGrouping="false"
            placeholder="Order Number"
            :class="{ 'p-invalid': errors?.orderNumber }"
            fluid
          />
          <Message v-if="errors?.orderNumber" severity="error" size="small" variant="simple"
            >{{ errors?.orderNumber }}
          </Message>
        </div>

        <div class="flex flex-col gap-1">
          <InputText
            id="fullName"
            v-model="fullName"
            type="text"
            placeholder="Full Name"
            :class="{ 'p-invalid': errors?.fullName }"
          />
          <Message v-if="errors?.fullName" severity="error" size="small" variant="simple"
            >{{ errors?.fullName }}
          </Message>
        </div>

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
            v-model="password"
            placeholder="Password"
            promptLabel="Choose a password"
            weakLabel="Too simple"
            mediumLabel="Average complexity"
            strongLabel="Complex password"
            toggleMask
            fluid
            :invalid="errors?.password ? true : false"
          >
            <template #header>
              <div class="font-semibold text-xm mb-4">Pick a password</div>
            </template>
            <template #footer>
              <Divider />
              <ul class="pl-2 ml-2 my-0 leading-normal">
                <li>At least one lowercase</li>
                <li>At least one uppercase</li>
                <li>At least one numeric</li>
                <li>Minimum 8 characters</li>
              </ul>
            </template>
          </Password>

          <Message v-if="errors?.password" severity="error" size="small" variant="simple"
            >{{ errors?.password }}
          </Message>
        </div>
        <div class="flex flex-col gap-1">
          <Password
            type="text"
            v-model="passwordConfirm"
            placeholder="Password Confirm"
            :feedback="false"
            toggleMask
            fluid
            :invalid="errors?.passwordConfirm ? true : false"
          />
          <Message v-if="errors?.passwordConfirm" severity="error" size="small" variant="simple"
            >{{ errors?.passwordConfirm }}
          </Message>
        </div>

        <Button type="submit" severity="primary" label="Signup" class="w-full p-button-rounded" />
      </Form>
      <p class="text-center text-sm mt-4">
        Oh, it’s you again!
        <RouterLink to="/login" class="text-blue-500 hover:underline">Login here</RouterLink>
      </p>
    </div>
  </div>
</template>
