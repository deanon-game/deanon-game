import CircularJSON from 'circular-json'

export default function (payload: any) {
  try {
    return CircularJSON.stringify(payload)
  } catch (error) {
    console.error(error)
  }
}
