# Интерфейс общение со Vuex

Каждый модуль должен возвращать объект реализующий интерфейс `Response` а на входе принимать единственным параметром объект реализующий интерфейст `Request`

```typescript
interface Request {
    auth: Connection,
    data: Data
}

interface Response {
    messages: Array<Message>
}
```
