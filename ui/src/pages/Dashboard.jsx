import { useEffect, useState,useRef } from 'react';
import WelcomeBanner from "../components/WelcomeBanner";
import { AUTH, USER } from '../components/type';
import { buttonClass, inputClass } from '../css/style';
import { fetchData, fetchDataUser } from '../components/fetchApi';
import KelolaKaryawan from './dashboard/KelolaKaryawan';
import { Card, Box, CardContent, Typography, CardActions, Button } from '@mui/material';



function Dashboard({token=AUTH }) {
  const [username, setUsername] = useState('')
  const [data, setData] = useState([])
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
      <CardContent>
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
    setUsername(token.username)
    fetchData(token.accessToken).then(data=>{
      setData(data)
      role.current = data.find((e=USER)=>e.username === token.username).roleKaryawan  ?? ''
    }).catch(e=>localStorage.clear() && window.location.reload())
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

            <div className='flex gap-x-5'>
              <Box sx={{ minWidth: 275 }}>
                <Card variant="elevation" className='max-w-sm'>
                  <KaryawanCard setOpen={setKelolaKaryawanPage} Open={kelolaKaryawanPage} />
                </Card>
              </Box>
              <Box sx={{ minWidth: 275 }}>
                <Card variant="elevation" className='max-w-sm'>
                  <TransaksiCard setOpen={setKelolaTransaksiPage} Open={kelolaTransaksiPage} />
                </Card>
              </Box>
              <Box sx={{ minWidth: 275 }}>
                <Card variant="elevation" className='max-w-sm'>
                  <PenyewaCard setOpen={setKelolaPenyewaPage} Open={kelolaPenyewaPage} />
                </Card>
              </Box>
              <Box sx={{ minWidth: 275 }}>
                <Card variant="elevation" className='max-w-sm'>
                  <KendaraanCard setOpen={setKelolaKendaraanPage} Open={kelolaKendaraanPage} />
                </Card>
              </Box>
            </div>
            
            {kelolaKaryawanPage ?  <KelolaKaryawan token={token} role={role.current} data={data} setData={setData}/> : null }

          </div>
        </main>

      </div>
    </div>
  );
}

export default Dashboard;