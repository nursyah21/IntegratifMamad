import React, { useState } from 'react';
import { useFormik, Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from "yup"
import Loading from '../components/Loading';
import { loginUrl } from '../components/url';

const schema = Yup.object({
  username: Yup.string().required(),
  password: Yup.string().required(),
})

export const inputClass = "block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
export const buttonClass = "px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"

async function loginUser(credentials) {

 return fetch(loginUrl, {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json()).catch(data => "")
}


export default function Login() {
  const [loading, setLoading] = useState(false)
  const [wrong, setWrong] = useState(false)

  const handleSubmit = async (username="", password="") => {
    setLoading(true)
    setWrong(false)
    const token = await loginUser({
      username, password
    });
    if(token != ""){
      localStorage.setItem('token', JSON.stringify(token))
      window.location.replace("/")
    }else{
      setWrong(true)
      setLoading(false)
    }
  }

  return (
    <>
    <Loading visible={loading} />
    <div className='flex justify-center items-center h-screen'> 
     <section className="max-w-4xl p-6 mx-auto w-[600px] bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 className="text-2xl font-semibold text-gray-700 capitalize dark:text-white text-center">Login</h2>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={schema}
          onSubmit={async (values) => {
            handleSubmit(values.username, values.password)
          }}
        >
          <Form>
            <div className='mb-4'>
              <label className="text-gray-700 dark:text-gray-200" htmlFor="username">Username</label>
              <Field name="username" type="text" className={inputClass}/>
              <ErrorMessage name="username" component="div" />
            </div>

            <div className='mb-4'>
              <label className="text-gray-700 dark:text-gray-200" htmlFor="password">Password</label>
              <Field name="password" type="password" className={inputClass} />
              <ErrorMessage name="password"  component="div" />
            </div>
            {wrong? 
              <div className='mb-4 text-center'>
                Wrong username or password
              </div> : null
            }
            <button type="submit" className={buttonClass} style={{width: '100%'}}>Submit</button>

            <div className='text-center mt-4'>
              Didn't have an account? <a href="/register" className='hover:underline'>Register</a>
            </div>
          </Form>
        </Formik>

    </section>
    </div>
    </>
  );
}