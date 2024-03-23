export function AttachOnChangeNotifier<T extends object>(
  obj: T,
  onChange: (prop: keyof T, prev: unknown, next: unknown) => void,
) {
  return new Proxy(obj, {
    set(target: any, property, nextValue) {
      const prev = target[property]
      target[property] = nextValue
      if (prev !== nextValue) {
        onChange(property as keyof T, prev, nextValue)
      }
      return true
    },
  })
}