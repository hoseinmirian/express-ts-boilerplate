// freeze an object and all its nested properties (useful for defining read-only constants)
function deepFreeze<T>(value: T): Readonly<T> {
  if (value === null || typeof value !== 'object') return value

  if (Object.isFrozen(value)) return value

  for (const key of Object.keys(value)) {
    const prop = (value as never)[key]
    if (prop && typeof prop === 'object') {
      deepFreeze(prop)
    }
  }

  return Object.freeze(value)
}

export { deepFreeze }
