import axios, { AxiosTransformer } from '../../src/index'
import qs from 'qs'

// axios.defaults.headers.common['test2'] = 123

// axios.defaults.headers.post['test3'] = 123456
// axios({
//   url: '/config/post',
//   method: 'post',
//   data: qs.stringify({
//     a: 1
//   }),
//   headers: {
//     test: '321'
//   }
// })
//   .then(res => {
//     console.log(res.data)
//   })
//   .catch(e => console.error(e))

// axios({
//   url: '/config/get',
//   method: 'get',
//   headers: {
//     test: '321'
//   }
// })
//   .then(res => {
//     console.log(res.data)
//   })
//   .catch(e => console.error(e))
// axios({
//   transformRequest: function(data) {
//     data.c = 3
//     return qs.stringify(data)
//   },
//   transformResponse: function(data) {
//     if (typeof data === 'object') {
//       data.b = 2
//     }
//     return data
//   },
//   url: '/config/post',
//   method: 'post',
//   data: {
//     a: 1
//   }
// })
//   .then(res => {
//     console.log(res.data)
//   })
//   .catch(e => console.error(e))
axios.defaults.headers.common['test2'] = 123

const instance = axios.create({
  transformRequest: [
    function(data) {
      data.c = 8
      return qs.stringify(data)
    }
  ],
  transformResponse: [
    function(data) {
      if (typeof data === 'object') {
        data.b = 2
      }
      return data
    }
  ]
})

instance({
  url: '/config/post',
  method: 'post',
  data: {
    a: 1
  }
})
  .then(res => {
    console.log(res.data)
  })
  .catch(e => console.error(e))
