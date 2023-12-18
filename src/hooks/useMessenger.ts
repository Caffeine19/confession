import { inject, provide, ref, type InjectionKey, type Ref } from 'vue'

type MessengerOptions = {
  show: boolean
  text: string
  status: boolean
}

const messengerOptionsKey = Symbol('messengerOptions') as InjectionKey<Ref<MessengerOptions>>
const showMessengerKey = Symbol('showMessenger') as InjectionKey<
  (options: Pick<MessengerOptions, 'text' | 'status'>) => void
>
const hideMessengerKey = Symbol('hideMessenger') as InjectionKey<() => void>

export const useProvideMessenger = () => {
  const messengerOptions = ref({
    show: false,
    text: '',
    status: false
  })

  provide(messengerOptionsKey, messengerOptions)

  const showMessenger = ({ text, status }: Pick<MessengerOptions, 'text' | 'status'>) => {
    messengerOptions.value.show = true
    messengerOptions.value.text = text
    messengerOptions.value.status = status

    setTimeout(() => {
      messengerOptions.value.show = false
    }, 3000)
  }
  provide(showMessengerKey, showMessenger)

  const hideMessenger = () => {
    messengerOptions.value.show = false
  }
  provide(hideMessengerKey, hideMessenger)
}

export const useInjectMessenger = () => {
  const messengerOptions = inject(messengerOptionsKey)

  const showMessenger = inject(showMessengerKey, () =>
    console.error('showMessenger is not provided')
  )

  const hideMessenger = inject(hideMessengerKey, () =>
    console.error('hideMessenger is not provided')
  )

  return {
    messengerOptions,
    showMessenger,
    hideMessenger
  }
}
