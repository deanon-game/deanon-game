const getCircularReplacer = () => {
  const seen = new WeakSet()
  return (key: string, value: any) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return
      }
      seen.add(value)
    }
    return value
  }
}

export default function (payload: any) {
  try {
    return JSON.parse(JSON.stringify(payload, getCircularReplacer()))
  } catch (error) {
    console.error(error)
  }
}
