import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import { editbank } from '../apicalls/Bank';

const Editbank = ({ showeditModal, setShoweditModal, selectedaccount, render, setrender }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
        Accountno: selectedaccount?.Accountno || '',
        BankName: selectedaccount?.BankName || '',
        ifsccode: selectedaccount?.ifsccode || '',
        person: selectedaccount?.person || '',
        _id: selectedaccount?._id || '',
    },
  });

  const onSubmit = async (data) => {
    const response = await editbank(data)
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
    setValue('_id', selectedaccount?._id || '');
    setValue('Accountno', selectedaccount?.Accountno || '',);
    setValue('BankName', selectedaccount?.BankName || '',);
    setValue('ifsccode', selectedaccount?.ifsccode || '',);
    setValue('person',selectedaccount?.person || '',);
   
  }, [selectedaccount]);

  return (
    <div className={`modal ${showeditModal ? 'show' : ''}`} tabIndex='-1' style={{ display: showeditModal ? 'block' : 'none' }}>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header' style={{ backgroundColor: 'black' }}>
            <h5 className='modal-title' style={{ color: 'white' }}>
              Accout Details
            </h5>
            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close' style={{ color: 'white', borderColor: 'white' }} onClick={() => setShoweditModal(false)}><i className='fas fa-times'></i></button>
          </div>
          <div className='modal-body'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='form-outline mb-4'>
                <Controller
                  name='BankName'
                  control={control}
                  rules={{ required: 'BankName is required' }}
                  render={({ field }) => (
                    <>
                      <input {...field} type='text' id='form6Example3' className={`form-control ${errors.BankName ? 'is-invalid' : ''}`} placeholder='Bank Name' />
                      {errors.BankName && <div className='invalid-feedback'>{errors.BankName.message}</div>}
                    </>
                  )}
                />
              </div>

              <div className='form-outline mb-4'>
                <Controller
                  name='ifsccode'
                  control={control}
                  rules={{ required: 'ifsccode is required' }}
                  render={({ field }) => (
                    <>
                      <input {...field} type='text' id='form6Example4' className={`form-control ${errors.ifsccode ? 'is-invalid' : ''}`} placeholder='IFSC Code' />
                      {errors.ifsccode && <div className='invalid-feedback'>{errors.ifsccode.message}</div>}
                    </>
                  )}
                />
              </div>

              <div className='form-outline mb-4'>
                <Controller
                  name='person'
                  control={control}
                  rules={{ required: 'Person name is required' }}
                  render={({ field }) => (
                    <>
                      <input {...field} type='text' id='form6Example5' className={`form-control ${errors.person ? 'is-invalid' : ''}`} placeholder='Account Holder' />
                      {errors.person && <div className='invalid-feedback'>{errors.person.message}</div>}
                    </>
                  )}
                />
              </div>
             
              <div className='form-outline mb-4'>
                <Controller
                  name='Accountno'
                  control={control}
                  rules={{
                    required: 'Account no is required',
                    pattern: {
                      value: /^[0-9]*$/,
                      message: 'Accountno must be number',
                    },
                  }}
                  render={({ field }) => (
                    <>
                      <input
                        {...field}
                        type='text'
                        id='form6Example6'
                        className={`form-control ${errors.Accountno ? 'is-invalid' : ''}`}
                        placeholder='Account no'
                      />
                      {errors.Accountno && <div className='invalid-feedback'>{errors.Accountno.message}</div>}
                    </>
                  )}
                />
              </div>

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
                  Add Account
                </button>
              </div>

            </form>


          </div>
        </div>
      </div>
    </div>
  );
};

export default Editbank;
