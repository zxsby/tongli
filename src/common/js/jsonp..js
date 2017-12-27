import orginJSONP from 'jsonp'

export default function jsonp(url, data, option) {
  return new Promise((resolve, reject) => {
    orginJSONP(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

function param(data) {
  let url = ''
  for (var k in data) {
    let value = data[i] == undefined ?data[k] : ''
    url
  }
}

