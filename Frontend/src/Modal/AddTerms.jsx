import React, { useState } from 'react';

const AddTerms = ({ modalOpenterms, setmodalOpenterms }) => {
  const [termsAndConditions, setTermsAndConditions] = useState('');

  return (
    <div
      className={`modal ${modalOpenterms ? 'show' : ''}`}
      tabIndex='-1'
      style={{
        display: modalOpenterms ? 'block' : 'none',
        position: 'fixed', // Ensure it's fixed to the viewport
        bottom: 0, // Position it at the bottom
        left: 0, // Align it to the left
        right: 0, // Stretch it to the right
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
              onClick={() => setmodalOpenterms(false)}
            >
              <i className='fas fa-times'></i>
            </button>
          </div>
          <div className='modal-body'>
            {/* Textarea for Terms and Conditions */}
            <div className="form-group">
              <label htmlFor="termsAndConditions">Terms and Conditions:</label>
              <textarea
                className="form-control"
                id="termsAndConditions"
                rows="4" // Adjust the number of rows as needed
                value={termsAndConditions}
                onChange={(e) => setTermsAndConditions(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTerms;

