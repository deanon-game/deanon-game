import CircularJSON from 'circular-json'

export default function (payload: string): any {
  try {
    return CircularJSON.parse(payload)
  } catch (error) {
    console.error(error)
  }
}
