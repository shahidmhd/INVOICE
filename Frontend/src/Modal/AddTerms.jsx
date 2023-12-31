import React from 'react';
import { useForm } from 'react-hook-form';
import { Addterms } from '../apicalls/Terms';
import { toast } from 'react-toastify';

const AddTerms = ({ ShowtermsModal, setShowtermsModal ,render,setrender}) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = async (data) => {
    const response = await Addterms(data)
    if (response.success) {
        toast.success(response.message)
        setShowtermsModal(false);
        setrender(!render)

    } else {
      setShowtermsModal(false);
        setrender(!render)
        toast.error(response.message)
    }


  };

  return (
    <div
      className={`modal ${ShowtermsModal ? 'show' : ''}`}
      tabIndex='-1'
      style={{
        display: ShowtermsModal ? 'block' : 'none',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header' style={{ backgroundColor: 'black' }}>
            <h5 className='modal-title' style={{ color: 'white' }}>
              Terms and condition
            </h5>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
              style={{ color: 'white', borderColor: 'white' }}
              onClick={() => setShowtermsModal(false)}
            >
              <i className='fas fa-times'></i>
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='modal-body'>
              <div className="form-group">
                <label htmlFor="termsAndConditions">Terms and Conditions:</label>
                <textarea
                  className={`form-control ${errors.termsAndConditions ? 'is-invalid' : ''}`}
                  id="termsAndConditions"
                  rows="4"
                  {...register('termsAndConditions', { required: true })}
                ></textarea>
                {errors.termsAndConditions && (
                  <div className="invalid-feedback">Terms and Conditions is required.</div>
                )}
              </div>
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
                  backgroundColor: 'black',
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'lightblue';
                  e.target.style.color = 'black';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'black';
                  e.target.style.color = 'white';
                }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTerms;

