import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { parseISO } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import {
    MDBCard,
    MDBCardBody,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBTypography,
    MDBTable,
    MDBTableHead,
    MDBTableBody,
} from 'mdb-react-ui-kit';
import { EditINVOICEdata } from '../../apicalls/Invoice';
import { toast } from 'react-toastify';

const Details = ({ companydetails, servicedetails, invoiceData }) => {

    const [selectedDate, setSelectedDate] = useState(
        invoiceData?.selectedDate ? parseISO(invoiceData.selectedDate) : new Date()
    );
    const [selectedDueDate, setSelectedDueDate] = useState(
        invoiceData?.selectedDate ? parseISO(invoiceData.selecteDuedDate) : new Date()
    );



    const [selctedCompantId, setselectedCompanyId] = useState(invoiceData?.selectedCompanyId?._id || '');
    const [SelectedService, setSelectedService] = useState(null)
    const [paidamount, setpaidamount] = useState(invoiceData?.paidamount)
    const [dueamount, setdueamount] = useState(invoiceData?.totalAmount-paidamount)
    const [updatepaidamount, setupdatepaidamount] = useState(0)
    const [SelectedServiceId, setSelectedServiceId] = useState(null)
    const [HSNCode, setHSNCode] = useState(null)
    const [invoiceDatas, setinvoiceDatas] = useState(invoiceData)
    const [tableRows, settableRows] = useState(invoiceData?.tableRows)
    const [paiddate,setpaiddate]=useState(new Date())
    const navigate = useNavigate()

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Note: Month is zero-based
        const year = date.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        return formattedDate;
    }

    const handleCompanyChange = (e) => {
        const selectedCompanyId = e.target.value;
        setselectedCompanyId(selectedCompanyId);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const handlepaidamount = (e) => {
        let a=Number(e.target.value)
        setupdatepaidamount(a)
      }
      

    const handleDueDateChange = (date) => {
        setSelectedDueDate(date);
    };

    const handlepaidDateChange = (date) => {
        setpaiddate(date);
    };



    const handleServiceChange = (index, serviceId) => {
        const selectedServiceId = serviceId;
        const selectedServiceData = servicedetails.find((service) => service._id === selectedServiceId);
        if (selectedServiceData) {
            const updatedTableRows = [...tableRows]; // Clone the tableRows array
            updatedTableRows[index] = {
                ...updatedTableRows[index],
                serviceName: selectedServiceData.servicename,
                HSNCode: selectedServiceData.HSNCode,
                amount: selectedServiceData.Rate,
                total: selectedServiceData.Rate * tableRows[index].weight,
                Gst: selectedServiceData?.GST / 100
            };

            settableRows(updatedTableRows); // Update the tableRows state
            setSelectedService(selectedServiceData);
            setSelectedServiceId(selectedServiceData._id);
        } else {
            // Handle the case when the selected service is not found
            console.log("service is not in there");
        }
    };

    const handleamountChange = (index, newamount) => {
        const updatedTableRows = [...tableRows];
        updatedTableRows[index].amount = Number(newamount);
        settableRows(updatedTableRows);

        // Calculate row total based on new weight and amount
        const rowTotal = newamount * updatedTableRows[index].weight;
        updatedTableRows[index].total = rowTotal;
    }


    const handleWeightChange = (index, newWeight) => {
        const updatedTableRows = [...tableRows];
        updatedTableRows[index].weight = Number(newWeight);
        settableRows(updatedTableRows);

        // Calculate row total based on new weight and amount
        const rowTotal = newWeight * updatedTableRows[index].amount;
        updatedTableRows[index].total = rowTotal;
    };

    useEffect(() => {
        const subtotal = tableRows.reduce((total, row) => {
            const rowSubtotal = row.total || 0;
            return total + rowSubtotal;
        }, 0);


        const totalGst = tableRows.reduce((Gst, row) => {
            const rowGst = row.Gst || 0;
            return Gst + (rowGst * row.total); // Calculate the GST for each row and add it to the total GST
        }, 0);
        const gst18 = totalGst;
        // const CGST = gst18 / 2
        // const SGST = gst18 / 2
        const totalAmount = subtotal + gst18

        const updatedInvoiceData = {
            ...invoiceData,
            subtotal: parseFloat(subtotal.toFixed(2)),
            gst18: parseFloat(gst18.toFixed(2)),
            // CGST: parseFloat(CGST.toFixed(2)),
            // SGST: parseFloat(SGST.toFixed(2)),
            totalAmount: parseFloat(totalAmount.toFixed(2)),
        };

        setinvoiceDatas(updatedInvoiceData);
    }, [tableRows]);





    const handleDeleteRow = (index) => {
        const updatedRows = [...tableRows];
        updatedRows.splice(index, 1);
        settableRows(updatedRows);
    };

    const handleAddRow = () => {
        const newRow = {
            id: tableRows.length + 1, // You can generate IDs based on your logic
            name: '',
            serviceName: '',
            HSNCode: '',
            weight: 0,
            amount: 0,
            total: 0,
            Gst: 0,
        };

        settableRows([...tableRows, newRow]);
    };



    const handlesave = async () => {
        const totalpaid=updatepaidamount+Number(paidamount)
        console.log(paiddate,"paid date");
        console.log(updatepaidamount,"paid amount");
        console.log(totalpaid,"totalpaid");
    
        try {


            if (!selctedCompantId || selctedCompantId.trim() === "") {
                toast.error("Please select a Company", {
                    hideProgressBar: true,
                });
                return;
            }



            if (!selectedDate) {
                toast.error("Select Date", {
                    hideProgressBar: true,
                });
                return;
            }



            if (!SelectedService && tableRows.length <= 0) {
                toast.error("Please select a Service", {
                    hideProgressBar: true,
                });
                return;
            }
            if (invoiceData.totalWeight <= 0) {
                toast.error("Please add weight", {
                    hideProgressBar: true,
                });
                return;
            }

            if (invoiceDatas.subtotal <= 0) {
                toast.error("Please Select a Service", {
                    hideProgressBar: true,
                });
                return;
            }


            
            const savedData = {
                
                _id: invoiceData._id,
                paidamount: Number(paidamount)+updatepaidamount,
                Dueamount: invoiceDatas?.totalAmount - Number(paidamount)-updatepaidamount,
                gst18: invoiceDatas.gst18,
                invoiceNumber: invoiceData.invoiceNumber,
                selectedCompanyId: selctedCompantId,
                selectedDate: selectedDate,
                selecteDuedDate: selectedDueDate,
                Duedate: formatDate(selectedDueDate),
                date: formatDate(selectedDate),
                subtotal: invoiceDatas.subtotal,
                tableRows: tableRows,
                totalAmount: invoiceDatas.totalAmount,
            };
            
            const response = await EditINVOICEdata(savedData);
            if (response.success) {
                toast.success('Invoice edited successfully!', {
                    hideProgressBar: true,
                });
                navigate('/table')
            } else {
                toast.error(response.error)
            }

        } catch (err) {
            console.log(err);
        }
    }
    return (
        <MDBContainer className="py-5">
            <MDBCard style={{ border: '3px solid black' }}>
                <div className="d-flex flex-column flex-md-row" style={{ backgroundColor: "#fff", border: '2px solid black' }}>
                    {/* <div style={{ backgroundColor: '#79c8db', height: '100%', width: '10em', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {/* hii */}
                    {/* </div> */}
                    <div className="flex-grow-1 d-flex flex-column">
                        <div className="text-center text-white p-3" style={{ backgroundColor: '#79c8db' }}>
                            <h1>GST INVOICE</h1>
                        </div>
                        <div className="p-3 d-flex flex-column-reverse flex-md-row justify-content-between">
                            <div className="mb-3 mb-md-0">
                                <p>CYENOSURE - Enter the technoverse</p>
                                <p>
                                    10/543/A1 , HMT COLONY<br />
                                    <span style={{ fontWeight: 300 }}> KALAMASSERY , ERNAKUKLAM,KERALA - 683503</span>
                                </p>
                                <p>GSTIN/UIN: 32CNEPN1375G1Z6</p>
                            </div>
                            {/* <div className="date-input mt-3 mt-md-0">
                                <DatePicker selected={selectedDate} onChange={handleDateChange} dateFormat="dd/MM/yyyy" placeholderText="Select a date" className='datepicker' /><br />
                                <b> Invoice NO:{invoiceData?.invoiceNumber}</b>
                            </div> */}
                            <div className="date-input mt-3 mt-md-0">
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <span className="fw-bold"> Date:</span>   <DatePicker selected={selectedDate} onChange={handleDateChange} dateFormat="dd/MM/yyyy" placeholderText="Select a date" className='datepicker' /><br /><br />
                                <span className="fw-bold"> Due Date:</span> <DatePicker selected={selectedDueDate} onChange={handleDueDateChange} dateFormat="dd/MM/yyyy" placeholderText="Select a date" className='datepicker' /><br /><br />
                                <b>&nbsp;&nbsp; Invoice NO&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;{invoiceData?.invoiceNumber}</b><br />
                                <b> Amount Due&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;{dueamount}</b><br />
                                <b> paid Amount&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;{paidamount}</b>
                            </div>
                        </div>
                    </div>

                    {/* <div className='.hide-on-print' style={{ backgroundColor: '#79c8db', height: '30%', width: '16em', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    </div> */}
                </div>
                <MDBCardBody>
                    <MDBRow className="justify-content-center">
                        <MDBCol xl="8">
                            <MDBTypography listUnStyled>
                                <div className="d-md-flex flex-md-row flex-column justify-content-between">
                                    <div className="d-flex flex-column mb-3 me-md-3">
                                        <span className="text-muted fw-bold">Company</span>
                                        <select
                                            className="select form-select mt-1"
                                            value={selctedCompantId}
                                            onChange={handleCompanyChange}
                                        >
                                            <option value="">Select company</option>
                                            {companydetails &&
                                                companydetails.map((item, index) => (
                                                    <option key={index} value={item._id}>
                                                        {item.companyname}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>



                                </div>
                            </MDBTypography>
                        </MDBCol>
                    </MDBRow>
                    {tableRows.length === 0 && (
                        <div className="my-2 mx-1 d-flex justify-content-end">
                            <button
                                className='btn'
                                size="sm"
                                onClick={handleAddRow}
                            >
                                <MDBIcon style={{ color: 'green' }} fas icon="plus-circle" />
                            </button>
                        </div>
                    )}
                    <MDBRow className="my-2 mx-1 justify-content-center">
                        <MDBCol lg="12" className="table-responsive">
                            <MDBTable striped borderless>
                                <MDBTableHead className="text-white" style={{ backgroundColor: "#84B0CA" }}>
                                    <tr>
                                        <th scope="col" style={{ backgroundColor: "#79c8db", color: "white" }}>
                                            N.O
                                        </th>
                                        <th scope="col" style={{ backgroundColor: "#79c8db", color: "white" }}>
                                            Service Name
                                        </th>
                                        <th scope="col" style={{ backgroundColor: "#79c8db", color: "white" }}>
                                            HSN Code
                                        </th>
                                        <th scope="col" style={{ backgroundColor: "#79c8db", color: "white" }}>
                                            Unit
                                        </th>
                                        <th scope="col" style={{ backgroundColor: "#79c8db", color: "white" }}>
                                            Amount
                                        </th>
                                        <th scope="col" style={{ backgroundColor: "#79c8db", color: "white" }}>
                                            Total
                                        </th>
                                        <th scope="col" style={{ backgroundColor: "#79c8db", color: "white" }}>
                                            Gst
                                        </th>
                                        <th scope="col" style={{ backgroundColor: "#79c8db", color: "white" }}>
                                            Action
                                        </th>
                                        <th scope="col" style={{ backgroundColor: "#79c8db", color: "white" }}>
                                            Action
                                        </th>

                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody style={{ justifyItems: "center" }}>

                                    {tableRows.map((row, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <select
                                                    className="select"
                                                    style={{
                                                        border: 'none',
                                                        background: 'none',
                                                        color: 'black',
                                                        padding: '5px',
                                                    }}
                                                    onChange={(e) => handleServiceChange(index, e.target.value)}
                                                >
                                                    <option value={row._id}>{row.serviceName || 'Select a service'}</option>
                                                    {servicedetails &&
                                                        servicedetails.map((item) => (
                                                            <option key={item._id} value={item._id}>
                                                                {item.servicename}
                                                            </option>
                                                        ))}
                                                </select>

                                            </td>

                                            <td>{HSNCode ? HSNCode : row.HSNCode}</td>
                                            <td className="p-2">
                                            <div className="input-group">
                                                <input
                                                    type="number"
                                                    value={row.weight ? row.weight : ''}
                                                    onChange={(e) => handleWeightChange(index, e.target.value)}
                                                    className="form-control"
                                                    style={{ width: '5em', height: '2rem' }} 

                                                />
                                                 </div>
                                            </td>
                                            <td className="p-2">
                                                <div className="input-group">
                                                    <input
                                                        type="number"
                                                        value={row.amount ? row.amount : ''}
                                                        onChange={(e) => handleamountChange(index, e.target.value)}
                                                        className="form-control"
                                                        style={{ width: '5em', height: '2rem' }} // Adjust the width and height as needed
                                                    />
                                                </div>
                                            </td>
                                            <td>{row.total || 0}</td>
                                            <td>{row.Gst * row.total || 0}</td>
                                            <td>
                                                <button
                                                    className='btn'
                                                    size="sm"
                                                    onClick={() => handleDeleteRow(index)}
                                                >
                                                    <MDBIcon style={{ color: 'red' }} fas icon="trash-alt" />
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    className='btn'
                                                    size="sm"
                                                    onClick={handleAddRow}
                                                >
                                                    <MDBIcon style={{ color: 'green' }} fas icon="plus-circle" />
                                                </button>

                                            </td>
                                        </tr>
                                    ))}
                                </MDBTableBody>

                            </MDBTable>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol xl="8">
                            <p className="ms-3">Note:</p>
                        </MDBCol>
                        <MDBCol xl="3">
                            <MDBTypography listUnStyled>
                                <li className="text-muted ms-3">
                                    <span className="text-black me-4">SubTotal</span>:&nbsp;₹{invoiceDatas?.subtotal}
                                </li>
                                <li className="text-muted ms-3 mt-2">
                                    <span className="text-black me-4">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;IGST</span>:&nbsp;₹{invoiceDatas?.gst18}
                                </li>
                                <li className="text-muted ms-3 mt-2">
                                    <div className="input-group">
                                        <input type="number" className="form-control"   onChange={handlepaidamount} placeholder="Enter amount" />
                                        
                                    </div>
                                </li>
                                <li className="text-muted ms-3 mt-2">
                                   paid Date <DatePicker selected={paiddate} onChange={handlepaidDateChange} dateFormat="dd/MM/yyyy" placeholderText="Select a date"  className='form-control datepicker' />
                                        
                                
                                </li>
                                {/* <li className="text-muted ms-3 mt-2" style={{ display: "flex" }}>
                                    <div style={{ flex: 1 }}>

                                        <div className="input-group">
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={paidamount}
                                                onChange={handlepaidamount}
                                                placeholder="paid amount"
                                                style={{ width: '100%', height: '100%' }}
                                            />
                                        </div>
                                    </div>
                                    <div className="ms-1 flex-grow-1">
                                        <DatePicker
                                            selected={selectedDate}
                                            onChange={handleDateChange}
                                            dateFormat="dd/MM/yyyy"
                                            placeholderText="Select a date"
                                            className='form-control datepicker'
                                        />
                                    </div>

                                </li> */}

                            </MDBTypography>
                            <p className="text-black float-start">
                                <span className="text-black me-3">Total Amount</span>
                                <span style={{ fontSize: "25px" }}>₹{invoiceDatas?.totalAmount}</span>
                            </p>
                        </MDBCol>
                    </MDBRow>
                    <hr style={{ border: '3px solid black' }} />
                    {/* ... (rest of the JSX) */}
                    <MDBRow className="justify-content-center">
                        <MDBCol xl="10" className="text-center mb-3 mb-md-0">
                            <p>Thank you for your purchase</p>
                        </MDBCol>
                        <MDBCol xl="2" className="d-flex justify-content-center">
                            <button
                                className="text-capitalize btn"
                                style={{ backgroundColor: "#60bdf3", color: 'white' }}
                                onClick={handlesave}
                            >
                                <MDBIcon fas icon="save" className="me-2" />
                                SAVE
                            </button>
                        </MDBCol>
                    </MDBRow>
                    {/* ... (rest of the JSX) */}
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    );
};

export default Details;
