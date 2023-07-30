import { useEffect, useState,useRef } from 'react';
import WelcomeBanner from "../components/WelcomeBanner";
import { AUTH, USER } from '../components/type';
import { karyawanAllUrl } from '../components/url';
import { Popover, Dialog } from '@headlessui/react'
import { buttonModal, buttonClass } from '../css/style';

const fetchData = async (auth) => {
  return fetch(karyawanAllUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({token: auth})
  }).then(data => data.json())

}

function ListData({token = AUTH, role='', data=[]}){
  const [isOpen, setIsOpen] = useState(false)
  const [dialogProps, setDialogProps] = useState({title:'', id:''})

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

  const MyDialog = ({props=dialogProps}) => {
    // const userData = 
    // useEffect(()=>{

    // },[])

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
                  >{props.title}
                  </Dialog.Title>
            

            <div>
              {props.id.id}
            </div>

            <div className='gap-x-4 flex mt-2'>
              <button className={`${buttonClass} !bg-red-600 hover:!bg-red-800`} onClick={() => setIsOpen(false)}>Submit</button>
              <button className={[buttonClass]} onClick={() => setIsOpen(false)}>Cancel</button>
            </div>
          </Dialog.Panel>
          </div>
      </Dialog>
    )
  }
 
  return <>
  <div className='container px-4 mx-auto'>
    <div className='mt-6 md:flex md:items-center md:justify-between '>
      {/* search */}
      <div className='relative flex items-center '>
        <span className='absolute'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path>
          </svg>
        </span>
        <input className='block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg pl-11 md:w-80 focus:border-blue-300 focus:ring focus:outline-none' type="text" placeholder='search by id'/>
      </div>
    </div>

    {/* dialog edit/delete */}
    <MyDialog />

    {/* table */}
    <div className='flex flex-col my-4 overflow-scroll'>
      <div className="overflow-x border border-gray-200 dark:border-gray-700 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">NO.</th>
                <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">ID</th>
                <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Username</th>
                <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">NIK</th>
                {role === 'ADMIN' ?
                <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Role</th> : null
                }
                <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Telp</th>
                <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Alamat</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y">
              {
                data.map((e,idx)=>{
                   return <tr key={idx}>
                    <td className='px-4 py-4 text-sm font-medium whitespace-nowrap '>
                      {idx+1}
                    </td>
                    <td className='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                      {e.id}
                    </td>
                    <td className='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                      {e.username}
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

function Dashboard({token=AUTH }) {
  const [username, setUsername] = useState('')
  const [data, setData] = useState([])
  const role = useRef('')

  const signOut = () => {
    localStorage.clear()
    window.location.reload()
  }
  
  useEffect(()=>{
    setUsername(token.username)
    fetchData(token.accessToken).then(data=>{
      setData(data)
      role.current = data.find((e=USER)=>e.username === token.username).roleKaryawan  ?? ''
    })

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

            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              <ListData token={token} role={role.current} data={data}/>
            </div>


          </div>
        </main>

      </div>
    </div>
  );
}

export default Dashboard;