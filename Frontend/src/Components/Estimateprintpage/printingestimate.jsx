import React from 'react';
import { useReactToPrint } from 'react-to-print';


const Printingestimate = ({ invoiceData }) => {

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Note: Month is zero-based
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }

  const componentRef = React.useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });



  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-xl-8">
          <div className="card mx-auto">
            <div className="card-body"></div>

            <div className="d-flex justify-content-end  " style={{ marginRight: '1em' }}>
              <a onClick={handlePrint} className="btn btn-light text-capitalize border-0" data-mdb-ripple-color="dark">
                <i className="fas fa-print text-primary"></i> Print
              </a>
            </div>


            <div className="container mb-5 mt-3" ref={componentRef}>
              <div className="row d-flex align-items-baseline">

              </div>

              <div className="container" >
                <div className="col-md-12">
                  <div className="text-center">
                    <div
                      style={{
                        marginTop: '1em',
                        float: 'left',   // Float the logo container to the right

                      }}
                    >
                      <img
                        src="/Cyenosure1.png"
                        alt="Logo"
                        style={{
                          width: '17em', // Set the width of the logo as needed
                          height: 'auto', // Maintain aspect ratio
                        }}
                      />
                    </div><br /><br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-default-d3" style={{ fontSize: "2em", fontWeight: "bold", textAlign: 'right' }}>Estimate</span>
                   
                    <div className="invoice-container" style={{ textAlign: 'left' }}>
                    <span style={{ fontSize: "1em", fontWeight: "bold", textAlign: 'right' }}>CYENOSURE - Enter the technoverse</span>
                      <p style={{fontSize:'.9em'}} className="pt-0">10/543/A1 , HMT COLONY<br />
                        KALAMASSERY , ERNAKUKLAM
                        KERALA - 683503<br />
                        GSTIN/UIN : 32CNEPN1375G1Z6</p>
                    </div>

                  </div>
                </div>

                <div className="row">
                  <div className="col-xl-8">
                    <ul className="list-unstyled">
                      <li style={{ color: 'black' }}>
                       <span style={{fontSize: "1em", fontWeight: "bold", textAlign: 'right' }}>Bill To: </span><br/><span className="text-muted">  {invoiceData?.selectedCompanyId?.companyname ? invoiceData.selectedCompanyId.companyname : ''}</span>
                      </li>
                      <li style={{ color: 'black' }}>Address: <span className="text-muted ">{invoiceData?.selectedCompanyId?.address ? invoiceData.selectedCompanyId.address : ''}</span></li>
                      <li style={{ color: 'black' }}>District,State: <span className="text-muted ">{invoiceData?.selectedCompanyId?.district ? invoiceData.selectedCompanyId.district : ''} - {invoiceData?.selectedCompanyId?.pincode ? invoiceData.selectedCompanyId.pincode : ''}</span></li>

                    </ul>
                  </div>
                  <div className="col-xl-4">
                    <ul className="list-unstyled">
                      <li className="text-muted">
                        <span className="fw-bold">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;</span>{formatDate(invoiceData?.selectedDate)}
                      </li>
                      <li className="text-muted">
                        <span className="fw-bold">&nbsp;&nbsp;&nbsp;Invoice No&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp; </span>{invoiceData?.invoiceNumber}
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="row my-2 mx-1 justify-content-center">
                  <table className="table table-striped table-borderless">
                    <thead style={{ backgroundColor: '#84B0CA' }} className="text-white">
                      <tr>
                        <th scope="col" style={{ backgroundColor: "black", color: 'white' }}>No</th>
                        <th scope="col" style={{ backgroundColor: "black", color: 'white' }}>Service Name</th>
                        <th scope="col" style={{ backgroundColor: "black", color: 'white' }}>HSN Code</th>
                        <th scope="col" style={{ backgroundColor: "black", color: 'white' }}>Weight</th>
                        <th scope="col" style={{ backgroundColor: "black", color: 'white' }}>Amount</th>
                        <th scope="col" style={{ backgroundColor: "black", color: 'white' }}>Total</th>
                        <th scope="col" style={{ backgroundColor: "black", color: 'white' }}>Gst</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoiceData?.tableRows && invoiceData?.tableRows.map((row, index) => (
                        <tr key={row._id}>
                          <td>{index + 1}</td>
                          <td>{row.serviceName}</td>
                          <td>{row.HSNCode}</td>
                          <td>{row.weight}</td>
                          <td>{row.amount}</td>
                          <td>{row.total}</td>
                          <td>{row.total*row.Gst}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="row">
                  <div className="col-md-8">
                    <p className="ms-3"> payment information</p>
                  </div>
                  <div className="col-md-4 d-flex align-items-center">
                    <div className="ms-md-auto">
                      <ul className="list-unstyled mb-0">
                        <li className="text-muted">
                          <span className="text-black me-4">SubTotal</span>₹{invoiceData?.subtotal}
                        </li>
                        <li className="text-muted mt-2">
                          <span className="text-black me-4">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;IGST</span>₹{invoiceData?.gst18}
                        </li>
                      </ul>
                      <p className="text-black mt-3 mt-md-0">
                        <span className="text-black me-3 fw-bold" style={{ fontSize: '1.5em' }}>Total </span>
                        <span style={{ fontSize: '25px' }}>₹{invoiceData?.totalAmount}</span>
                      </p>
                    </div>
                  </div>
                </div>

                <hr />
                <div className="row">
                  <div className="col-xl-10">
                    <p>Thank you for your purchase</p>
                  </div>

                  <div className="col-xl-2">


                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  );
};

export default Printingestimate;

