import React from 'react';
import { useReactToPrint } from 'react-to-print';


const Printing = ({ invoiceData, bankData, termsData }) => {
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

  //  // Function to convert a number into words
  //  const numberToWords = (num) => {
  //   const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  //   const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  //   const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  //   if (num === 0) return 'Zero';

  //   if (num < 10) return units[num];

  //   if (num < 20) return teens[num - 10];

  //   const digit1 = num % 10;
  //   const digit10 = Math.floor((num / 10) % 10);
  //   const digit100 = Math.floor((num / 100) % 10);
  //   const digit1000 = Math.floor((num / 1000) % 10);
  //   const digit10000 = Math.floor((num / 10000) % 10);

  //   let result = '';


  //   if (digit10000 > 0) {
  //     result += `${teens[digit10000]} Thousand `;
  //   }


  // if (digit1000 > 0 && digit10 !== 1) {
  //   result += `${units[digit1000]} Thousand `;
  // }

  //   if (digit100 > 0) {
  //     result += `${units[digit100]} Hundred `;
  //   }


  //   if (digit10 > 0) {
  //     if (digit10 > 1) {
  //       result += `${tens[digit10]} `;
  //     } else {
  //       result += `${teens[num % 100 - 10]} Rupees`;
  //       return result.trim(); // Return early for numbers between 10 and 19
  //     }
  //   }

  //   if (digit1 > 0) {
  //     result += `${units[digit1]} Rupees`;
  //   }

  //   return result.trim();
  // };

  // const totalAmountInWords = numberToWords(invoiceData?.totalAmount);


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
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-default-d3" style={{ fontSize: "2em", fontWeight: "bold", textAlign: 'right' }}>GST INVOICE</span>

                    <div className="invoice-container" style={{ textAlign: 'left' }}>
                      <span style={{ fontSize: "1em", fontWeight: "bold", textAlign: 'right' }}>CYENOSURE - Enter the technoverse</span>
                      <p style={{ fontSize: '.9em' }} className="pt-0">10/543/A1 , HMT COLONY<br />
                        KALAMASSERY , ERNAKUKLAM
                        KERALA - 683503<br />
                        GSTIN/UIN : 32CNEPN1375G1Z6</p>
                    </div>




                  </div>
                </div>

                {/* <div className="row">
                  <div className="col-xl-8">
                    <ul className="list-unstyled">
                      <li style={{ color: 'black' }}>
                        <span style={{ fontSize: "1em", fontWeight: "bold", textAlign: 'right' }}>Bill To: </span><br /><span className="text-muted">  {invoiceData?.selectedCompanyId?.companyname ? invoiceData.selectedCompanyId.companyname : ''}</span>
                      </li>
                      <li style={{ color: 'black' }}>Address: <span className="text-muted ">{invoiceData?.selectedCompanyId?.address ? invoiceData.selectedCompanyId.address : ''}</span></li>
                      <li style={{ color: 'black' }}><span className="text-muted ">{invoiceData?.selectedCompanyId?.district ? invoiceData.selectedCompanyId.district : ''} - {invoiceData?.selectedCompanyId?.pincode ? invoiceData.selectedCompanyId.pincode : ''}</span></li>

                    </ul>
                  </div>
                  <div className="col-xl-4">
                    <ul className="list-unstyled">
                      <li className="text-muted">
                        <span className="fw-bold">Invoice No&nbsp;&nbsp;:&nbsp; </span>{invoiceData?.invoiceNumber}
                      </li>
                      <li className="text-muted">
                        <span className="fw-bold">&nbsp;&nbsp;&nbsp;Date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;</span>{formatDate(invoiceData?.selectedDate)}
                      </li>
                      <li className="text-muted">
                        <span className="fw-bold">Due Date&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;</span>{invoiceData?.Duedate}
                      </li>

                    </ul>
                  </div>
                </div> */}


<div className="row">
  <div className="col-xl-8 col-lg-8 col-md-7 col-sm-12">
    <ul className="list-unstyled">
      <li style={{ color: 'black' }}>
        <span style={{ fontSize: "1em", fontWeight: "bold", textAlign: 'right' }}>Bill To: </span>
        <span className="text-muted">{invoiceData?.selectedCompanyId?.companyname ? invoiceData.selectedCompanyId.companyname : ''}</span>
      </li>
      <li style={{ color: 'black' }}>Address: <span className="text-muted">{invoiceData?.selectedCompanyId?.address ? invoiceData.selectedCompanyId.address : ''}</span></li>
      <li className="text-muted">
        {invoiceData?.selectedCompanyId?.district ? invoiceData.selectedCompanyId.district : ''} - {invoiceData?.selectedCompanyId?.pincode ? invoiceData.selectedCompanyId.pincode : ''}
      </li>
    </ul>
  </div>
  <div className="col-xl-4 col-lg-4 col-md-5 col-sm-12">
    <ul className="list-unstyled">
      <li className="text-muted" style={{ textAlign: 'right' }}>
        <span className="fw-bold">Invoice No: </span>{invoiceData?.invoiceNumber}
      </li>
      <li className="text-muted" style={{ textAlign: 'right' }}>
        <span className="fw-bold">Date: </span>{formatDate(invoiceData?.selectedDate)}
      </li>
      <li className="text-muted" style={{ textAlign: 'right' }}>
        <span className="fw-bold">Due Date: </span>{invoiceData?.Duedate}
      </li>
    </ul>
  </div>
</div>

                {/* not responsive */}


                {/* <div className="row my-2 mx-1 justify-content-center">
                  <table className="table table-striped table-borderless">
                    <thead style={{ backgroundColor: '#84B0CA' }} className="text-white">
                      <tr>
                        <th scope="col" style={{ backgroundColor: "black", color: 'white' }}>No</th>
                        <th scope="col" style={{ backgroundColor: "black", color: 'white' }}>Service Name</th>
                        <th scope="col" style={{ backgroundColor: "black", color: 'white' }}>HSN Code</th>
                        <th scope="col" style={{ backgroundColor: "black", color: 'white' }}>Unit</th>
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
                </div> */}


                {/* not responsive */}

                {/* resposive */}

                <div className="row my-2 mx-1 justify-content-center">
                  <div className="table-responsive">
                    <table className="table table-striped table-borderless">
                      <thead style={{ backgroundColor: '#84B0CA' }} className="text-white">
                        <tr>
                          <th scope="col" style={{ backgroundColor: "black", color: 'white' }}>No</th>
                          <th scope="col" style={{ backgroundColor: "black", color: 'white' }}>Service Name</th>
                          <th scope="col" style={{ backgroundColor: "black", color: 'white' }}>HSN Code</th>
                          <th scope="col" style={{ backgroundColor: "black", color: 'white' }}>Unit</th>
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
                            <td>{row.total * row.Gst}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                {/* resposive */}
                {/*  */}
                <div className="row">
                  <div className="col-md-8">
                    <p className="ms-3"></p>
                  </div>
                  <div className="col-md-4 d-flex align-items-center">
                    <div className="ms-md-auto">
                      <ul className="list-unstyled mb-0">
                        <li className="text-muted">
                          <span className="text-black me-5">SubTotal</span>
                          <span className="float-end me-5">₹{invoiceData?.subtotal}</span>
                        </li>
                        <li className="text-muted mt-2">
                          <span className="text-black me-5">IGST</span>
                          <span className="float-end me-5">₹{invoiceData?.gst18}</span>
                        </li>
                        <li>
                        <span className="text-black me-5">Total</span>
                          <span style={{color:"black"}} className="float-end me-5">₹{invoiceData?.totalAmount}</span>
                        </li>
                      </ul>
                      {/* <p className="text-black mt-3 mt-md-0">
                        <span className="text-black me-3 fw-bold" style={{ fontWeight: 'bold' }}>Total</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ fontSize: '25px' }}>₹{invoiceData?.totalAmount}</span>
                      </p> */}
                    </div>
                  </div>
                </div>
                {/*  */}

                <hr />
                <div className="row">
                  {/* <div className="col-xl-10">
                    <p>Thank you for your purchase</p>
                  </div> */}
                  {/* <div className="col-xl-10"><br />
                    <p style={{ fontWeight: "bold" }}>Invoice Amount In Words</p>
                    <span>{totalAmountInWords}</span>
                  </div> */}
                  <div className="col-xl-7"><br />
                    <p style={{ fontWeight: "bold" }}>Terms and Conditions</p>
                    {termsData.length > 0 ? (
                      <span>{termsData[0]?.termsAndConditions}</span>
                    ) : (
                      <span>No terms and conditions available.</span>
                    )}
                  </div>

                  <div className="col-xl-12"><br />
                    <p style={{ fontWeight: "bold" }}>Bank details</p>
                    Bank Name: {bankData[0]?.BankName}<br />
                    BANK Account No: {bankData[0]?.Accountno}<br />
                    Bank IFSC code: {bankData[0]?.ifsccode}<br />
                    Account holder's name: {bankData[0]?.person}

                  </div>

                  <div className="col-xl-12">
                    <div className="d-flex justify-content-between">
                      <p></p>
                      <div>
                        <p className='me-5'>For : Cyenosure Enter the Technoverse</p><br />
                        <p>Authorized Signature</p>
                      </div>
                    </div>
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

export default Printing;

