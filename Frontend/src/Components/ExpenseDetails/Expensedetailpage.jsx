import React, { useState } from 'react'
import { CDBCard, CDBCardBody, CDBContainer, CDBDataTable, CDBRow, CDBCol } from 'cdbreact';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import DeleteExpense from '../../Modal/DeleteExpense';
const Expensedetailpage = ({ expense, render, setrender }) => {
    const [showdeleteModal, setShowdeleteModal] = useState(false);
    const [selectedId, setSelectedid] = useState(null);

    const navigate = useNavigate()
    const handleeditpage = (invoiceid) => {
        navigate(`/expense/${invoiceid}`)

    }
    const data = () => {
        if (!Array.isArray(expense)) {
            return {
                columns: [],
                rows: [],
            };
        }
        return {
            columns: [
                {
                    label: 'VoucherNo',
                    field: 'No',
                    width: 100,
                },
                {
                    label: 'Date',
                    field: 'Date',
                    width: 100,
                },
                {
                    label: 'payed to',
                    field: 'Payed',
                    width: 150,
                },
                {
                    label: 'totalamount',
                    field: 'totalamount',
                    width: 150,
                },

                {
                    label: 'option',
                    field: 'editButton',
                    width: 100,
                },
                {
                    label: 'option',
                    field: 'deleteButton',
                    width: 100,
                },
            ],
            rows: expense.map((item, index) => ({
                No: index + 1,
                Date: item?.date,
                Payed: item.selctedledgerId && item.selctedledgerId.Name ? item.selctedledgerId.Name : 'company Deleted',
                totalamount: item?.totalAmount,
                editButton: (
                    <button
                        onClick={() => handleeditpage(item._id)}
                        style={{ cursor: 'pointer' }}
                        className="btn btn-primary btn-sm"
                    >
                        Edit
                    </button>
                ),
                deleteButton: (
                    <button
                        style={{ cursor: 'pointer' }}
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                            setSelectedid(item._id)
                            setShowdeleteModal(true)
                        }}

                    >
                        Delete
                    </button>
                ),
            }))
        }
    }
    return (
        <>
            <div className='container-fluid p-5' style={{ height: '100vh', overflowY: 'auto' }}>
                {/* Invoice Heading */}
                <div className='mb-4'>
                    <h1 className='text-center mb-3'>Manage Your Ledger</h1>
                    <p className='text-center text-muted'>
                        Welcome to the Ledger Management Dashboard.</p>
                </div>
                {/*  */}
                <div className='text-center mb-3'>
                    <Link to="/expense" className='btn btn-large' style={{ backgroundColor: 'black', color: 'white', cursor: 'pointer' }}>Add Expense</Link>
                </div>

                <CDBContainer>
                    <CDBCard>
                        <CDBCardBody>
                            <CDBDataTable
                                responsive
                                striped
                                bordered
                                hover
                                scrollY
                                maxHeight="50vh"
                                data={data()}
                                materialSearch
                            />
                        </CDBCardBody>
                    </CDBCard>
                </CDBContainer>
            </div>
            {showdeleteModal && <DeleteExpense id={selectedId} render={render} setrender={setrender} showdeleteModal={showdeleteModal} setShowdeleteModal={setShowdeleteModal} />}
        </>
    )
}

export default Expensedetailpage
