// @flow

export const world: string = 'Hello World!'

if (process.env.NODE_ENV !== 'production') {
  console.log('This log is output in development mode only') // eslint-disable-line
}
