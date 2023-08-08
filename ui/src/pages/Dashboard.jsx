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
import Loading from '../components/Loading';



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
  // const role = useRef('')
  const [role, setRole] = useState('')
  const [kelolaKaryawanPage, setKelolaKaryawanPage] = useState(false)
  const [kelolaTransaksiPage, setKelolaTransaksiPage] = useState(false)
  const [kelolaPenyewaPage, setKelolaPenyewaPage] = useState(false)
  const [kelolaKendaraanPage, setKelolaKendaraanPage] = useState(false)
  const [loading, setLoading] =useState(false)

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
      // setLoading(true)
      await fetchData(token.accessToken).then(data=>{
        console.log(data)
        setRole(
          data.find((e=USER)=>e.username === token.username).roleKaryawan  ?? ''
        )
        // role.current = 
      }).catch(e=>{
        console.log(e)
      })
    })()

  }, [])

  return (
    <div className="flex h-screen">

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-hidden">
        {
          loading ? <>Loading ...</> : 
          <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Welcome banner */}
            <WelcomeBanner username={username} role={role}>
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
            
            {kelolaKaryawanPage ?  <KelolaKaryawan className="bg-black" token={token} role={role} /> : null }
            {kelolaPenyewaPage ?  <KelolaPenyewa token={token} role={role} /> : null }
            {kelolaKendaraanPage ?  <KelolaKendaraan className="bg-black" role={role}  /> : null }
            {kelolaTransaksiPage ?  <KelolaTransaksi token={token} role={role} /> : null }

          </div>
        </main>
        }

      </div>
    </div>
  );
}

export default Dashboard;