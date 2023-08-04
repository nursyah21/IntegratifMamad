import { useEffect, useState,useRef } from 'react';
import WelcomeBanner from "../components/WelcomeBanner";
import { AUTH, USER } from '../components/type';
import { buttonClass, inputClass } from '../css/style';
import { fetchData, fetchDataUser } from '../components/fetchApi';
import KelolaKaryawan from './dashboard/KelolaKaryawan';
import { Card, Box, CardContent, Typography, CardActions, Button } from '@mui/material';
import KelolaPenyewa from './dashboard/KelolaPenyewa';
import KelolaKendaraan from './dashboard/KelolaKendaraan';
import KelolaTransaksi from './dashboard/KelolaTransaksi';
import { baseURL } from '../components/url';



export const fetchDataKendaraan = async (role) => {
  try{
    return fetch(baseURL + (role == 'ADMIN' ? '/kendaraan/super-all' : '/kendaraan/all'), {
      method: 'GET'
    }).then(data=>data.json()).then(data=>data)
  }catch(e){
    console.log(e)
  }
  return {}
}

export const fetchDataPenyewa = async (role) => {
  try{
    return fetch(baseURL + (role == 'ADMIN' ? '/penyewa/super-all' : '/penyewa/all'), {
      method: 'GET'
    }).then(data=>data.json()).then(data=>data)
  }catch(e){
    console.log(e)
  }
  return {}
}

export const fetchDataTransaksi = async (role) => {
  try{
    return fetch(baseURL + '/transaksi/all' , {
      method: 'GET'
    }).then(data=>data.json()).then(data=>data)
  }catch(e){
    console.log(e)
  }
  return {}
}

function Dashboard({token=AUTH }) {
  const [username, setUsername] = useState('')
  const [dataKaryawan, setDataKaryawan] = useState([])
  const [dataKendaraan, setDataKendaraan] = useState([])
  const [dataPenyewa, setDataPenyewa] = useState([])
  const [dataTransaksi, setDataTransaksi] = useState([])
  const role = useRef('')
  const [kelolaKaryawanPage, setKelolaKaryawanPage] = useState(false)
  const [kelolaTransaksiPage, setKelolaTransaksiPage] = useState(false)
  const [kelolaPenyewaPage, setKelolaPenyewaPage] = useState(false)
  const [kelolaKendaraanPage, setKelolaKendaraanPage] = useState(false)

  const signOut = () => {
    localStorage.clear()
    window.location.reload()
  }

  

  const KaryawanCard = ({setOpen, Open}) => {
    return <>
      <CardContent >
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Karyawan
        </Typography>
        <Typography variant="h5" component="div">
          Api to manage karyawan
        </Typography>
        
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => {
          setKelolaTransaksiPage(false)
          setKelolaPenyewaPage(false)
          setKelolaKendaraanPage(false)
          setOpen(!Open)
        }}>
          {!Open ? <>Open</> : <>Close</>}
        </Button>
      </CardActions>
    </>  
  }

  const TransaksiCard = ({setOpen, Open}) => {
    return <>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Transaksi
      </Typography>
      <Typography variant="h5" component="div">
        Api to manage transaksi
      </Typography>
      
    </CardContent>
    <CardActions>
      <Button size="small" onClick={() => {
        setKelolaKaryawanPage(false)
        setKelolaPenyewaPage(false)
        setKelolaKendaraanPage(false)
        setOpen(!Open)
      }}>
        {!Open ? <>Open</> : <>Close</>}
      </Button>
    </CardActions>
  </>  
  }

  const PenyewaCard = ({setOpen, Open}) => {
    return <>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Penyewa
      </Typography>
      <Typography variant="h5" component="div">
        Api to manage penyewa
      </Typography>
      
    </CardContent>
    <CardActions>
      <Button size="small" onClick={() => {
        setKelolaTransaksiPage(false)
        setKelolaKaryawanPage(false)
        setKelolaKendaraanPage(false)
        setOpen(!Open)
      }}>
        {!Open ? <>Open</> : <>Close</>}
      </Button>
    </CardActions>
  </>  
  }

  const KendaraanCard = ({setOpen, Open}) => {
    return <>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Kendaraan
      </Typography>
      <Typography variant="h5" component="div">
        Api to manage kendaraan
      </Typography>
      
    </CardContent>
    <CardActions>
      <Button size="small" onClick={() => {
        setKelolaTransaksiPage(false)
        setKelolaPenyewaPage(false)
        setKelolaKaryawanPage(false)
        setOpen(!Open)
      }}>
        {!Open ? <>Open</> : <>Close</>}
      </Button>
    </CardActions>
  </>}  
  
  useEffect(()=>{
    (async function(){
      setUsername(token.username)
      await fetchData(token.accessToken).then(data=>{
        setDataKaryawan(data)
        role.current = data.find((e=USER)=>e.username === token.username).roleKaryawan  ?? ''
      }).catch(e=>localStorage.clear() && window.location.reload())
  
      // datakendaraan
      await fetchDataKendaraan(role.current).then(data=>{
        setDataKendaraan(data)
      })

      await fetchDataPenyewa(role.current).then(data=>{
        setDataPenyewa(data)
      })

      await fetchDataTransaksi(role.current).then(data=>{
        setDataTransaksi(data)
      })

    })()

  }, [])

  return (
    <div className="flex h-screen">

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-hidden">

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Welcome banner */}
            <WelcomeBanner username={username} role={`${role.current}`}>
              <div className='mt-4'>
                <button className={buttonClass} onClick={signOut}>
                  Sign Out
                </button>
              </div>
            </WelcomeBanner>

            <div className='gap-y-5 sm:flex sm:gap-x-5'>
              <Box sx={{ minWidth: 275 }}>
                <Card variant="elevation" className='max-w-sm mb-5 sm:mb-0'>
                  <KaryawanCard setOpen={setKelolaKaryawanPage} Open={kelolaKaryawanPage} />
                </Card>
              </Box>
              <Box sx={{ minWidth: 275 }}>
                <Card variant="elevation" className='max-w-sm mb-5 sm:mb-0'>
                  <TransaksiCard setOpen={setKelolaTransaksiPage} Open={kelolaTransaksiPage} />
                </Card>
              </Box>
              <Box sx={{ minWidth: 275 }}>
                <Card variant="elevation" className='max-w-sm mb-5 sm:mb-0'>
                  <PenyewaCard setOpen={setKelolaPenyewaPage} Open={kelolaPenyewaPage} />
                </Card>
              </Box>
              <Box sx={{ minWidth: 275 }}>
                <Card variant="elevation" className='max-w-sm mb-5 sm:mb-0'>
                  <KendaraanCard setOpen={setKelolaKendaraanPage} Open={kelolaKendaraanPage} />
                </Card>
              </Box>
            </div>
            
            {kelolaKaryawanPage ?  <KelolaKaryawan className="bg-black" token={token} role={role.current} data={dataKaryawan} setData={setDataKaryawan}/> : null }
            {kelolaPenyewaPage ?  <KelolaPenyewa token={token} role={role.current} data={dataPenyewa} setData={setDataPenyewa}/> : null }
            {kelolaKendaraanPage ?  <KelolaKendaraan className="bg-black" role={role.current} data={dataKendaraan} setData={setDataKendaraan} /> : null }
            {kelolaTransaksiPage ?  <KelolaTransaksi token={token} role={role.current} data={dataTransaksi} setData={setDataTransaksi} /> : null }

          </div>
        </main>

      </div>
    </div>
  );
}

export default Dashboard;