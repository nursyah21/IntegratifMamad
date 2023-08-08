import { useEffect, useState,useRef } from 'react';
import { AUTH, USER } from '../../components/type';
import { baseURL, createKaryawanUrl, deleteUrl, karyawanAllUrl, karyawanIdUrl, updateUrl } from '../../components/url';
import { Popover, Dialog } from '@headlessui/react'
import { buttonClass, inputClass } from '../../css/style';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import { Listbox } from '@headlessui/react';
import { SelectRole } from '../Register';
import { fetchData, fetchDataKendaraanId, fetchDataPenyewaId, fetchDataUser } from '../../components/fetchApi';
import { RollerShadesClosedSharp } from '@mui/icons-material';
import { fetchDataKendaraan, fetchDataPenyewa } from '../Dashboard';
import Loading from '../../components/Loading';


const schema = Yup.object({
  namaPenyewa: Yup.string().required(),
  nikpenyewa: Yup.string().required(),
  noTlpnPenyewa: Yup.string().required(),
  alamatPenyewa: Yup.string().required(),
})
  
const CreateNew = ({setData, setIsOpen}) => {
  const [role, setRole] = useState('ADMIN')
  const [hidden, setHidden] = useState(true)
  const [wrong, setWrong] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const handle = async (values) => {
    try{
      setLoading(true)
      await fetch(baseURL+'/penyewa/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      }) .then(data => data.text()).catch(data => "")

      await fetchDataPenyewa(role.current).then(data=>{
        setData(data)
        setIsOpen(false)
      })
    }catch(e){
      console.log(e)
    }
    setLoading(false)
  }
  
  return <>
    {loading ? <>Submit data....</> :
      <Formik
        initialValues={{
          namaPenyewa: '',nikpenyewa: '',noTlpnPenyewa: '',alamatPenyewa: ''
        }}
        validationSchema={schema}
        onSubmit={(values) => handle(values)}
      >
        <Form>
          <div className='mb-4'>
            <label className="text-gray-700 dark:text-gray-200" htmlFor="namaPenyewa">Nama Penyewa</label>
            <Field name="namaPenyewa" type="text" className={inputClass} placeholder=''/>
            <ErrorMessage name="namaPenyewa" component="div" />
          </div>

          <div className='mb-4'>
            <label className="text-gray-700 dark:text-gray-200" htmlFor="tipeKendaraan">Nik Penyewa</label>
            <Field name="nikpenyewa" type="text" className={inputClass} placeholder=''/>
            <ErrorMessage name="nikpenyewa" component="div" />
          </div>

          <div className='mb-4'>
            <label className="text-gray-700 dark:text-gray-200" htmlFor="jenisKendaraan">No telp</label>
            <Field name="noTlpnPenyewa" type="text" className={inputClass} placeholder='' />
            <ErrorMessage name="noTlpnPenyewa" component="div" />
          </div>

          <div className='mb-4'>
            <label className="text-gray-700 dark:text-gray-200" htmlFor="alamatPenyewa">Alamat Penyewa</label>
            <Field name="alamatPenyewa" type="text" className={inputClass} placeholder='' />
            <ErrorMessage name="alamatPenyewa" component="div" />
          </div>
          
          <button type="submit" className={buttonClass} style={{width: '100%'}}>Submit</button>

        </Form>
      </Formik>
    }
  </>
}
  
function ListData({token = AUTH, role='', data=[], setData}){
  const [isOpen, setIsOpen] = useState(false)
  const [dialogProps, setDialogProps] = useState({title:'', id:''})
  const searchValue = useRef()
  const [errorSearch, setErrorSearch] = useState('')
  
  const [loading, setLoading] = useState(false)

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
        {/* {
          role === 'ADMIN '?
            <div className='hover:bg-gray-200 p-2'>
              <button onClick={()=>{
                setIsOpen(!isOpen)
                setDialogProps({title:'Ubah Status', id:id})
              }}>
                <i className="fa fa-pencil mx-2" aria-hidden="true" />Ubah Status
              </button>
            </div> : null
        } */}
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
      const link = baseURL + 
        (role == 'ADMIN '? '/penyewa/hapus-permanen/'+ props.id.id : '/penyewa/hapus/' + props.id.id + '/true')

      await fetch(baseURL, {
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
      const [selected, setSelected] = useState('')


      useEffect(()=>{
        (async function(){
          await fetchDataPenyewaId(props.id.id)
            .then(data=>{
              setStatus(data)
            })
        })()
      }, [])
      return <> {status ? <>
        <div>
          <Listbox value={selected} onChange={setSelected}>
            <Listbox.Button className={inputClass}>
              {selected ? 'sedang disewa' : 'tidak sedang disewa'}
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
                >{i ? 'sedang disewa' : 'tidak sedang disewa'}</Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        </div>

        <div className='flex mt-4 justify-center'>
          <button onClick={()=>{
              (async function(){
                const link = baseURL + '/penyewa/sedang-sewa/' + props.id.id +'/' +(selected?'true':'false')
                try{
                  await fetch(link ,{
                    method:'GET'
                  })
                  await fetchDataPenyewa(role.current).then(data=>{
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
      const [dataEdit, setDataEdit] = useState(null)

      useEffect(()=>{
        (async function(){
          fetchDataPenyewaId(props.id.id)
            .then(data=>{
              setDataEdit(data)
              console.log(data)
            })
        })()
      },[])
      
      return <> {dataEdit ? 
          <Formik
      initialValues={{
        namaPenyewa: dataEdit.namaPenyewa, nikpenyewa: dataEdit.nikpenyewa, noTlpnPenyewa: dataEdit.noTlpnPenyewa,alamatPenyewa: dataEdit.alamatPenyewa
      }}
      validationSchema={schema}
      onSubmit={(values) => {
        (async function(){
            try{
                await fetch(baseURL+ '/penyewa/create', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(values)
                }) .then(data => data.text())

                await fetchDataPenyewa(role.current).then(data=>{
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
          <label className="text-gray-700 dark:text-gray-200" htmlFor="namaPenyewa">Nama Penyewa</label>
          <Field name="namaPenyewa" type="text" className={inputClass} placeholder=''/>
          <ErrorMessage name="namaPenyewa" component="div" />
        </div>

        <div className='mb-4'>
          <label className="text-gray-700 dark:text-gray-200" htmlFor="nikpenyewa">NIK Penyewa</label>
          <Field name="nikpenyewa" type="text" className={inputClass} placeholder=''/>
          <ErrorMessage name="nikpenyewa" component="div" />
        </div>

        <div className='mb-4'>
          <label className="text-gray-700 dark:text-gray-200" htmlFor="noTelpnPenyewa">No Telepon</label>
          <Field name="noTlpnPenyewa" type="text" className={inputClass} placeholder='' />
          <ErrorMessage name="noTlpnPenyewa" component="div" />
        </div>

        <div className='mb-4'>
          <label className="text-gray-700 dark:text-gray-200" htmlFor="alamatPenyewa">Alamat Penyewa</label>
          <Field name="alamatPenyewa" type="text" className={inputClass} placeholder='' />
          <ErrorMessage name="alamatPenyewa" component="div" />
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
              {props.title === 'create new penyewa'
                ? <CreateNew setData={setData} setIsOpen={setIsOpen} /> 
                : props.title ===  'Delete'  || props.title ===  'Soft Delete'
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
    (async function(){
      setLoading(true)
      if (event.key === "Enter") {
        const val = searchValue.current.value
        setErrorSearch('')
        if(isNaN(val)){
          setErrorSearch("you must enter only number")
          return
        }
        if(val === '') {
          await fetchDataPenyewa(role).then(data=>{
            if(data.error){
              setData([])
            }else{
              setData(data)
            }
          }
          )
        }else{
          await fetchDataPenyewaId(val)
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
      setLoading(false)
    })()
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
        setDialogProps({title: 'create new penyewa', id: ''})
      }} className="flex my-3 sm:my-0 items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600">
          <i className='fa fa-plus' /><span>create new penyewa</span>
      </button>
    </div>

    {/* dialog edit/delete */}
    <MyDialog />

    {/* table */}
    <div className='flex flex-col my-4 overflow-scroll'>
      {loading ? <>Please wait...</> : <></>}
      <div className="overflow-x border border-gray-200 dark:border-gray-700 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 mb-16">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr className='text-left'>
                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">NO.</th>
                <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">ID Penyewa</th>
                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Nama Penyewa</th>
                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">NIK Penyewa</th>
                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Telp</th>
                {/* {role === 'ADMIN' ?
                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Role</th> : null
                } */}
                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Alamat</th>
                {
                  role === 'ADMIN' ?
                  <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Status Hapus</th>
                  : null
                }
                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Status Sedang Sewa</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y">
              { data ?
                data.map((e,idx)=>{
                    return <tr key={idx}>
                    <td className='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                      {idx+1}
                    </td>
                    <td className='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                      {e.idPenyewa}
                    </td>
                    <td className='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                      {e.namaPenyewa}
                    </td>
                    <td className='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                      {e.nikpenyewa}
                    </td>
                    <td className='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                      {e.noTlpnPenyewa}
                    </td>
                    <td className='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                      {e.alamatPenyewa}
                    </td>
                    {
                      role === 'ADMIN' ?
                      <td className='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                        {e.statusHapus ? 'bisa' : 'tidak'}
                      </td> : null
                    }

                    <td className='px-4 py-4 text-sm font-medium whitespace-nowrap flex justify-between items-center'>
                      {e.statusSedangSewa ? 'sedang menyewa' : 'tidak sedang menyewa'}
                      <Tooltip id={e.idPenyewa} key={idx} />
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



export default function KelolaPenyewa({role}) {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])

  useEffect(()=>{
    
    (async function(){
      setLoading(true)
      await fetchDataPenyewa(role.current).then(data=>{
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
