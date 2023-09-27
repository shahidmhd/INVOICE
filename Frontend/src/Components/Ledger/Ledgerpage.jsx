import { CDBCard, CDBCardBody, CDBContainer, CDBDataTable, CDBRow, CDBCol } from 'cdbreact';
import React, { useEffect, useState } from 'react'
import Ledgermodal from '../../Modal/Ledgermodal';
import Editledger from '../../Modal/Editledger';
import Deleteledger from '../../Modal/Deleteledger';

const Ledgerpage = ({ ledger, render, setrender }) => {
    const [showModal, setShowModal] = useState(false)
    const [selectedledger, setSelectedledger] = useState(null);
    const [showeditModal, setShoweditModal] = useState(false);
    const [showdeleteModal, setShowdeleteModal] = useState(false);
    const [selectedId, setSelectedid] = useState(null);


    const handleEditClick = (item) => {
        setSelectedledger(item);
        setShoweditModal(true);
    };
   
    const data = () => {
        if (!Array.isArray(ledger)) {
            return {
                columns: [],
                rows: [],
            };
        }
        return {
            columns: [
                {
                    label: 'No',
                    field: 'No',
                    width: 100,
                },
                {
                    label: 'Name',
                    field: 'Name',
                    width: 200,
                },
                {
                    label: 'Opening Balance',
                    field: 'Balance',
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
            rows: ledger.map((item, index) => ({
                No: index + 1,
                Name: item?.Name,
                Balance: `${item?.balance} ${item?.type}`,
                editButton: (
                  <button
                  onClick={() => handleEditClick(item)}
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
            
        };
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
                    <button className='btn btn-large' onClick={() => setShowModal(true)} style={{ backgroundColor: 'black', color: 'white', cursor: 'pointer' }}>Add Ledger</button>
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
            {showModal && <Ledgermodal showModal={showModal} setShowModal={setShowModal} render={render} setrender={setrender}/>}
          {showeditModal&& <Editledger  showeditModal={showeditModal} setShoweditModal={setShoweditModal} selectedledger={selectedledger} render={render} setrender={setrender} />}
          {showdeleteModal && <Deleteledger id={selectedId} render={render} setrender={setrender} showdeleteModal={showdeleteModal} setShowdeleteModal={setShowdeleteModal} />}

        </>
    )
}

export default Ledgerpage
