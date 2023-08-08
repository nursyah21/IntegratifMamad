const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express();
app.use(cors());
app.use(bodyParser.json())


// const LOGINREGIS = 'http://localhost:6969'
// const AKBAR = 'http://localhost:8081'
// const YURIDAN = 'http://localhost:9001'

// const LOGINREGIS = 'http://loginregis.serveo.net'
// const AKBAR = 'http://akbar.serveo.net'
// const YURIDAN = 'http://yuridan.serveo.net'

const LOGINREGIS = 'https://loginregis-production.up.railway.app'
const AKBAR = 'https://akbar-production.up.railway.app'
const YURIDAN = 'https://yuridan-production.up.railway.app'
const CHARLIE = 'https://charlie-production-655b.up.railway.app'


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

app.post('/karyawan/create', async (req,res) => {
    var credentials =  'Bearer '+ req.body['token']   
    try{
        var data = await fetch(LOGINREGIS + req.path, {
            method: 'POST',
            headers: {
                'Authorization': credentials,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body['data'])
        })
        .then(data => data.text())
        .catch(e=>res.send(e))
        if(data === '')return res.send('fail to create an account')
        return res.send(data)
    }catch {
        return res.send('error')
    }
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

// -----------------------------------------------------------------

app.get('/transaksi/all', async (req, res) => {
    try{
        var data = await fetch(AKBAR + req.path, {
            method: 'GET',
        }).then(data => data.json())
        return res.json(data)
    }catch(e){
        console.log(e)
        return res.json({status:'error'})
    }
})

app.get('/transaksi/find/id::id', async (req, res) => {
    try{
        var data = await fetch(AKBAR + req.path, {
            method: 'GET',
        }).then(data => data.json())
        console.log(data)
        return res.json(data)
    }catch(e){
        return res.json({status: 'error'})
    }
})

app.post('/transaksi/baru', async (req,res) => {
    try{
        var data = await fetch(AKBAR + req.path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body)
        }).then(data => data.text())
        console.log(data)
        return res.json(data)
    }catch(e){
        console.log(e)
        return res.json({status:'error'})
    }
});

app.post('/transaksi/id::id/edit-status', async (req,res) => {
    try{
        var data = await fetch(AKBAR + req.path, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body)
        }).then(data => data.text())
        console.log(data)
        return res.json(data)
    }catch(e){
        console.log(e)
        return res.json({status:'error'})
    }
});

app.post('/transaksi/id::id/edit-pengembalian', async (req,res) => {
    try{
        var data = await fetch(AKBAR + req.path, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body)
        }).then(data => data.text())
        console.log(data)
        return res.json(data)
    }catch(e){
        console.log(e)
        return res.json({status:'error'})
    }
});

// -----------------------------------------------------------------

app.post('/penyewa/create', async (req,res) => {
    var data = await fetch(CHARLIE + req.path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body)
    }).then(data => data.text())

    console.log(data)

    return res.json({status: data})
})

app.get('/penyewa/super-all', async (req, res) => {
    var data = await fetch(CHARLIE + req.path, {
        method: 'GET',
    }).then(data => data.json())
    console.log(data)
    return res.json(data)
})

app.get('/penyewa/all', async (req, res) => {
    var data = await fetch(CHARLIE + req.path, {
        method: 'GET',
    }).then(data => data.json())
    console.log(data)
    return res.json(data)
})

app.get('/penyewa/sedang-sewa', async (req, res) => {
    var data = await fetch(CHARLIE + req.path, {
        method: 'GET',
    }).then(data => data.json())
    console.log(data)
    return res.json(data)
})

app.get('/penyewa/find/:id', async (req, res) => {
    var data = await fetch(CHARLIE + req.path, {
        method: 'GET',
    }).then(data => data.json())
    console.log(data)
    return res.json(data)
})

app.get('/penyewa/hapus/:id/:bool', async (req,res) => {
    try{        
        var data = await fetch(CHARLIE + req.path, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            }
        }) 
        return res.json({})
    }catch(e){
        console.log(e)
        return res.json({error: e})
    }
});

app.get('/penyewa/sedang-sewa/:id/:bool', async (req,res) => {
    try{
        var data = await fetch(CHARLIE + req.path, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            }
        }) 
        return res.json({})
    }catch(e){
        console.log(e)
        return res.json({error: e})
    }
});

app.get('/penyewa/hapus-permanen/:id', async (req,res) => {
    try{
        var data = await fetch(CHARLIE + req.path, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        }) 
        return res.json({})
    }catch(e){
        console.log(e)
        return res.json({error: e})
    }
});

//---------------------------------------------------------------------------------------------------------------

app.post('/kendaraan/create', async (req,res) => {
    try{
        var data = await fetch(YURIDAN + req.path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },body: JSON.stringify(req.body)
        }).then(data => data.json())

        return res.json(data)
    }catch(e){
        console.log(e)
        return res.json({error: e})
    }
});

app.get('/kendaraan/all', async (req, res) => {
    var data = await fetch(YURIDAN + req.path, {
        method: 'GET',
    }).then(data => data.json())
    console.log(data)
    return res.json(data)
})

app.get('/kendaraan/super-all', async (req, res) => {
    var data = await fetch(YURIDAN + req.path, {
        method: 'GET',
    }).then(data => data.json())
    
    return res.json(data)
})

app.get('/kendaraan/log/id::id', async (req, res) => {
    console.log(req.path)
    var data = await fetch(YURIDAN + req.path, {
        method: 'GET',
    }).then(data => data.json())
    console.log(data)
    return res.json(data)
})

app.get('/kendaraan/find/id::id', async (req, res) => {
    console.log(req.path)
    var data = await fetch(YURIDAN + req.path, {
        method: 'GET',
    }).then(data => data.json()).catch(e=>res.send(e))
    if(data.error){
        return res.send('error')
    }
    console.log(data)
    return res.json(data)
})


app.get('/kendaraan/find-global/id::id/v::v', async (req, res) => {
    console.log(req.path)
    var data = await fetch(YURIDAN + req.path, {
        method: 'GET',
    }).then(data => data.json())
    console.log(data)
    return res.json(data)
})

app.post('/kendaraan/edit', async (req,res) => {
    try{
        var data = await fetch(YURIDAN + req.path, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },body: JSON.stringify(req.body)
        }).then(data => data.json())

        return res.json(data)
    }catch(e){
        console.log(e)
        return res.json({error: e})
    }
});


app.get('/kendaraan/status/:id/:bool', async (req,res) => {
    try{
        // console.log(req.path)
        var data = await fetch(YURIDAN + req.path, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(data => data.json()).catch(e=>{})

        return res.json(data)
    }catch(e){
        console.log(e)
        return res.json({error: e})
    }
});

app.get('/kendaraan/hapus/:id/:bool', async (req,res) => {
    try{
        var data = await fetch(YURIDAN + req.path, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            }
        }) 
        return res.json({})
    }catch(e){
        console.log(e)
        return res.json({error: e})
    }
});

app.get('/kendaraan/hapus-permanen/:id', async (req,res) => {
    try{
        var data = await fetch(YURIDAN + req.path, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        }) 
        return res.json({})
    }catch(e){
        console.log(e)
        return res.json({error: e})
    }
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
