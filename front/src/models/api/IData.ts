
export default interface IData<P, E> {
  /* Use for Client & Host Massages */
  query: string,
  params: P,
  extra: E
}
