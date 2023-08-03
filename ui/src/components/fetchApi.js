import { baseURL, karyawanAllUrl, karyawanIdUrl } from "./url"

export const fetchData = async (auth) => {
    return fetch(karyawanAllUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({token: auth})
    }).then(data => data.json())
  
  }
  
export const fetchDataUser = async (auth,id) => {
  return fetch(karyawanIdUrl +id, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({token: auth})
  }).then(data => data.json())
}

export const fetchDataKendaraanId = async (id) => {
  return fetch(baseURL+'/kendaraan/find/id:' +id, {
    method: 'GET',
  }).then(data => data.json())
}
