
// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { Link } from 'react-router-dom';
// import { changepassword } from '../../apicalls/User';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import bgImg from '../../assets/images/01-cargo-vs-freight.jpg'



// const Changepassword = () => {
//     const navigate =useNavigate()


//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//     } = useForm();

//     const onSubmit = async (data) => {
//         console.log(data); // You can handle the form submission here
//         try {
//             const response = await changepassword(data)
//             if (response.success) {
//                 toast.success(response.message)
//                 navigate('/login')
//             } else {
//                 toast.error(response.message)
//             }
//         } catch (err) {
//             console.log(err);
//             toast.error("unknown error")
//         }

//     };



//     return (
//         <section className="vh-100 gradient-custom" style={{ backgroundImage: `url(${bgImg})`, backgroundSize: 'cover' }}>
//             <div className="container py-5 h-100">
//                 <div className="row d-flex justify-content-center align-items-center h-100">
//                     <div className="col-12 col-md-8 col-lg-6 col-xl-5">
//                         <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
//                             <div className="card-body p-5 text-center">
//                                 <div className="mb-md-5 mt-md-4 pb-5">
//                                     <h2 className="fw-bold mb-2 pb-4 ">Change password</h2>
//                                     <form onSubmit={handleSubmit(onSubmit)}>
//                                         <div className="form-outline form-white mb-4">
//                                             <input
//                                                 placeholder="Enter your email"
//                                                 type="email"
//                                                 id="email"
//                                                 className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`}
//                                                 {...register('email', {
//                                                     required: 'Email is required',
//                                                     pattern: {
//                                                         value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
//                                                         message: 'Invalid email address',
//                                                     },
//                                                     // Add any additional validation rules for email
//                                                 })}
//                                             />
//                                             {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
//                                         </div>
//                                         <div className="form-outline form-white mb-4">
//                                             <input
//                                                 placeholder="Enter new password"
//                                                 type="password"
//                                                 id="newPassword"
//                                                 className={`form-control form-control-lg ${errors.newPassword ? 'is-invalid' : ''}`}
//                                                 {...register('newPassword', {
//                                                     required: 'New password is required',
//                                                     minLength: {
//                                                         value: 6,
//                                                         message: 'Password must have at least 6 characters',
//                                                     },
//                                                     // Add any additional validation rules for new password
//                                                 })}
//                                             />
//                                             {errors.newPassword && <div className="invalid-feedback">{errors.newPassword.message}</div>}
//                                             <div className="mt-3 text-end">
//                                                 <Link className="px-5 text-decoration-none text-primary" to="/">Back to Home</Link>
//                                             </div>
//                                         </div>
//                                         <button className="btn btn-outline-light btn-lg px-5" type="submit">Change</button>
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

// export default Changepassword;






import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { changepassword } from '../../apicalls/User';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput
} from 'mdb-react-ui-kit';


function Changepassword() {

    const { control, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()
    const onSubmit = async (data) => {

        try {
            const response = await changepassword(data)
            if (response.success) {
                toast.success(response.message)
                navigate('/login')
            } else {
                toast.error(response.message)
            }
        } catch (err) {
            console.log(err);
            toast.error("unknown error")
        }

    };

    return (
        <MDBContainer fluid>
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <MDBCard className='mx-2 mx-md-5 p-4 p-md-5' style={{ background: 'hsla(0, 0%, 100%, 0.8)', backdropFilter: 'blur(30px)', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                    <MDBCardBody className='p-3 p-md-5 text-center'>
                        <h2 className=" mb-4">change password</h2>
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
                                name="newPassword"
                                control={control}
                                rules={{
                                    required: 'newPassword is required',
                                    minLength: {
                                        value: 6,
                                        message: 'newPassword must have at least 6 characters',
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
                                            type='newPassword'
                                            placeholder='newPassword'
                                        />
                                        {errors.newPassword && <p className="text-danger">{errors.newPassword.message}</p>}
                                    </>
                                )}
                            />

                            <button className=' btn btn-primary w-100 mb-4' size='md' type="submit">submit</button>

                        </form>
                        <div className=" text-end">
                            <Link className="px-5 text-decoration-none text-primary" to="/">Back to Home</Link>
                        </div>
                    </MDBCardBody>
                </MDBCard>
            </div>
        </MDBContainer>
    );
}

export default Changepassword;
