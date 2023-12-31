// import React, { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { LoginUser } from '../apicalls/User';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { useDispatch } from 'react-redux';
// import { setLogin } from '../Redux/Authslice';

// import bgImg from '../assets/images/01-cargo-vs-freight.jpg'


// const Login = () => {
//     const navigate = useNavigate()
//     const dispatch = useDispatch()

//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//     } = useForm();

//     const onSubmit = async (data) => {
//         try {
//             const response = await LoginUser(data)
//             if (response.success) {
//                 toast.success(response.message)
//                 dispatch(setLogin({ userToken: response.data }))
//                 navigate('/')

//             } else {
//                 toast.error(response.message)
//             }
//         } catch (err) {
//            toast.error(err)
//         }
//     };

//     // Custom validation function to check for empty or whitespace input
//     const validateNotEmpty = (value) => {
//         if (!value.trim()) {
//             return 'This field is required';
//         }
//         return true;
//     };

//     return (
//         <section className="vh-100 gradient-custom" style={{
//             backgroundImage: `url(${bgImg})`,
//             backgroundSize: 'cover',
//           }}
//           >
//             <div className="container py-5 h-100">
//                 <div className="row d-flex justify-content-center align-items-center h-100">
//                     <div className="col-12 col-md-8 col-lg-6 col-xl-5">
//                         <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
//                             <div className="card-body p-5 text-center">
//                                 <div className="mb-md-5 mt-md-4 pb-5">
//                                     <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
//                                     <form onSubmit={handleSubmit(onSubmit)}>
//                                         <div className="form-outline form-white mb-4">
//                                             <input
//                                                 placeholder='enter your email'
//                                                 type="email"
//                                                 id="typeEmailX"
//                                                 className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`}
//                                                 {...register('email', {
//                                                     required: 'Email is required',
//                                                     pattern: {
//                                                         value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
//                                                         message: 'Invalid email address',
//                                                     },
//                                                     validate: validateNotEmpty, // Custom validation
//                                                 })}
//                                             />
//                                             {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
//                                         </div>
//                                         <div className="form-outline form-white mb-4">
//                                             <input
//                                                 placeholder='enter your password'
//                                                 type="password"
//                                                 id="typePasswordX"
//                                                 className={`form-control form-control-lg ${errors.password ? 'is-invalid' : ''}`}
//                                                 {...register('password', {
//                                                     required: 'Password is required',
//                                                     minLength: {
//                                                         value: 6,
//                                                         message: 'Password must have at least 6 characters',
//                                                     },
//                                                     validate: validateNotEmpty, // Custom validation
//                                                 })}
//                                             />
//                                             {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
//                                             {/* <div className="mt-3 text-end">
//                                                 <Link className="px-5 text-decoration-none text-primary" to="/change-password">Change Password</Link>
//                                             </div> */}
//                                         </div>
//                                         <button className="btn btn-outline-light btn-lg px-5" type="submit">Login</button>
//                                     </form>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default Login;

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { LoginUser } from '../apicalls/User';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setLogin } from '../Redux/Authslice';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput
} from 'mdb-react-ui-kit';


function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    // Data contains email and password
    console.log(data);
    try {
      const response = await LoginUser(data)
      if (response.success) {
        toast.success(response.message)
        dispatch(setLogin({ userToken: response.data }))
        navigate('/')

      } else {
        toast.error(response.message)
      }
    } catch (err) {
      toast.error(err)
    }
  };

  return (
    <MDBContainer fluid>
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <MDBCard className='mx-2 mx-md-5 p-4 p-md-5' style={{ background: 'hsla(0, 0%, 100%, 0.8)', backdropFilter: 'blur(30px)', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
          <MDBCardBody className='p-3 p-md-5 text-center'>
            <h2 className="fw-bold mb-4">Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: 'Invalid email address',
                  },

                }}
                render={({ field }) => (
                  <>
                    <MDBInput
                      {...field}
                      wrapperClass='mb-4'
                      id='form1'
                      type='email'
                      placeholder='example@gmail.com'
                    />
                    {errors.email && <p className="text-danger">{errors.email.message}</p>}
                  </>
                )}
              />

              <Controller
                name="password"
                control={control}
                rules={{
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must have at least 6 characters',
                  },
                  pattern: {
                    value: /^[^\s]+$/,
                    message: 'Spaces are not allowed in the password',
                  },
                }}
                render={({ field }) => (
                  <>
                    <MDBInput
                      {...field}
                      wrapperClass='mb-4'
                      id='form1'
                      type='password'
                      placeholder='password'
                    />
                    {errors.password && <p className="text-danger">{errors.password.message}</p>}
                  </>
                )}
              />

              <button className=' btn btn-primary w-100 mb-4' size='md' type="submit">Login</button>
            </form>
          </MDBCardBody>
        </MDBCard>
      </div>
    </MDBContainer>
  );
}

export default Login;


