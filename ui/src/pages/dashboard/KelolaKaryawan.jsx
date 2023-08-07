import { useEffect, useState,useRef } from 'react';
import { AUTH, USER } from '../../components/type';
import { createKaryawanUrl, deleteUrl, karyawanAllUrl, karyawanIdUrl, registerUrl, updateUrl } from '../../components/url';
import { Popover, Dialog } from '@headlessui/react'
import { buttonClass, inputClass } from '../../css/style';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import { SelectRole } from '../Register';
import { fetchData, fetchDataUser } from '../../components/fetchApi';
import { Typography } from '@mui/material';

const schema = Yup.object({
    namaKaryawan: Yup.string().required("nama karyawan is required"),
    nikKaryawan: Yup.number().required("nik karyawan is required"),
    telpKaryawan: Yup.number().required("telp karyawan is required"),
    alamatKaryawan: Yup.string().required("alamat karyawan is required"),
    roleKaryawan: Yup.string().required("role karyawan is required")
  })
  
  
  const NewUser = ({setData, setIsOpen}) => {
    const [role, setRole] = useState('ADMIN')
    const [hidden, setHidden] = useState(true)
    const [wrong, setWrong] = useState(false)
    const [loading, setLoading] = useState(false)
  
    const schemaRegister = Yup.object({
      username: Yup.string().min(5),
      password: Yup.string().min(8),
      namaKaryawan: Yup.string().required("nama karyawan is required"),
      nikKaryawan: Yup.number().required("nik karyawan is required"),
      telpKaryawan: Yup.number().required("telp karyawan is required"),
      alamatKaryawan: Yup.string().required("alamat karyawan is required"),
      roleKaryawan: Yup.string().required("role karyawan is required")
    })
  
    const handleNewKaryawan = async (values) => {
      let token = JSON.parse(localStorage.getItem('token'));
      try{
        setLoading(true)
        values.roleKaryawan = role
        await fetch(registerUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
          // JSON.stringify({token:token.accessToken, data: values})
        }) .then(data => data.text()).catch(data => "")
        fetchData(token.accessToken).then(data=>{
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
          username: '', password: '', namaKaryawan: '', nikKaryawan: '', telpKaryawan: '', alamatKaryawan: '', roleKaryawan: role
        }}
        validationSchema={schemaRegister}
        onSubmit={(values) => handleNewKaryawan(values)}
      >
        <Form>
          <div className='mb-4'>
            <label className="text-gray-700 dark:text-gray-200" htmlFor="username">Username</label>
            <Field name="username" type="text" className={inputClass} placeholder='username'/>
            <ErrorMessage name="username" component="div" />
          </div>
  
          <div className='mb-4'>
            <label className="text-gray-700 dark:text-gray-200" htmlFor="password">Password</label>
            <div className="relative flex items-center mt-2 ">
              <button type='button' className="absolute right-0 focus:outline-none rtl:left-0 rtl:right-auto" onClick={()=>setHidden(!hidden)}>
                {hidden ? <i className='fa fa-eye-slash mx-4' />  : <i className='fa fa-eye mx-4' /> }
                
              </button>
              <Field name="password" type={`${hidden ? 'password' : 'text'}`} className={`${inputClass} !mt-0`}  placeholder='password' />
            </div>
            <ErrorMessage name="password" component="div" />
          </div>
  
          <div className='mb-4'>
            <label className="text-gray-700 dark:text-gray-200" htmlFor="namaKaryawan">Nama Karyawan</label>
            <Field name="namaKaryawan" type="text" className={inputClass} placeholder='Nama'/>
            <ErrorMessage name="namaKaryawan" component="div" />
          </div>
  
          <div className='mb-4'>
            <label className="text-gray-700 dark:text-gray-200" htmlFor="nikKaryawan">Nik Karyawan</label>
            <Field name="nikKaryawan" type="text" className={inputClass} placeholder='NIK' />
            <ErrorMessage name="nikKaryawan" component="div" />
          </div>
  
          <div className='mb-4'>
            <label className="text-gray-700 dark:text-gray-200" htmlFor="telpKaryawan">Telp Karyawan</label>
            <Field name="telpKaryawan" type="text" className={inputClass} placeholder='Telpon' />
            <ErrorMessage name="telpKaryawan" component="div" />
          </div>
  
          <div className='mb-4'>
            <label className="text-gray-700 dark:text-gray-200" htmlFor="alamatKaryawan">Alamat Karyawan</label>
            <Field name="alamatKaryawan" type="text" className={inputClass} placeholder='Alamat'/>
            <ErrorMessage name="alamatKaryawan" component="div" />
          </div>
  
          
          <div className='mb-4'>
            <label className="text-gray-700 dark:text-gray-200" htmlFor="roleKaryawan">Role Karyawan</label>
            <SelectRole role={role} setRole={setRole} />
            {/* <SelectRole/> */}
          </div>
  
          {wrong? 
            <div className='mb-4 text-center'>
              User already exist
            </div> : null
          }
  
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
  
      <Popover.Panel className="absolute z-10 bg-white -ml-14 ">
        <div className="flex flex-col border border-gray-200 rounded-xl">
          <div className='hover:bg-gray-200 p-2'>
            <button onClick={()=>{
              setIsOpen(!isOpen)
              setDialogProps({title:'Edit', id:id})
            }}>
              <i className="fa fa-pencil mx-2" aria-hidden="true" />Edit
            </button>
          </div>
          <div className='hover:bg-gray-200 p-2'>
            <button onClick={()=>{
              setIsOpen(!isOpen)
              setDialogProps({title:'Delete', id:id})
            }}>
              <i className='fa fa-trash mx-2' aria-hidden='true' />
              Delete
            </button>
            
          </div>
        </div>
      </Popover.Panel>
    </Popover>)
  
    // ------------------------------------------------------------------------------
  
    const MyDialog = ({props=dialogProps}) => {
      const [userData, setUserData] = useState(null)
      const [role, setRole] = useState('USER')
      useEffect(()=>{
        if(props.id.id){
          fetchDataUser(token.accessToken,  props.id.id).then(e=>{
            setUserData(e)
            setRole(e.roleKaryawan)
          })
        }
      },[])
  
      
  
      const deleteUser = async () => {
        await fetch(deleteUrl + props.id.id, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({token:token.accessToken})
        }) .then(data => data.text()).catch(data => "")
  
        fetchData(token.accessToken).then(data=>{
          setData(data)
          
          if(token.username === userData.username){
            window.location.reload()
          }
          
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
  
      const EditDialog = () => userData?.namaKaryawan 
        ? <>
            <Formik
              initialValues={{ namaKaryawan: userData.namaKaryawan, nikKaryawan: userData.nikKaryawan, roleKaryawan: userData.roleKaryawan, telpKaryawan: userData.telpKaryawan, alamatKaryawan: userData.alamatKaryawan}}
              validationSchema={schema}
              onSubmit={async values => {
                values.roleKaryawan = role
                
                await updateUser(values)
                fetchData(token.accessToken).then(data=>{
                  setData(data)
                  
                  if(token.username === userData.username &&
                    data.find(e=>e.username === token.username).roleKaryawan != 'ADMIN'){
                    window.location.reload()
                  }
                  
                  setIsOpen(false)
                })
                
              }}
            >
              <Form>
                <div className='mb-4'>
                  <label className="text-gray-700 dark:text-gray-200" htmlFor="namaKaryawan">Nama Karyawan</label>
                  <Field name="namaKaryawan" type="text" className={inputClass} placeholder='Nama'/>
                  <ErrorMessage name="namaKaryawan" component="div" />
                </div>
  
                <div className='mb-4'>
                  <label className="text-gray-700 dark:text-gray-200" htmlFor="nikKaryawan">Nik Karyawan</label>
                  <Field name="nikKaryawan" type="text" className={inputClass} placeholder='NIK' />
                  <ErrorMessage name="nikKaryawan" component="div" />
                </div>
  
                <div className='mb-4'>
                  <label className="text-gray-700 dark:text-gray-200" htmlFor="telpKaryawan">Telp Karyawan</label>
                  <Field name="telpKaryawan" type="text" className={inputClass} placeholder='Telpon' />
                  <ErrorMessage name="telpKaryawan" component="div" />
                </div>
  
                <div className='mb-4'>
                  <label className="text-gray-700 dark:text-gray-200" htmlFor="alamatKaryawan">Alamat Karyawan</label>
                  <Field name="alamatKaryawan" type="text" className={inputClass} placeholder='Alamat'/>
                  <ErrorMessage name="alamatKaryawan" component="div" />
                </div>
  
                <SelectRole role={role} setRole={setRole} />
                <div className='gap-x-4 flex mt-4'>
                  <button className={`${buttonClass} !bg-green-600 hover:!bg-green-800`} type='submit'>Edit</button>
                  <button className={[buttonClass]} onClick={() => setIsOpen(false)}>Cancel</button>
                </div>
              </Form>
            </Formik>
          </> 
        : <>Loading...</>
  
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
                {props.title === 'create new karyawan'
                  ? <NewUser setData={setData} setIsOpen={setIsOpen} /> 
                  : userData != undefined && props.title === 'Delete' 
                  ? <>
                    Are you sure to delete <span className='bg-gray-200 p-1'>{userData.username}</span>
                    <div className='gap-x-4 flex mt-2'>
                        <button className={`${buttonClass} !bg-red-600 hover:!bg-red-800`} onClick={() => deleteUser()}>Delete</button>
                        <button className={[buttonClass]} onClick={() => setIsOpen(false)}>Cancel</button>
                      </div>
                    </> 
                  : <EditDialog />
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
        await  fetchData(token.accessToken).then(data=>setData(data))
        }else{
          await fetchDataUser(token.accessToken, val)
          .then(data=>{
            const temp = []
            temp.push(data)
            setData(temp)
          })
          .catch(_=>setErrorSearch(`id: ${val} not found`))
        }
        setLoading(false)
      }
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
        {
          role === 'ADMIN'   ?
            <button onClick={()=>{
              setIsOpen(true)
              setDialogProps({title: 'create new karyawan', id: ''})
            }} className="flex my-3 sm:my-0 items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600">
                <i className='fa fa-plus' /><span>create new user</span>
            </button> : null
        }
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
                  {/* <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">ID</th> */}
                  {
                    role === 'ADMIN' ?
                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Username</th>
                    : null
                  }
                  <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Nama Karyawan</th>
                  <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">NIK</th>
                  {role === 'ADMIN' ?
                  <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Role</th> : null
                  }
                  <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Telp</th>
                  <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Alamat</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y">
                {
                  data.map((e,idx)=>{
                     return <tr key={idx}>
                      <td className='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                        {idx+1}
                      </td>
                      {/* <td className='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                        {e.id}
                      </td> */}
                      {
                        role === 'ADMIN' ? 
                        <td className='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                          {e.username}
                        </td> : null
                      }
                      <td className='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                        {e.namaKaryawan}
                      </td>
                      <td className='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                        {e.nikKaryawan}
                      </td>
                      {role === 'ADMIN'?
                      <td className='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                        {e.roleKaryawan}
                      </td>
                       : null}
                       <td className='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                        {e.telpKaryawan}
                      </td>
                      <td className='px-4 py-4 text-sm font-medium whitespace-nowrap flex justify-between items-center'>
                        {e.alamatKaryawan}
                        {role === 'ADMIN' ? <Tooltip id={e.id} key={idx} /> : null}
                      </td>
                     </tr>
                  })
                }
              </tbody>
            </table>
        </div>
      </div>
    </div>
    </>
  }

export default function KelolaKaryawan({token}) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [role, setRole] = useState('USER')
  useState(()=>{
    (async function(){
      setLoading(true)
      // console.log(role)
      await fetchData(token.accessToken).then(data=>{
          if(data.length)setData(data)
          setRole(data.find(e=>e.username === token.username).roleKaryawan)
          if(
            // token.username === userData.username &&
            data.find(e=>e.username === token.username).roleKaryawan != 'ADMIN'){
            // window.location.reload()
          }
          
        }).catch(e=>console.log(e))
        //.catch(e=>localStorage.clear() && window.location.reload())
      setLoading(false)
    })()
  },[])
 
  return (
    <div className="sm:flex sm:justify-between sm:items-center mb-8">
       {loading ? <>Loading ....</> : 
        <ListData token={token} role={role} data={data} setData={setData}/>
        }
    </div>
  )
}
