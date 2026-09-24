export function buildFormData(input: Record<string, unknown>): FormData {
  const formData = new FormData()

  const append = (key: string, value: unknown) => {
    if (value === undefined || value === null) return

    if (value instanceof File) {
      formData.append(key, value)
      return
    }

    if (Array.isArray(value)) {
      value.forEach((item, index) => append(`${key}[${index}]`, item))
      return
    }

    if (typeof value === 'object') {
      Object.entries(value as Record<string, unknown>).forEach(([nestedKey, nestedValue]) =>
        append(`${key}[${nestedKey}]`, nestedValue),
      )
      return
    }

    if (typeof value === 'boolean') {
      formData.append(key, value ? '1' : '0')
      return
    }

    formData.append(key, String(value))
  }

  Object.entries(input).forEach(([key, value]) => append(key, value))

  return formData
}
