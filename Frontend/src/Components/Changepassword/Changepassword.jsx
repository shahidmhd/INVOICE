



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
