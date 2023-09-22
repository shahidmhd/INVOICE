import React from 'react';

import { toast } from 'react-toastify';
const PaymentModal = ({ showeditModal, setShoweditModal,currentdatas }) => {
    const totalAmount = currentdatas.reduce((total, item) => total + item.currentpaid, 0);
console.log(currentdatas,"hhhhh");

const formatTime = (date) => {
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return new Date(date).toLocaleTimeString('en-US', options);
  };

  return (
    <div className={`modal ${showeditModal ? 'show' : ''}`} tabIndex='-1' style={{ display: showeditModal ? 'block' : 'none' }}>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header' style={{ backgroundColor: 'black' }}>
            <h5 className='modal-title' style={{ color: 'white' }}>
              Payment status
            </h5>
            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close' style={{ color: 'white', borderColor: 'white' }} onClick={() => setShoweditModal(false)}><i className='fas fa-times'></i></button>
          </div>
          <div className='modal-body'>
          
            

          <table className="table">
      <thead>
        <tr>
          <th scope="col">NO</th>
          <th scope="col">Date</th>
          <th scope="col">Time</th>
          <th scope="col">Amount</th>
        </tr>
      </thead>
      <tbody>
      {currentdatas.map((item, index) => (
          <tr key={item._id}>
            <th scope="row">{index + 1}</th>
            <td>{item.currentdate}</td>
            <td>{formatTime(item.updateddate)}</td>
            <td>{item.currentpaid}</td>
        
          </tr>
        ))}

          <tr >
            <th scope="row"></th>
            <th ></th>
            <td style={{fontWeight:'bold'}}>Total</td>
            <td style={{fontWeight:'bold'}}>{totalAmount}</td>
        
          </tr>
      </tbody>
    </table>
              
              {/* <div className='w-100 text-center'>
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
                  Submit Payment
                </button>
              </div> */}

          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
