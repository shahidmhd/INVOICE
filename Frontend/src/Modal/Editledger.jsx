import React, { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { editledger } from '../apicalls/Ledger';
import { toast } from 'react-toastify';
const Editledger = ({ showeditModal, setShoweditModal, selectedledger, render, setrender }) => {
    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
    } = useForm({
        defaultValues: {
            type:selectedledger?.type||'',
            Name: selectedledger?.Name || '',
            balance: selectedledger?.balance || '',
            _id: selectedledger?._id || '',

        },
    });

    const onSubmit = async (data) => {
        const response = await editledger(data)
        if (response.success) {
            toast.success(response.message)
            setShoweditModal(false)
            setrender(!render)
        } else {
            toast.error(response.message)
            setShoweditModal(false)
            setrender(!render)
        }

    };


    // Set form field values when the Company prop changes
    useEffect(() => {
        setValue('type', selectedledger?.type|| '');
        setValue('_id', selectedledger?._id || '');
        setValue('Name', selectedledger?.Name || '');
        setValue('balance', selectedledger?.balance || '');

    }, [selectedledger]);

    return (
        <div className={`modal ${showeditModal ? 'show' : ''}`} tabIndex='-1' style={{ display: showeditModal ? 'block' : 'none' }}>
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <div className='modal-header' style={{ backgroundColor: 'black' }}>
                        <h5 className='modal-title' style={{ color: 'white' }}>
                            Create Ledger
                        </h5>
                        <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close' style={{ color: 'white', borderColor: 'white' }} onClick={() => setShoweditModal(false)}><i className='fas fa-times'></i></button>
                    </div>
                    <div className='modal-body'>
                        {/*                               */}
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='form-outline mb-4'>
                                <Controller
                                    name='Name'
                                    control={control}
                                    rules={{ required: 'Name is required' }}
                                    render={({ field }) => (
                                        <>
                                            <input {...field} type='text' id='form6Example3' className={`form-control ${errors.Name ? 'is-invalid' : ''}`} placeholder='Enter Name' />
                                            {errors.Name && <div className='invalid-feedback'>{errors.Name.message}</div>}
                                        </>
                                    )}
                                />

                            </div>


                            <div className='form-outline mb-4'>
                                <Controller
                                    name='balance'
                                    control={control}
                                    rules={{
                                        required: 'balance  is required',
                                        pattern: {
                                            value: /^[0-9]*$/,
                                            message: 'balance must be number',
                                        },
                                    }}
                                    render={({ field }) => (
                                        <>
                                            <input
                                                {...field}
                                                type='text'
                                                id='form6Example6'
                                                className={`form-control ${errors.balance ? 'is-invalid' : ''}`}
                                                placeholder='Opening balance'
                                            />
                                            {errors.balance && <div className='invalid-feedback'>{errors.balance.message}</div>}
                                        </>
                                    )}
                                />
                            </div>


                            {/* dropdown */}
                            <div className='form-outline mb-4'>
                                <Controller
                                    name='type'
                                    control={control}
                                    rules={{
                                        required: 'type is required',
                                    }}
                                    render={({ field }) => (
                                        <select
                                            {...field}
                                            id='type'
                                            className={`form-select ${errors.type ? 'is-invalid' : ''}`}

                                        >
                                            <option value=''>Select Balance Type</option>
                                            <option value='Cr'>Cr</option>
                                            <option value='Dr'>Dr</option>
                                        </select>
                                    )}
                                />
                                {errors.type && (
                                    <div className='invalid-feedback'>{errors.type.message}</div>
                                )}
                            </div>

                            {/*  */}


                            <div className='w-100 text-center'>
                                <button
                                    type='submit'
                                    className='btn btn-primary btn-block mb-4'
                                    style={{
                                        display: 'inline-block',
                                        padding: '10px 20px',
                                        fontSize: '16px',
                                        border: 'none',
                                        cursor: 'pointer',
                                        textAlign: 'center',
                                        textDecoration: 'none',
                                        borderRadius: '5px',
                                        transition: 'background-color 0.3s ease',
                                        backgroundColor: 'black'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.backgroundColor = 'lightblue';
                                        e.target.style.color = 'black'; // Change text color on hover
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.backgroundColor = 'black';
                                        e.target.style.color = 'white'; // Revert text color back to white
                                    }}
                                >
                                    submit
                                </button>
                            </div>

                        </form>
                        {/*                            */}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Editledger
