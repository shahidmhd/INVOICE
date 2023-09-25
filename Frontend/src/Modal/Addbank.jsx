import React from 'react';

const Addbank = ({ modalOpen, setmodal}) => {




  return (
    <div className={`modal ${modalOpen ? 'show' : ''}`} tabIndex='-1' style={{ display: modalOpen ? 'block' : 'none' }}>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header' style={{ backgroundColor: 'black' }}>
            <h5 className='modal-title' style={{ color: 'white' }}>
            Accout Details
            </h5>
            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close' style={{ color: 'white', borderColor: 'white' }} onClick={() => setmodal(false)}><i className='fas fa-times'></i></button>
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
     
          <tr >
            <th scope="row"></th>
            <th ></th>
            <td style={{fontWeight:'bold'}}>Total</td>
            <td style={{fontWeight:'bold'}}>4000</td>
        
          </tr>
      </tbody>
    </table>
              
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addbank;
