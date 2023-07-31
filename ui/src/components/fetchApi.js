import { karyawanAllUrl, karyawanIdUrl } from "./url"

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
  