import React, { useState } from 'react';
import { useFormik, Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from "yup"
import Loading from '../components/Loading';
import { loginUrl } from '../components/url';
import { inputClass, buttonClass } from '../css/style';

const schema = Yup.object({
  username: Yup.string().required(),
  password: Yup.string().required(),
})

async function loginUser(credentials) {
  try{
    return fetch(loginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json()).catch(data => "")
  }catch(e){
    console.log(e)
    return ""
  }
}


export default function Login() {
  const [loading, setLoading] = useState(false)
  const [wrong, setWrong] = useState(false)
  const [hidden, setHidden] = useState(true)

  const handleSubmit = async (username = "", password = "") => {
    setLoading(true)
    setWrong(false)
    const token = await loginUser({
      username, password
    });
    if (token != "") {
      localStorage.setItem('token', JSON.stringify(token))
      window.location.replace("/")
    } else {
      setWrong(true)
      setLoading(false)
    }
    console.log(localStorage.getItem('token'))
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
                <Field name="username" type="text" className={inputClass} />
                <ErrorMessage name="username" component="div" />
              </div>

              <div className='mb-4'>
                <label className="text-gray-700 dark:text-gray-200" htmlFor="password">Password</label>
                <div className="relative flex items-center mt-2 ">
                  <button type='button' className="absolute right-0 focus:outline-none rtl:left-0 rtl:right-auto" onClick={()=>setHidden(!hidden)}>
                    {hidden ? <i className='fa fa-eye-slash mx-4' />  : <i className='fa fa-eye mx-4' /> }
                  </button>
                  <Field name="password" type={`${hidden ? 'password' : 'text'}`} className={`${inputClass} !mt-0`} />
                </div>

                <ErrorMessage name="password" component="div" />
              </div>
              {wrong ?
                <div className='mb-4 text-center'>
                  Wrong username or password
                </div> : null
              }
              <button type="submit" className={buttonClass} style={{ width: '100%' }}>Submit</button>

              <div className='text-center mt-4'>
                {/* Didn't have an account? <a href="/register" className='hover:underline'>Register</a> */}
              </div>
            </Form>
          </Formik>

        </section>
      </div>
    </>
  );
}