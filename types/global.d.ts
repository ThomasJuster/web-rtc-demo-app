import '@types/dom-mediacapture-record'
export {}

declare global {
  type Listener<T = unknown> = (value: T) => unknown
}
