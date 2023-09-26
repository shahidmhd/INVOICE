import React from 'react'
import { CDBCard, CDBCardBody, CDBContainer, CDBDataTable, CDBRow, CDBCol } from 'cdbreact';
import { Link } from 'react-router-dom';
const Expensedetailpage = ({ expense, render, setrender }) => {
    console.log(expense,"hhhhsss");
    const data = () => {
        // if (!Array.isArray()) {
        //     return {
        //         columns: [],
        //         rows: [],
        //     };
        // }
        return {
            columns: [
                {
                    label: 'No',
                    field: 'No',
                    width: 100,
                },
                {
                    label: 'perticulars',
                    field: 'perticulars',
                    width: 200,
                },
                {
                    label: 'Amount',
                    field: 'Amount',
                    width: 150,
                },
                {
                    label: 'payed to',
                    field: 'Payed',
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
            rows: []
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
                    <Link to="/expense" className='btn btn-large'  style={{ backgroundColor: 'black', color: 'white', cursor: 'pointer' }}>Add Expense</Link>
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
            </>
  )
}

export default Expensedetailpage
