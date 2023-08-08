import {Routes,Route} from 'react-router-dom';

import './css/style.css';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import { useEffect } from 'react';
import { fetchData } from './components/fetchApi';


async function loginUser(credentials) {

  return fetch(loginUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json()).catch(data => "")
}

function App() {
  let token = JSON.parse(localStorage.getItem('token'));
  

  return (
    <>
      <Routes>
        <Route exact path="/" element={token ?<Dashboard token={token} /> : <Login />} />
        <Route exact path="/login" element={<Login />} />
        
        {/* <Route exact path="/register" element={<Register />} /> */}
      </Routes>
    </>
  );
}

export default App;
