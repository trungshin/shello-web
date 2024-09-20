let apiRoot = ''
if (process.env.BUILD_MODE === 'dev') {
  apiRoot = 'http://localhost:5000'
}

if (process.env.BUILD_MODE === 'prod') {
  apiRoot = 'https://shello-api-vrtr.onrender.com'
}

export const API_ROOT = apiRoot