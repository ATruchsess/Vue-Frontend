import Toast from 'primevue/toast'

export function useErrorHandler(app: any) {
  app.config.errorHandler = (error: any, instance: any, info: any) => {
    const toast = instance?.$toast || instance?.proxy?.$toast

    if (toast) {
      toast.add({
        severity: 'warn',
        summary: 'Application Warning',
        detail: 'An error occurred',
        life: 500000,
      })
    } else {
      console.warn('Unhandled Error:', error)
    }

    console.error(`Error: ${error.message}`, { info })
  }

  app.config.warnHandler = (msg: any, instance: any, trace: any) => {
    console.warn('Vue Warning:', msg, trace)
  }
}
