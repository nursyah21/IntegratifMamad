const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express();
app.use(cors());
app.use(bodyParser.json())


const LOGINREGIS = 'http://localhost:6969'

app.post('/registration', async (req, res)=> {
    var data = await fetch(LOGINREGIS + req.path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body)
    }).then(data => data.text())
    console.log(data)
    return res.send(data)
})

app.post('/login', async (req, res)=> {
    try{
        var data = await fetch(LOGINREGIS + req.path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body)
        }).then(data => data.text())
        return res.send(data)
    }catch{
        return res.send('user not found')
    }

})

app.post('/karyawan/all', async (req,res) => {
    
    var credentials =  'Bearer '+ req.body['token']
    
    var data = await fetch(LOGINREGIS + req.path, {
        method: 'GET',
        headers: {
            'Authorization': credentials,
            'Content-Type': 'application/json',
        }}) 
        .then(data => data.text())
    
    return res.send(data)
});

app.post('/karyawan/:id', async (req,res) => {
    
    var credentials =  'Bearer '+ req.body['token']
    
    var data = await fetch(LOGINREGIS + req.path, {
        method: 'GET',
        headers: {
            'Authorization': credentials,
            'Content-Type': 'application/json',
        }
    }) 
    .then(data => data.text())
    .catch(e=>res.send(e))
    if(data === '')return res.send('user not found')
    
    return res.send(data)
});

// yang bisa diubah
// namaKaryawan
// nikKaryawan
// telpKaryawan
// alamatKaryawan
// roleKaryawan
app.post('/karyawan/update/:id', async (req,res) => {
    var credentials =  'Bearer '+ req.body['token']   
    try{
        var data = await fetch(LOGINREGIS + req.path, {
            method: 'PUT',
            headers: {
                'Authorization': credentials,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body['data'])
        })
        .then(data => data.text())
        .catch(e=>res.send(e))
        if(data === '')return res.send('user not found')
        
        return res.send(data)
    }catch {
        return res.send('error')
    }
});

app.post('/karyawan/delete/:id', async (req,res) => {
    
    var credentials =  'Bearer '+ req.body['token']
    
    var data = await fetch(LOGINREGIS + req.path, {
        method: 'DELETE',
        headers: {
            'Authorization': credentials,
            'Content-Type': 'application/json',
        }
    }) 
    .then(data => data.text())
    .catch(e=>res.send(e))
    if(data === '')return res.send('user not found')
    return res.send(data)
});


const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);