import React, { useState } from 'react';
import { useFormik, Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import * as Yup from "yup"
import Loading from '../components/Loading';
import { registerUrl } from '../components/url';
import { Listbox } from '@headlessui/react';

const schema = Yup.object({
  username: Yup.string().min(5),
  password: Yup.string().min(8),
  namaKaryawan: Yup.string().required("nama karyawan is required"),
  nikKaryawan: Yup.number().required("nik karyawan is required"),
  telpKaryawan: Yup.number().required("telp karyawan is required"),
  alamatKaryawan: Yup.string().required("alamat karyawan is required"),
  roleKaryawan: Yup.string().required("role karyawan is required")
})


export const inputClass = "block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
export const buttonClass = "px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"

const registerUser = async (credentials) => {
  return fetch(registerUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  }).then(data => data.text()).catch(data => "")
}

export default function Register() {
  const [isLoading, setIsLoading] = useState(false)
  const [wrong, setWrong] = useState(false)
  const [role, setRole] = useState('ADMIN')

  const register = async (values) => {
    setIsLoading(true)
    setWrong(false)
    values.roleKaryawan = role
    const data  = await registerUser(values)
    
    if(data === "success create user"){
      window.location.replace('/login')
    }else if (data === "user already exist") {
      setWrong(true)
      setIsLoading(false)
    }else{
      setIsLoading(false)
    }
  }

  const SelectRole = () =>  (<Listbox value={role} onChange={setRole} name='roleKaryawan'>
      <Listbox.Button className={inputClass}>
        <div className='flex justify-between items-center'>
          <p className='text-left'>
            {role}
          </p>
          <i className="fa fa-angle-down" aria-hidden="true" />
        </div>
      </Listbox.Button>
      <Listbox.Options>
        {['ADMIN', 'USER'].map((i, idx) => (
          <Listbox.Option
            key={idx}
            value={i}
          >
            <p className='border p-2 hover:bg-gray-200'>
              {i}
            </p>
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>)
  
  if(isLoading){
    return <Loading visible={true} message='Register...'/>
  } 

  return (
    <>
    <div className='flex justify-center items-center my-4'> 
     <section className="max-w-4xl p-6 mx-auto w-[600px] bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 className="text-2xl font-semibold text-gray-700 capitalize dark:text-white text-center">Register</h2>
        <Formik
          initialValues={{
            username: '', password: '', namaKaryawan: '', nikKaryawan: '', telpKaryawan: '', alamatKaryawan: '', roleKaryawan: role
          }}
          validationSchema={schema}
          onSubmit={(values) => register(values)}
        >
          <Form>
            <div className='mb-4'>
              <label className="text-gray-700 dark:text-gray-200" htmlFor="username">Username</label>
              <Field name="username" type="text" className={inputClass} placeholder='username'/>
              <ErrorMessage name="username" component="div" />
            </div>

            <div className='mb-4'>
              <label className="text-gray-700 dark:text-gray-200" htmlFor="emailAddress">Password</label>
              <Field name="password" type="password" className={inputClass} placeholder='password' />
              <ErrorMessage name="password" component="div" />
            </div>

            <div className='mb-4'>
              <label className="text-gray-700 dark:text-gray-200" htmlFor="namaKaryawan">Nama Karyawan</label>
              <Field name="namaKaryawan" type="text" className={inputClass} placeholder='supriyadi'/>
              <ErrorMessage name="namaKaryawan" component="div" />
            </div>

            <div className='mb-4'>
              <label className="text-gray-700 dark:text-gray-200" htmlFor="nikKaryawan">Nik Karyawan</label>
              <Field name="nikKaryawan" type="text" className={inputClass} placeholder='64060211' />
              <ErrorMessage name="nikKaryawan" component="div" />
            </div>

            <div className='mb-4'>
              <label className="text-gray-700 dark:text-gray-200" htmlFor="telpKaryawan">Telp Karyawan</label>
              <Field name="telpKaryawan" type="text" className={inputClass} placeholder='62895295' />
              <ErrorMessage name="telpKaryawan" component="div" />
            </div>

            <div className='mb-4'>
              <label className="text-gray-700 dark:text-gray-200" htmlFor="alamatKaryawan">Alamat Karyawan</label>
              <Field name="alamatKaryawan" type="text" className={inputClass} placeholder='jl. ketintang '/>
              <ErrorMessage name="alamatKaryawan" component="div" />
            </div>

            
            <div className='mb-4'>
              <label className="text-gray-700 dark:text-gray-200" htmlFor="roleKaryawan">Role Karyawan</label>
              <SelectRole/>
            </div>

            {wrong? 
              <div className='mb-4 text-center'>
                User already exist
              </div> : null
            }

            <button type="submit" className={buttonClass} style={{width: '100%'}}>Submit</button>
            

            <div className='text-center mt-4'>
              Already have an account? <a href="/login" className='hover:underline'>Login</a>
            </div>
          </Form>
        </Formik>

    </section>
    </div>
    </>
    
  );
}