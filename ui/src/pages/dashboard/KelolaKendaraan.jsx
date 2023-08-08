import { useEffect, useState,useRef } from 'react';
import { AUTH, USER } from '../../components/type';
import { baseURL, createKaryawanUrl, deleteUrl, karyawanAllUrl, karyawanIdUrl, updateUrl } from '../../components/url';
import { Popover, Dialog } from '@headlessui/react'
import { buttonClass, inputClass } from '../../css/style';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import { Listbox } from '@headlessui/react';
import { SelectRole } from '../Register';
import { fetchData, fetchDataKendaraanId, fetchDataUser } from '../../components/fetchApi';
import { RollerShadesClosedSharp } from '@mui/icons-material';
import { fetchDataKendaraan } from '../Dashboard';
import Loading from '../../components/Loading';


const schema = Yup.object({
  merkKendaraan: Yup.string().required(),
  tipeKendaraan: Yup.string().required(),
  jenisKendaraan: Yup.string().required(),
  tahunKeluaran: Yup.string().required(),
  kapasitasKursi: Yup.number().required(),
  hargaSewa: Yup.number().required(),
})
  
const CreateNew = ({setData, setIsOpen}) => {
  const [role, setRole] = useState('ADMIN')
  const [hidden, setHidden] = useState(true)
  const [wrong, setWrong] = useState(false)
  
  const handle = async (values) => {
    try{
      console.log('please wait..')
      await fetch(baseURL+'/kendaraan/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      }) .then(data => data.text()).catch(data => "")
      
      await fetchDataKendaraan(role.current).then(data=>{
        setData(data)
        setIsOpen(false)
      })

    }catch(e){
      console.log(e)
    }
  }
  
  return <>
  {/* "merkKendaraan": "Toyota",
    "tipeKendaraan": "Avanza",
    "jenisKendaraan": "Mobil",
    "tahunKeluaran": "2017",
    "kapasitasKursi": 7,
    "hargaSewa": 150000 */}
    <Formik
      initialValues={{
        merkKendaraan: '',tipeKendaraan: '',jenisKendaraan: '',tahunKeluaran: '',kapasitasKursi: 0,hargaSewa: 0,
      }}
      validationSchema={schema}
      onSubmit={(values) => handle(values)}
    >
      <Form>
        <div className='mb-4'>
          <label className="text-gray-700 dark:text-gray-200" htmlFor="merKendaraan">Merk Kendaraan</label>
          <Field name="merkKendaraan" type="text" className={inputClass} placeholder='Merk'/>
          <ErrorMessage name="merkKendaraan" component="div" />
        </div>

        <div className='mb-4'>
          <label className="text-gray-700 dark:text-gray-200" htmlFor="tipeKendaraan">Tipe Kendaraan</label>
          <Field name="tipeKendaraan" type="text" className={inputClass} placeholder='Tipe'/>
          <ErrorMessage name="tipeKendaraan" component="div" />
        </div>

        <div className='mb-4'>
          <label className="text-gray-700 dark:text-gray-200" htmlFor="jenisKendaraan">Jenis Kendaraan</label>
          <Field name="jenisKendaraan" type="text" className={inputClass} placeholder='Jenis' />
          <ErrorMessage name="jenisKendaraan" component="div" />
        </div>

        <div className='mb-4'>
          <label className="text-gray-700 dark:text-gray-200" htmlFor="tahunKeluaran">Tahun Kendaraan</label>
          <Field name="tahunKeluaran" type="text" className={inputClass} placeholder='Tahun' />
          <ErrorMessage name="tahunKeluaran" component="div" />
        </div>

        <div className='mb-4'>
          <label className="text-gray-700 dark:text-gray-200" htmlFor="kapasitasKursi">Kapasitas Kursi</label>
          <Field name="kapasitasKursi" type="text" className={inputClass} placeholder='0'/>
          <ErrorMessage name="kapasitasKursi" component="div" />
        </div>

        <div className='mb-4'>
          <label className="text-gray-700 dark:text-gray-200" htmlFor="hargaSewa">Harga Sewa</label>
          <Field name="hargaSewa" type="text" className={inputClass} placeholder='0'/>
          <ErrorMessage name="hargaSewa" component="div" />
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
  const search2Value = useRef()
  const [errorSearch, setErrorSearch] = useState('')
  const [errorSearch2, setErrorSearch2] = useState('')

  const Tooltip = (id) => (<Popover className="relative">
    <Popover.Button className={'border px-2 rounded-md bg-gray-200 border-gray-200 font-bold hover:bg-gray-100'}>:</Popover.Button>

    <Popover.Panel className="absolute z-10 bg-white -ml-24 ">
      <div className="flex flex-col border border-gray-200 rounded-xl">
        <div className='hover:bg-gray-200 p-2'>
          <button onClick={()=>{
            setIsOpen(!isOpen)
            setDialogProps({title:'Edit', id:id})
          }}>
            <i className="fa fa-pencil mx-2" aria-hidden="true" />Edit
          </button>
        </div>

        {/* <div className='hover:bg-gray-200 p-2'>
          <button onClick={()=>{
            setIsOpen(!isOpen)
            setDialogProps({title:'Ubah Status', id:id})
          }}>
            <i className="fa fa-pencil mx-2" aria-hidden="true" />Ubah Status
          </button>
        </div> */}
        <div className='hover:bg-gray-200 p-2'>
          <button onClick={()=>{
            setIsOpen(!isOpen)
            setDialogProps({title:'Soft Delete', id:id})
          }}>
            <i className='fa fa-trash mx-2' aria-hidden='true' />
            {
              role === 'ADMIN' ? <>Delete</> : <>Soft Delete</>
            }
          </button>
          
        </div>
      </div>
    </Popover.Panel>
  </Popover>)

  // ------------------------------------------------------------------------------

  const MyDialog = ({props=dialogProps}) => {
    const [userData, setUserData] = useState()
    const [role, setRole] = useState('USER')
    

    const deleteUser = async () => {
      let url = '/kendaraan/hapus-permanen/'+ props.id.id
      if(role != 'ADMIN') {
        url = '/kendaraan/hapus/'+props.id.id+'/true'
      }
      
      await fetch(baseURL + url, {
        method: 'GET',
      })
      await fetchDataKendaraan(role.current).then(data=>{
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
      const [selected, setSelected] = useState('')


      useEffect(()=>{
        (async function(){
          fetchDataKendaraanId(props.id.id)
            .then(data=>{
              setStatus(data)
            })
        })()
      }, [])
      return <> {status ? <>
        <div>
          <Listbox value={selected} onChange={setSelected}>
            <Listbox.Button className={inputClass}>
              {selected ? 'tersedia' : 'tidak tersedia'}
            </Listbox.Button>
            <Listbox.Options className={'outline-none'}>
              {[true, false].map((i, idx)=> (
                <Listbox.Option
                key={idx}
                value={i}
                className={({ active }) =>
                  `relative cursor-default select-none p-2 outline-none ${
                    active ? 'bg-gray-200' : ''
                  }`}
                >{i ? 'tersedia' : 'tidak tersedia'}</Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        </div>

        <div className='flex mt-4 justify-center'>
          <button onClick={()=>{
              (async function(){
                const link = baseURL + '/kendaraan/status/' + props.id.id +'/' +(selected?'true':'false')
                try{
                  await fetch(link ,{
                    method:'GET'
                  })
                  await fetchDataKendaraan(role.current).then(data=>{
                    setData(data)
                    setIsOpen(false)
                  })
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
      const [data, setData] = useState(null)

      useEffect(()=>{
        (async function(){
          fetchDataKendaraanId(props.id.id)
            .then(data=>{
              setData(data)
              
            })
        })()
      }, [])
      
      return <> {data ? 
          <Formik
      initialValues={{
        merkKendaraan: data.merkKendaraan, tipeKendaraan: data.tipeKendaraan, jenisKendaraan: data.jenisKendaraan,tahunKeluaran: data.tahunKeluaran,kapasitasKursi: data.kapasitasKursi,hargaSewa: data.hargaSewa,idKendaraan:props.id.id
      }}
      validationSchema={schema}
      onSubmit={(values) => {
        (async function(){
            try{
                await fetch(baseURL+ '/kendaraan/edit', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(values)
                }) .then(data => data.text())

                await fetchDataKendaraan(role.current).then(data=>{
                  setData(data)
                  setIsOpen(false)
                })
              }catch(e){
              console.log(e)
            }}
        )()
              
      }}
    >
      <Form>
        <div className='mb-4'>
          <label className="text-gray-700 dark:text-gray-200" htmlFor="merKendaraan">Merk Kendaraan</label>
          <Field name="merkKendaraan" type="text" className={inputClass} placeholder='Merk'/>
          <ErrorMessage name="merkKendaraan" component="div" />
        </div>

        <div className='mb-4'>
          <label className="text-gray-700 dark:text-gray-200" htmlFor="tipeKendaraan">Tipe Kendaraan</label>
          <Field name="tipeKendaraan" type="text" className={inputClass} placeholder='Tipe'/>
          <ErrorMessage name="tipeKendaraan" component="div" />
        </div>

        <div className='mb-4'>
          <label className="text-gray-700 dark:text-gray-200" htmlFor="jenisKendaraan">Jenis Kendaraan</label>
          <Field name="jenisKendaraan" type="text" className={inputClass} placeholder='Jenis' />
          <ErrorMessage name="jenisKendaraan" component="div" />
        </div>

        <div className='mb-4'>
          <label className="text-gray-700 dark:text-gray-200" htmlFor="tahunKeluaran">Tahun Kendaraan</label>
          <Field name="tahunKeluaran" type="text" className={inputClass} placeholder='Tahun' />
          <ErrorMessage name="tahunKeluaran" component="div" />
        </div>

        <div className='mb-4'>
          <label className="text-gray-700 dark:text-gray-200" htmlFor="kapasitasKursi">Kapasitas Kursi</label>
          <Field name="kapasitasKursi" type="text" className={inputClass} placeholder='0'/>
          <ErrorMessage name="kapasitasKursi" component="div" />
        </div>

        <div className='mb-4'>
          <label className="text-gray-700 dark:text-gray-200" htmlFor="hargaSewa">Harga Sewa</label>
          <Field name="hargaSewa" type="text" className={inputClass} placeholder='0'/>
          <ErrorMessage name="hargaSewa" component="div" />
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
              {props.title === 'create new vehicle'
                ? <CreateNew setData={setData} setIsOpen={setIsOpen} /> 
                : props.title === 'Delete' || props.title === 'Soft Delete'
                ? <> Are you sure to delete 
                    <div className='gap-x-4 flex mt-2'>
                      <button className={`${buttonClass} !bg-red-600 hover:!bg-red-800`} onClick={() => deleteUser()}>Delete</button>
                      <button className={[buttonClass]} onClick={() => setIsOpen(false)}>Cancel</button>
                    </div>
                  </> 
                : props.title === 'Edit' ? <EditDialog /> 
                : <UbahStatus />
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
      setErrorSearch2('')
      if(isNaN(val)){
        setErrorSearch("you must enter only number")
        return
      }
      if(val === '') {
        fetchDataKendaraan(role).then(data=>{
          if(data.error){
            setData([])
          }else{
            setData(data)
          }
        }
        )
      }else{
        fetchDataKendaraanId(val)
        .then(data=>{
          
          const temp = []
          temp.push(data)
          setData(temp)
        })
        .catch(_=>setErrorSearch(`id: ${val} not found`))
      }
    }
  }

  const handleSearch2 = (event) => {
    if (event.key === "Enter") {
      const val1 = searchValue.current.value
      const val = search2Value.current.value
      setErrorSearch2('')
      if(val1 == '' || isNaN(val1)){
        setErrorSearch2("you must input value input search by id")
        return
      }
      if(isNaN(val)){
        setErrorSearch2("you must enter only number")
        return
      }
      if(val === '') {
        fetchDataKendaraan(role).then(data=>{
          if(data.error){
            setData([])
          }else{
            setData(data)
          }
        })
      }else{
        // console.log(baseURL + '/kendaraan/find-global/id:'+val1+'/v:'+val)
        fetch(baseURL + '/kendaraan/find-global/id:'+val1+'/v:'+val,{
            method: 'GET'
        }).then(data=>{
          if(data === null || data === '' || data.type === 'cors'){
            setErrorSearch2(`version: ${val} not found`)
            return
          }
          // console.log('as=>'+JSON.stringify(data))
          const temp = []
          // console.log(data)
          temp.push(data)
          setData(temp)
        })
        .catch(_=>setErrorSearch2(`version: ${val} not found`))
      }
    }
  }

  // -------------------------------------------------------------
  
  return <>
  <div className='container px-4 mx-auto'>
    <div className='mt-6 md:flex md:items-center md:justify-between '>
      <div className='flex gap-x-4'>
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

        {/* search2 */}
        { role === 'ADMIN' ?
          <div className='flex flex-col'>
            <div className='relative flex items-center '>
              <span className='absolute'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path>
                </svg>
              </span>
              <input ref={search2Value} className='block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg pl-11 md:w-80 focus:border-blue-300 focus:ring focus:outline-none' type="text" placeholder='search by version' onKeyDown={handleSearch2}/>
            </div>
            {errorSearch2 != '' ? <div className='mt-2 text-sm text-center'>{errorSearch2}</div> : null}
          </div> : null
        }
      </div>
      

      {/* button */}
      <button onClick={()=>{
        setIsOpen(true)
        setDialogProps({title: 'create new vehicle', id: ''})
      }} className="flex items-center my-3 sm:my-0 justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600">
          <i className='fa fa-plus' /><span>create new vehicle</span>
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
                <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">ID Kendaraan</th>
                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Merk</th>
                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Tipe Kendaraan</th>
                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Jenis Kendaraan</th>
                {/* {role === 'ADMIN' ?
                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Role</th> : null
                } */}
                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Tahun Keluaran</th>
                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Kursi</th>
                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Harga sewa</th>
                {
                  role === 'ADMIN'?
                  <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Status Hapus</th>
                  : null
                }
                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Status Ketersediaan</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y">
              { data.length ?
                data.map((e,idx)=>{
                    return <tr key={idx}>
                    <td className='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                      {idx+1}
                    </td>
                    <td className='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                      {e.idKendaraan}
                    </td>
                    <td className='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                      {e.merkKendaraan}
                    </td>
                    <td className='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                      {e.tipeKendaraan}
                    </td>
                    <td className='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                      {e.jenisKendaraan}
                    </td>
                    <td className='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                      {e.tahunKeluaran}
                    </td>
                    <td className='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                      {e.kapasitasKursi}
                    </td>
                    <td className='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                      {e.hargaSewa}
                    </td>
                    {
                      role === 'ADMIN' ?
                      <td className='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                        {e.statusHapus ? <>terhapus</> : <>belum dihapus</>}
                      </td> : null
                    }

                    <td className='px-4 py-4 text-sm font-medium whitespace-nowrap flex justify-between items-center'>
                      {e.statusKetersediaan ? <>tersedia</> : <>tidak tersedia</>}
                      <Tooltip id={e.idKendaraan} key={idx} />
                    </td>
                    </tr>
                }) : null
              }
            </tbody>
          </table>
      </div>
    </div>
  </div>
  </>
}



export default function KelolaKendaraan({role}) {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])

  useEffect(()=>{
    (async function(){
      setLoading(true)
      // console.log(role.current)
      await fetchDataKendaraan(role).then(data=>{
        if(data.length)setData(data)
      })
      setLoading(false)
    })()
  },[])

  return (
    <div className="sm:flex sm:justify-between sm:items-center mb-8">
      {loading ? <>Loading ....</> : 
        <ListData role={role} data={data} setData={setData}/>
      }
      
    </div>
  )
}
