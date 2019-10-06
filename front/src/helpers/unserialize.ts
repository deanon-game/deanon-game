import CircularJSON from 'circular-json'

export default function (payload: any) {
  try {
    console.log(payload)
    return CircularJSON.parse(payload)
  } catch (error) {
    console.error(error)
  }
}
