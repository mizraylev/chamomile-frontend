<template>
  <form class="auth">
    <Transition>
      <AuthForm v-if="currentFormId === AuthFormId.Email" showLogo>
        <template #heading> Sign in to Chamomile </template>
        <template #fields>
          <BaseInput
            hasBorder
            placeholder="Email"
            type="email"
            autocomplete="email"
            name="email"
            :value="email"
            :errorMessage="errorMessage"
            @input="onEmailInput"
          />
          <BaseButton
            background="primary"
            :isLoading="isLoading"
            :disabled="!email"
            @click.prevent="checkEmail"
          >
            Next
          </BaseButton>
        </template>
        <!-- <template #info>
          By creating an account, you agree to our Terms&nbsp;&&nbsp;Privacy.
        </template> -->
      </AuthForm>
    </Transition>

    <Transition>
      <AuthForm v-if="currentFormId === AuthFormId.Password">
        <template #heading> Type in your password </template>
        <template #fields>
          <BaseInput
            hasBorder
            placeholder="Password"
            type="password"
            autocomplete="current-password"
            name="password"
            :value="password"
            :errorMessage="errorMessage"
            @input="onPasswordInput"
          />
          <BaseButton
            background="primary"
            :isLoading="isLoading"
            @click.prevent="checkPassword"
          >
            Next
          </BaseButton>
        </template>
      </AuthForm>
    </Transition>
  </form>
</template>

<script setup lang="ts">
import BaseButton from '@/app/components/BaseButton.vue'
import BaseInput from '@/app/components/BaseInput.vue'
import AuthForm from '../views/AuthForm.vue'

import router from '@/app/router'
import { ref } from 'vue'
import { AuthFormId } from '../utils/types'
import { areCredentialsCorrect, doesEmailExist } from '../services'
import { ChatRouteName } from '@/chat/router'
import { useAuthStore } from '../stores'

const currentFormId = ref(AuthFormId.Email)
const isLoading = ref(false)
const errorMessage = ref('')
const email = ref('')
const password = ref('')
const authStore = useAuthStore()

const checkEmail = async (): Promise<void> => {
  if (!email.value) return

  isLoading.value = true

  const isEmailCorrect = await doesEmailExist(email.value)

  if (isEmailCorrect) {
    currentFormId.value = AuthFormId.Password
  } else {
    errorMessage.value = 'Wrong email. Try again'
  }

  isLoading.value = false
}

const checkPassword = async (): Promise<void> => {
  if (!password.value) return

  isLoading.value = true

  const userId = await areCredentialsCorrect(email.value, password.value)

  if (userId) {
    authStore.setUserId(userId)

    router.push({
      name: ChatRouteName.Chat,
    })
  } else {
    errorMessage.value = 'Wrong password. Try again'
  }

  isLoading.value = false
}

const clearErrorMessage = (): void => {
  if (errorMessage.value) {
    errorMessage.value = ''
  }
}

const onEmailInput = (value: string): void => {
  email.value = value
  clearErrorMessage()
}

const onPasswordInput = (value: string): void => {
  password.value = value
  clearErrorMessage()
}
</script>

<style scoped>
.auth {
  display: flex;
  justify-content: center;
  align-items: center;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease;
}

.v-enter-from {
  transform: translateX(110%);
}

.v-leave-to {
  transform: translateX(-110%);
}

.v-enter-from,
.v-leave-to {
  position: absolute;
  opacity: 0;
}
</style>
