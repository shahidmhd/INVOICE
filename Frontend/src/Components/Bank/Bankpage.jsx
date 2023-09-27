import React, { useState } from 'react'
import Addbank from '../../Modal/Addbank'
import { CDBCard, CDBCardBody, CDBDataTable, CDBContainer } from 'cdbreact';
import Deletebank from '../../Modal/Deletebank';
import Editbank from '../../Modal/Editbank';
const Bankpage = ({accounts,render,setrender}) => {
    const [showModal, setShowModal] = useState(false)
    const [showdeleteModal, setShowdeleteModal] = useState(false);
    const [selectedId, setSelectedid] = useState(null);
    const [showeditModal, setShoweditModal] = useState(false);
    const [selectedaccount, setselectedaccount] = useState(null);

    const handleEditClick = (item) => {
        setselectedaccount(item);
        setShoweditModal(true);
    };
    const data = () => {
        if (!Array.isArray(accounts)) {
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
                    label: 'Bank Name',
                    field: 'Bankname',
                    width: 200,
                },
                {
                    label: 'Account No',
                    field: 'Accountno',
                    width: 150,
                },
                {
                    label: 'IFSC code',
                    field: 'ifsccode',
                    width: 150,
                },
                {
                    label: 'Account Holder',
                    field: 'Acountholder',
                    width: 150,
                },
                {
                    label: 'Action',
                    field: 'editButton',
                    width: 150,
                },
                {
                    label: 'Action',
                    field: 'deleteButton',
                    width: 150,
                },
              
            ],
            rows: accounts.map((item, index) => ({
                No: index + 1,
                Bankname: item?.BankName,
                Accountno: item?.Accountno,
                ifsccode: item?.ifsccode,
                Acountholder: item?.person,
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
                        style={{ cursor: 'pointer' }} onClick={() => {
                            setSelectedid(item._id)
                            setShowdeleteModal(true)
                        }}
                           
                 
                        className="btn btn-danger btn-sm"
                    >
                        Delete
                    </button>
                ),
            })),
        };
    };
  return (
    <>
    <div className='container-fluid p-5' style={{ height: '100vh', overflowY: 'auto' }}>
        {/* Invoice Heading */}
        <div className='mb-4'>
            <h1 className='text-center mb-3'>Manage Your Bank details</h1>
            <p className='text-center text-muted'>
                Welcome to the Company Management Dashboard.</p>
        </div>
        {/*  */}
        <div className='text-center mb-3'>
            <button className='btn btn-large' onClick={() => setShowModal(true)} style={{ backgroundColor: 'black', color: 'white', cursor: 'pointer' }}>Add Bank</button>
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
                        entriesOptions={[5, 20, 25]}
                        entries={5}
                        pagesAmount={4}
                        data={data()}
                        materialSearch={true}
                    />
                </CDBCardBody>
            </CDBCard>
        </CDBContainer>
    </div>
    {showeditModal && <Editbank showeditModal={showeditModal} setShoweditModal={setShoweditModal} selectedaccount={selectedaccount} render={render} setrender={setrender} />}
   {showModal&& <Addbank showModal={showModal} setShowModal={setShowModal} render={render} setrender={setrender}/>}
   {showdeleteModal&&<Deletebank id={selectedId} showdeleteModal={showdeleteModal} setShowdeleteModal={setShowdeleteModal} render={render} setrender={setrender}/>}
  </>
  )
}

export default Bankpage
