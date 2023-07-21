export const getEnvVariables = () => {

  // import.meta.env

  return {
    VITE_URL_API: import.meta.env.VITE_URL_API
  }
}