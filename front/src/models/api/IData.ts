export default interface IData<P, E> {
  query: string,
  params: P,
  extra: E
}
