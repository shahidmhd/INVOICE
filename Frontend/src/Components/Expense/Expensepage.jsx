import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
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
import { AddExpensedata } from '../../apicalls/Expense';

const Expensepage = ({ ledgerdetails, VoucherNumber }) => {
    const navigate = useNavigate()
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [tableRows, setTableRows] = useState([]);
    const [selctedledgerId, setselctedledgerId] = useState('');
    const totalAmount = tableRows.reduce((total, row) => total + (row.amount || 0), 0);
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const handleperticular = (index, newperticular) => {
        const updatedTableRows = [...tableRows];
        updatedTableRows[index].perticulars = newperticular
        setTableRows(updatedTableRows);


    };

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Note: Month is zero-based
        const year = date.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        return formattedDate;
    }


    const handleAddRow = () => {
        setTableRows((prevRows) => [
            ...prevRows,
            {
                _id:'',
                perticulars: '',
                amount: '',
            },
        ]);
    };

    const handleledgerChange = (e) => {
        const selectedledgerId = e.target.value;
        setselctedledgerId(selectedledgerId);
    };

    const handleDeleteRow = (index) => {
        setTableRows((prevRows) => prevRows.filter((_, i) => i !== index));
    };


    const handleamountChange = (index, newamount) => {
        const updatedTableRows = [...tableRows];
        updatedTableRows[index].amount = Number(newamount);
        setTableRows(updatedTableRows);

    }

    const handleSave = async () => {
        if (!selctedledgerId || selctedledgerId.trim() === "") {
            toast.error("Please select a person", {
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




        const dataToSave = {
            selectedDate: selectedDate,
            date: formatDate(selectedDate),
            selctedledgerId: selctedledgerId,
            VoucherNumber:VoucherNumber,
            tableRows: tableRows,
           
            totalAmount:totalAmount,
        };

        // Use 'dataToSave' to save or process the data as needed
        // Here you can save the data to your backend or do whatever you need with it
        const response = await AddExpensedata(dataToSave);
        if (response.success) {
            toast.success('expense saved successfully!', {
                hideProgressBar: true,
            });
            navigate('/expensedetails')
        }else{
            toast.error("expense Not added ")
        }
        // Add your logic to save the data or perform other actions

        // Example: Clear the form after saving
        setSelectedDate(new Date());
        setselctedledgerId('');
        setTableRows([]);
        // ... (clear other states)

    };


    return (
        <MDBContainer className="py-5">
            <MDBCard style={{ border: '3px solid black' }}>
                <div className="d-flex flex-column flex-md-row" style={{ backgroundColor: "#fff", border: '2px solid black' }}>
                    <div className="flex-grow-1 d-flex flex-column">
                        <div className="text-center text-white p-3" style={{ backgroundColor: '#79c8db' }}>
                            <h1>Company Expense</h1>
                        </div>
                        <div className="p-3 d-flex flex-column-reverse flex-md-row justify-content-between">
                            <div className="mb-3 mb-md-0">
                                <p>CYENOSURE - Enter the technoverse</p>
                                <p>
                                    10/543/A1 , HMT COLONY<br />
                                    <span style={{ fontWeight: 300 }}>KALAMASSERY , ERNAKUKLAM,KERALA - 683503</span>
                                </p>
                                <p>GSTIN/UIN: 32CNEPN1375G1Z6</p>
                            </div>
                            <div className="date-input mt-3 mt-md-0">
                                &nbsp;&nbsp; <span className="fw-bold"> Date:</span>&nbsp; &nbsp; <DatePicker selected={selectedDate} onChange={handleDateChange} dateFormat="dd/MM/yyyy" placeholderText="Select a date" className='datepicker form-control' /><br /><br />
                                <b className='ms-5'> Voucher NO:  {VoucherNumber}</b>
                            </div>
                        </div>

                    </div>
                </div>

                <MDBCardBody>
                    <MDBRow className="justify-content-center">
                        <MDBCol xl="8">
                            <MDBTypography listUnStyled>
                                <div className="d-md-flex flex-md-row flex-column justify-content-between">
                                    <div className="d-flex flex-column mb-3 me-md-3">
                                        <span className="text-muted fw-bold">Payment To</span>
                                        <select
                                            className="select form-select mt-1"
                                            onChange={handleledgerChange}

                                        >
                                            <option value="">Select</option>

                                            {ledgerdetails &&
                                                ledgerdetails.map((item, index) => (
                                                    <option key={index} value={item._id}>
                                                        {item.Name}
                                                    </option>
                                                ))}

                                        </select>
                                    </div>

                                </div>
                            </MDBTypography>
                        </MDBCol>
                    </MDBRow>

                    <MDBRow className="my-2 mx-1 justify-content-center">
                        <MDBCol lg="12" className="table-responsive">
                            <MDBTable striped borderless>
                                <MDBTableHead className="text-white" style={{ backgroundColor: "#84B0CA" }}>
                                    <tr>
                                        <th scope="col" style={{ backgroundColor: "#79c8db", color: "white" }}>
                                            N.O
                                        </th>
                                        <th scope="col" style={{ backgroundColor: "#79c8db", color: "white" }}>
                                            Perticulars
                                        </th>
                                        <th scope="col" style={{ backgroundColor: "#79c8db", color: "white" }}>
                                            Amount
                                        </th>

                                        <th scope="col" style={{ backgroundColor: "#79c8db", color: "white" }}>
                                            Action
                                        </th>
                                        <th scope="col" style={{ backgroundColor: "#79c8db", color: "white" }}>
                                            Action
                                        </th>

                                    </tr>
                                </MDBTableHead>

                                <MDBTableBody style={{ justifyItems: 'center' }}>
                                    {tableRows.map((row, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td className="p-2">
                                                <div className="input-group">
                                                    <input
                                                        type="text"
                                                        value={row.perticulars ? row.perticulars : ''}
                                                        onChange={(e) => handleperticular(index, e.target.value)}
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
                                                        style={{ width: '5em', height: '2rem' }}
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                <button
                                                    className="btn"
                                                    size="sm"
                                                    onClick={() => handleDeleteRow(index)}
                                                >
                                                    <MDBIcon style={{ color: 'red' }} fas icon="trash-alt" />
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    className="btn"
                                                    size="sm"
                                                    onClick={handleAddRow}
                                                >
                                                    <MDBIcon style={{ color: 'green' }} fas icon="plus-circle" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {tableRows.length === 0 && (
                                        setTableRows(prevRows => [...prevRows, {
                                            _id:'',
                                            perticulars: '',
                                            amount: '',
                                        }])
                                    )}
                                </MDBTableBody>

                            </MDBTable>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol xl="8">

                        </MDBCol>
                        <MDBCol xl="3">
                            {/* <MDBTypography listUnStyled>
                                <li className="text-muted ms-3">
                                    <span className="text-black me-4">SubTotal</span>:&nbsp;00000
                                </li>
                                <li className="text-muted ms-3 mt-2">
                                <span className="text-black me-4">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;IGST</span>&nbsp;:&nbsp;₹7777
                                </li>
                            </MDBTypography> */}
                            <p className="text-black float-start">
                                <span className="text-black me-3">Total Amount</span>
                                <span style={{ fontSize: "25px" }}>₹{totalAmount}</span>
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
                                onClick={handleSave}

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

export default Expensepage;