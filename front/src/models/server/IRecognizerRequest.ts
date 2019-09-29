type Connection = any
type Data = any

export default interface Request {
  auth: Connection,
  data: Data
}
