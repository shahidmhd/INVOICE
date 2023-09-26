import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { parseISO } from 'date-fns';
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
import { Editexpensedata } from '../../apicalls/Expense';
const Expenseeditpage = ({ expensedata, ledgerdetails }) => {
    const [selectedDate, setSelectedDate] = useState(
        expensedata?.selectedDate ? parseISO(expensedata.selectedDate) : new Date()
    );
    const [updatedtotalamount, setupdatedtotalamount] = useState(expensedata?.totalAmount)
    const [selctedledgerId, setselctedledgerId] = useState(expensedata?.selctedledgerId?._id || '');
    const [tableRows, settableRows] = useState(expensedata?.tableRows)
    const navigate = useNavigate()
    const handleperticular = (index, newperticular) => {
        const updatedTableRows = [...tableRows];
        updatedTableRows[index].perticulars = newperticular
        settableRows(updatedTableRows);


    };

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Note: Month is zero-based
        const year = date.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        return formattedDate;
    }

    const handleamountChange = (index, newamount) => {
        const updatedTableRows = [...tableRows];
        updatedTableRows[index].amount = Number(newamount);
        settableRows(updatedTableRows);

    }
    const handleledgerChange = (e) => {
        const selectedledgerId = e.target.value;
        setselctedledgerId(selectedledgerId);
    };
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleAddRow = () => {
        const newRow = {
            _id:tableRows.length+1,
            perticulars: '',
            amount: '',
        };

        settableRows([...tableRows, newRow]);

    };


    // Function to calculate the total amount
    const calculateTotalAmount = () => {
        let total = 0;
        for (const row of tableRows) {
            total += row.amount || 0;
        }
        return total;
    };

    // Update the total amount whenever the tableRows change
    useEffect(() => {
        const total = calculateTotalAmount();
        setupdatedtotalamount(total);
    }, [tableRows]);

    const handleDeleteRow = (index) => {
        const updatedRows = [...tableRows];
        updatedRows.splice(index, 1);
        settableRows(updatedRows);
    };

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
            _id: expensedata._id,
            selectedDate: selectedDate,
            date: formatDate(selectedDate),
            selctedledgerId: selctedledgerId,
            VoucherNumber: expensedata?.VoucherNumber,
            tableRows: tableRows,

            totalAmount: updatedtotalamount,
        };
        const response = await Editexpensedata(dataToSave);
        if (response.success) {
            toast.success('expense edited successfully!', {
                hideProgressBar: true,
            });
            navigate('/expensedetails')
        }else{
            toast.error("expense Not edited ")
        }
        // Add your logic to save the data or perform other actions

        // Example: Clear the form after saving
        // setSelectedDate(new Date());
        // setselctedledgerId('');
        // settableRows([]);
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
                                <b className='ms-5'> Voucher NO: {expensedata?.VoucherNumber ? expensedata.VoucherNumber : ''}</b>

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
                                            value={selctedledgerId}
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
                                        <tr key={index} >
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
                                    {/* {tableRows.length === 0 && (
                                        settableRows(prevRows => [...prevRows, {
                                            perticulars: '',
                                            amount: '',
                                        }])
                                    )} */}
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
                                <span style={{ fontSize: "25px" }}>₹{updatedtotalamount}</span>
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
    )
}

export default Expenseeditpage
