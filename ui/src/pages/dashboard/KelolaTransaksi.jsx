import { useEffect, useState,useRef } from 'react';
import { AUTH, USER } from '../../components/type';
import { baseURL, createKaryawanUrl, deleteUrl, karyawanAllUrl, karyawanIdUrl, updateUrl } from '../../components/url';
import { Popover, Dialog } from '@headlessui/react'
import { buttonClass, inputClass } from '../../css/style';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import { Listbox } from '@headlessui/react';
import { SelectRole } from '../Register';
import { fetchData, fetchDataKendaraanId, fetchDataPenyewaId, fetchDataTransaksiId, fetchDataUser } from '../../components/fetchApi';
import { RollerShadesClosedSharp } from '@mui/icons-material';
import { fetchDataKendaraan, fetchDataPenyewa, fetchDataTransaksi } from '../Dashboard';
import Loading from '../../components/Loading';
import moment from 'moment';


const schema = Yup.object({
  idKendaraan: Yup.number().required(),
  tanggalSewa: Yup.date().required(),
  tanggalKembali: Yup.date().required(),
  idPenyewa: Yup.number().required(),
  idPegawai: Yup.number().required(),
})
  
const CreateNew = ({token, setData, setIsOpen}) => {
  const [role, setRole] = useState('ADMIN')
  const [hidden, setHidden] = useState(true)
  const [wrong, setWrong] = useState(false)
  
  const handle = async (values) => {
    try{
      let kendaraan
      try{
        kendaraan = await fetchDataKendaraanId(values.idKendaraan)
      }catch{
        alert('id kendaraan not found')
        throw 'id kendaraan not found'
      }

      let penyewa
      try{
        penyewa = await fetchDataPenyewaId(values.idPenyewa)
      }catch{
        alert('id penyewa not found')
        throw 'id penyewa not found'
      }

      let pegawai
      try{
        // console.log(token)
        pegawai = await fetchDataUser(token, values.idPegawai)
      }catch(e){
        console.log(e)
        alert('id pegawai not found')
        throw 'id pegawai not found'
      }

      // console.log(values)
      await fetch(baseURL+'/transaksi/baru', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      }) .then(data => {
        data.text()
        console.log(data.type)
        if(data.type === 'cors'){
          alert('error: penyewa sedang memiliki transaksi aktif')
        }
      }).catch(data => {
        ""
      })
      
      await fetchDataTransaksi(role.current).then(data=>{
        setData(data)
        setIsOpen(false)
      })

    }catch(e){
      console.log(e)
    }
  }
  
  return <>

    <Formik
      initialValues={{
        idKendaraan: '',tipeKendaraan: '',tanggalSewa: '',tanggalKembali: '',idPenyewa: '', idPegawai: ''
      }}
      validationSchema={schema}
      onSubmit={(values) => handle(values)}
    >
      
      <Form>
        <div className='mb-4'>
          <label className="text-gray-700 dark:text-gray-200" htmlFor="idKendaraan">ID kendarran</label>
          <Field name="idKendaraan" type="text" className={inputClass} placeholder=''/>
          <ErrorMessage name="idKendaraan" component="div" />
        </div>

        <div className='mb-4'>
          <label className="text-gray-700 dark:text-gray-200" htmlFor="tipeKendaraan">Tipe Kendaraan</label>
          <Field name="tipeKendaraan" type="text" className={inputClass} placeholder=''/>
          <ErrorMessage name="tipeKendaraan" component="div" />
        </div>

        <div className='mb-4'>
          <label className="text-gray-700 dark:text-gray-200" htmlFor="tanggalSewa">Tgl Sewa</label>
          <Field type="date" name="tanggalSewa" className={inputClass} placeholder='' />
          <ErrorMessage name="tanggalSewa" component="div" />
        </div>

        <div className='mb-4'>
          <label className="text-gray-700 dark:text-gray-200" htmlFor="tanggalKembali">Tgl Kembali</label>
          <Field type="date" name="tanggalKembali" className={inputClass} placeholder='' />
          <ErrorMessage name="tanggalKembali" component="div" />
        </div>

        <div className='mb-4'>
          <label className="text-gray-700 dark:text-gray-200" htmlFor="idPenyewa">ID Penyewa</label>
          <Field name="idPenyewa" type="text" className={inputClass} placeholder='' />
          <ErrorMessage name="idPenyewa" component="div" />
        </div>

        <div className='mb-4'>
          <label className="text-gray-700 dark:text-gray-200" htmlFor="idPegawai">ID Pegawai</label>
          <Field name="idPegawai" type="text" className={inputClass} placeholder='' />
          <ErrorMessage name="idPegawai" component="div" />
        </div>
        
        <button type="submit" className={buttonClass} style={{width: '100%'}}>Submit</button>

      </Form>
    </Formik>
  </>
}
  
function ListData({token = AUTH, role='', data=[], setData}){
  const [isOpen, setIsOpen] = useState(false)
  const [dialogProps, setDialogProps] = useState({title:'', id:''})
  const searchValue = useRef()
  const [errorSearch, setErrorSearch] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const Tooltip = (id) => (<Popover className="relative">
    <Popover.Button className={'border px-2 rounded-md bg-gray-200 border-gray-200 font-bold hover:bg-gray-100'}>:</Popover.Button>

    <Popover.Panel className="absolute z-10 bg-white -ml-40 ">
      <div className="flex flex-col border border-gray-200 rounded-xl">
        <div className='hover:bg-gray-200 p-2'>
          <button onClick={()=>{
            setIsOpen(!isOpen)
            setDialogProps({title:'detail pengembalian', id:id})
          }}>
            <i className="fa fa-pencil mx-2" aria-hidden="true" />detail pengembalian
          </button>
        </div>
        <div className='hover:bg-gray-200 p-2'>
          <button onClick={()=>{
            setIsOpen(!isOpen)
            setDialogProps({title:'ubah status', id:id})
          }}>
            <i className="fa fa-pencil mx-2" aria-hidden="true" />Ubah Status
          </button>
        </div>
        {/* <div className='hover:bg-gray-200 p-2'>
          <button onClick={()=>{
            setIsOpen(!isOpen)
            setDialogProps({title:'Delete', id:id})
          }}>
            <i className='fa fa-trash mx-2' aria-hidden='true' />
            Delete
          </button>
          
        </div> */}
      </div>
    </Popover.Panel>
  </Popover>)

  // ------------------------------------------------------------------------------

  const MyDialog = ({props=dialogProps}) => {
    const [userData, setUserData] = useState()
    const [role, setRole] = useState('USER')    
    

    const deleteUser = async () => {
      await fetch(baseURL + '/penyewa/hapus-permanen/'+ props.id.id, {
        method: 'GET',
      })
      await fetchDataPenyewa(role.current).then(data=>{
        setData(data)
        setIsOpen(false)
      })
    }

    const updateUser = async (values) => {
      return await fetch(updateUrl + props.id.id, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({token:token.accessToken, data: values})
      }) .then(data => data.text()).catch(data => "")
    }

    const UbahStatus = () => {
      const [status, setStatus] = useState(null)
      const [selected, setSelected] = useState('sedang proses')


      useEffect(()=>{
        (async function(){
          try{
            console.log('fetch data')
            console.log(props.id.id)
            await fetchDataTransaksiId(props.id.id)
              .then(data=>{
                if(data.status)throw ''
                  setStatus(data.pengembalian)
                  // setSelected(data?.pengembalian?.status ?? 'sedang proses')
              })
          }catch(e){
            console.log(e)
          }
          console.log('finish fetch data')
        })()
      }, [])
      return <> {status ? <>
        <div>
          <Listbox value={selected} onChange={setSelected}>
            <Listbox.Button className={inputClass}>
              {selected}
            </Listbox.Button>
            <Listbox.Options className={'outline-none'}>
              {['selesai', 'sedang diproses'].map((i, idx)=> (
                <Listbox.Option
                key={idx}
                value={i}
                className={({ active }) =>
                  `relative cursor-default select-none p-2 outline-none ${
                    active ? 'bg-gray-200' : ''
                  }`}
                >{i}</Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        </div>

        <div className='flex mt-4 justify-center'>
          <button onClick={()=>{
              (async function(){
                // const link = baseURL + '/penyewa/sedang-sewa/' + props.id.id +'/' +(selected?'true':'false')
                try{
                  console.log('submit data')
                  await fetch(
                    baseURL + '/transaksi/id:'+props.id.id+'/edit-status',{
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({"statusSewa":selected})
                    }
                  )
                  await fetchDataTransaksi(role.current).then(data=>{
                    setData(data)
                    setIsOpen(false)
                  })
                  console.log('finish submit')
                }catch(e){
                  console.log(e)
                }
              })()
            }} className={buttonClass}>
            Submit
          </button>
        </div>
      </> : <>Loading ...</> }
      </>
    }

    const EditDialog = () => {
      const [dataEdit, setDataEdit] = useState(null)

      const handle = async (values)  => {
        try{
          console.log('submit data: '+ JSON.stringify(values.tambahanHari))
          await fetch(baseURL+ '/transaksi/id:'+props.id.id+'/edit-pengembalian', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                "notePengembalian" : values.notePengembalian,
                "tambahanHari": parseInt(values.tambahanHari)
              })
          })

          await fetchDataTransaksi(role.current).then(data=>{
            setData(data)
            setIsOpen(false)
          })
          console.log('finish submit')
        }catch(e){
          console.log(e)
        }
      }

      useEffect(()=>{
        (async function(){
          console.log(props.id.id)
          if(dataEdit)return
          fetchDataTransaksiId(props.id.id)
            .then(data=>{
              if(data.status){
                throw ''
              }
              setDataEdit(data.pengembalian)
              console.log(data.pengembalian)
            })
        })()
      }, [])
      
      return <> {dataEdit ? 
          <Formik
      initialValues={{
        notePengembalian : dataEdit.notePengembalian,tambahanHari: dataEdit.tambahanHari
      }}
      validationSchema={Yup.object({
          notePengembalian: Yup.string().required().min(3),
          tambahanHari: Yup.number().required()
        })
      }
      onSubmit={(values) => {
        handle(values)
      }}
    >
      <Form>
        <div className='mb-4'>
          <label className="text-gray-700 dark:text-gray-200" htmlFor="notePengembalian">Note Pengembalian</label>
          <Field name="notePengembalian" type="text" className={inputClass} placeholder=''/>
          <ErrorMessage name="notePengembalian" component="div" />
        </div>

        <div className='mb-4'>
          <label className="text-gray-700 dark:text-gray-200" htmlFor="tambahanHari">Tambahan Hari</label>
          <Field name="tambahanHari" type="text" className={inputClass} placeholder=''/>
          <ErrorMessage name="tambahanHari" component="div" />
        </div>

       
        <button type="submit" className={buttonClass} style={{width: '100%'}}>Submit</button>

      </Form>
    </Formik> : <>please wait...</>}
    </>  
      
    }

    return (
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
            {/* The actual dialog panel  */}
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >{props.title} {userData != undefined ? <>- {userData.username}</> : null}
                  </Dialog.Title>
            
              <div className='my-4'>
              {props.title === 'create new transaksi'
                ? <CreateNew token={token.accessToken} setData={setData} setIsOpen={setIsOpen} /> 
                : props.title === 'ubah status' 
                ? <UbahStatus />
                : props.title === 'detail pengembalian' ? <EditDialog /> 
                : <></> 
                // <> Are you sure to delete 
                //     <div className='gap-x-4 flex mt-2'>
                //       <button className={`${buttonClass} !bg-red-600 hover:!bg-red-800`} onClick={() => deleteUser()}>Delete</button>
                //       <button className={[buttonClass]} onClick={() => setIsOpen(false)}>Cancel</button>
                //     </div>
                //   </> 
                }
              </div>
          </Dialog.Panel>
          </div>
      </Dialog>
    )
  }

  // ---------------------------------------------------------------

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      const val = searchValue.current.value
      setErrorSearch('')
      if(isNaN(val)){
        setErrorSearch("you must enter only number")
        return
      }
      if(val === '') {
        fetchDataTransaksi(role).then(data=>{
          if(data.error){
            setData([])
          }else{
            setData(data)
          }
        }
        )
      }else{
        fetchDataTransaksiId(val)
        .then(data=>{
          if(data.status){
            throw ''
          }
          const temp = []
          temp.push(data)
          setData(temp)
        })
        .catch(_=>setErrorSearch(`id: ${val} not found`))
      }
    }
  }

  // -------------------------------------------------------------
  
  return <>
  <div className='container px-4 mx-auto'>
    <div className='mt-6 md:flex md:items-center md:justify-between '>
      {/* search */}
      <div className='flex flex-col'>
        <div className='relative flex items-center '>
          <span className='absolute'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path>
            </svg>
          </span>
          <input ref={searchValue} className='block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg pl-11 md:w-80 focus:border-blue-300 focus:ring focus:outline-none' type="text" placeholder='search by id' onKeyDown={handleSearch}/>
        </div>
        {errorSearch != '' ? <div className='mt-2 text-sm text-center'>{errorSearch}</div> : null}
      </div>

      {/* button */}
      <button onClick={()=>{
        setIsOpen(true)
        setDialogProps({title: 'create new transaksi', id: ''})
      }} className="flex my-3 sm:my-0 items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600">
          <i className='fa fa-plus' /><span>create new transaksi</span>
      </button>
    </div>

    {/* dialog edit/delete */}
    <MyDialog />

    {/* table */}
    <div className='flex flex-col my-4 overflow-scroll'>
      <div className="overflow-x border border-gray-200 dark:border-gray-700 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 mb-16">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr className='text-left'>
                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">NO.</th>
                {/* <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">ID</th> */}
                {/* <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Harga Sewa</th> */}
                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Merk Kendaraan</th>
                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Tipe Kendaraan</th>
                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Plat Nomor</th>
                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Tanggal Sewa</th>
                {/* {role === 'ADMIN' ?
                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Role</th> : null
                } */}
                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Tanggal Kembali</th>
                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Nama Penyewa</th>
                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">harga Sewa</th>
                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Tambah hari</th>
                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Total Harga Sewa</th>
                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Status Sewa</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y">
              { data.length ?
                data.map((e,idx)=>{
                    return !e.kendaraan ?
                      <tr key={idx}></tr>
                      :
                    <tr key={idx}>
                    <td className='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                      {idx+1}
                    </td>
                    <td className='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                      {e?.kendaraan?.merkKendaraan}
                    </td>
                    <td className='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                      {e?.kendaraan?.tipeKendaraan}
                    </td>
                    <td className='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                      {e?.versiKendaraan}
                    </td>
                    <td className='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                      {moment(e.tanggalSewa).format("DD-MMM-YYYY")}
                    </td>
                    <td className='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                      {moment(e.tanggalKembali).format("DD-MMM-YYYY")}
                    </td>
                    <td className='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                      {e.penyewa.namaPenyewa}
                    </td>
                    <td className='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                      {e.hargaSewa}
                    </td>
                    <td>
                      {e.pengembalian.tambahanHari}
                    </td>
                    <td className='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                        { e.pengembalian.tambahanHari ? e.pengembalian.totalBayar : e.totalHargaSewa}
                    </td>
                    <td className='px-4 py-4 text-sm font-medium whitespace-nowrap flex justify-between items-center gap-x-2'>
                      <div>
                        { e.pengembalian.statusSewa}
                      </div>
                      <div>
                        {role === 'ADMIN' ? <Tooltip id={e.idTransaksi} key={idx} /> : null}
                      </div>
                    </td>
{/* 
                    <td className='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                      {e.statusHapus ? 'bisa' : 'tidak'}
                    </td>

                    <td className='px-4 py-4 text-sm font-medium whitespace-nowrap flex justify-between items-center'>
                      {e.statusSedangSewa ? 'disewa' : 'tidak disewa'}
                      
                    </td>
                   */}
                    </tr>
                }) 
                : null
              }
            </tbody>
          </table>
      </div>
    </div>
  </div>
  </>
}



export default function KelolaTransaksi({token, role}) {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  useEffect(()=>{
    (async function(){
      setLoading(true)
        try{
          await fetchDataTransaksi(role.current).then(data=>{
            console.log(data)
            if(data.length)setData(data)
          })
        }catch(e){
          console.log(e)        
        }
      setLoading(false)
    })()
}, [])
  
  return (
    <div className="sm:flex sm:justify-between sm:items-center mb-8">
      {loading ? <>Loading ....</> : 
        <ListData token={token} role={role} data={data} setData={setData}/>
      }
    </div>
  )
}