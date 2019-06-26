export default http
export { makeQuery }

function http(url, {
  headers = {
    'Accept':       'application/json',
    'Content-Type': 'application/json',
  }
} = {}) {
  return {
    get:  (params = null) => request({
      method: 'GET',
      url:    url + (params !== null ? ('?' + makeQuery(params)) : ''),
      headers,
    }),
    post: (params = null) => request({
      method: 'POST',
      url,
      headers,
      body:   makePostParams(params),
    }),
  }
}

function request(obj) {
  return (
    new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest()
      xhr.open(obj.method, obj.url, true)
      if (obj.headers) {
        Object.keys(obj.headers).forEach(key => {
          xhr.setRequestHeader(key, obj.headers[key])
        })
      }
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(JSON.parse(xhr.response))
        } else {
          reject(xhr.statusText)
        }
      }
      xhr.onerror = () => reject(xhr.statusText)
      xhr.send(obj.body)
    })
  )
}

function makePostParams(params = null) {
  if (params === null) {
    return null
  }

  return params instanceof FormData ? params : JSON.stringify(params)
}

function makeQuery(queryParams) {
  const arr = Object.keys(queryParams).map(function (k) {
    return k + '=' + encodeURIComponent(queryParams[k])
  })

  return arr.join('&')
}
