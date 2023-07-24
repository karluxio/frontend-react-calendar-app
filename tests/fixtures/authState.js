export const initialState = {
    status: 'checking', // 'authenticated', 'not-authenticated'
    user: {},
    errorMessage: undefined
  }

  export const authenticatedState = {
    status: 'authenticated', // 'checking', 'not-authenticated'
    user: {
      uid: '123ABC',
      name: 'John Doe'
    },
    errorMessage: undefined
  }

  export const notAuthenticatedState = {
    status: 'not-authenticated', // 'authenticated', 'checking', 'not-authenticated'
    user: {},
    errorMessage: undefined
  }