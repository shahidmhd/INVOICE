


import React, { useState } from 'react';
import { CDBCard, CDBCardBody, CDBDataTable, CDBContainer } from 'cdbreact';
import { useNavigate } from 'react-router-dom';
import { deleteInvoice, getselectedinvioce } from '../../apicalls/Invoice';
import { toast } from 'react-toastify';
import Paymentmodal from '../../Modal/Paymentmodal';

const Invoicetables = ({ invoices, render, setrender }) => {
  const [showeditModal, setShoweditModal] = useState(false);
  const [currentdatas, setcurrentdatas] = useState(null);


  const handlestatusClick = (item) => {
    setcurrentdatas(item.updateddata)
    setShoweditModal(true);
  };



  const navigate = useNavigate()

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Note: Month is zero-based
    const year = date.getFullYear();

    const formattedDate = `${day}/${month}/ ${year}`;
    return formattedDate;
  }


  const handleeditpage = (invoiceid) => {
    navigate(`/detail/${invoiceid}`)

  }


  const handleprintpage = async (item) => {
    const response = await getselectedinvioce(item._id)
    navigate(`/print/${item._id}`);
  };


  const handledeletepage = async (item) => {
    const response = await deleteInvoice(item._id)
    if (response.success) {
      toast.success("invoice deleted")
      setrender(!render)
    }
  }


  const data = () => {
    if (!Array.isArray(invoices)) {
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
          width: 50,
        },
        {
          label: 'Invoice Number',
          field: 'invoiceNumber',
          width: 100,
        },
        {
          label: 'Company Name',
          field: 'CompanyName',
          width: 100,
        },
        {
          label: 'Date',
          field: 'Date',
          width: 500,
        },
        {
          label: 'DueDate',
          field: 'DueDate',
          width: 100,
        },
        {
          label: 'Amount',
          field: 'totalAmount',
          width: 100,
        },
        {
          label: 'paidamount',
          field: 'paidamount',
          width: 100,
        },
        {
          label: 'Balance Due',
          field: 'amountdue',
          width: 100,
        },
        {
          label: 'option',
          field: 'details',
          width: 100,
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
        {
          label: 'option',
          field: 'paymentstatus',
          width: 100,
        },
      ],
      rows: invoices.map((item, index) => ({
        No: index + 1,
        invoiceNumber: item.invoiceNumber,
        CompanyName: item.selectedCompanyId && item.selectedCompanyId.companyname ? item.selectedCompanyId.companyname : 'company Deleted',
        totalAmount: item.totalAmount,
        Date: formatDate(item.selectedDate),
        DueDate:item.Duedate,
        paidamount:item.paidamount?item.paidamount:0,
        amountdue:item.Dueamount?item.Dueamount:0,
        details: (
          <button
            onClick={() => handleprintpage(item)}
            style={{ cursor: 'pointer' }}
            className="btn btn-dark btn-sm"
          >
            details
          </button>
        ),
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
            onClick={() => handledeletepage(item)}
            style={{ cursor: 'pointer' }}
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>
        ),
        paymentstatus: (
          <button
            onClick={() => handlestatusClick(item)}
            style={{ cursor: 'pointer' }}
            className="btn btn-outline-secondary btn-sm"
          >
            status
          </button>
        ),
      })),
    };
  };

  // Rest of your component code

  return (
    <div className='container-fluid p-5' style={{ height: '100vh', overflowY: 'auto' }}>
      {/* Invoice Heading */}
      <div className='mb-4'>
        <h1 className='text-center mb-3'>Manage Your Invoice</h1>
        <p className='text-center text-muted'>
          Welcome to the Invoice Management Dashboard.</p>
      </div>
      {/*  */}
      <div className='text-center mb-3'>
        <button className='btn btn-large' onClick={() => navigate('/invoice')} style={{ backgroundColor: 'black', color: 'white', cursor: 'pointer' }}>Add Invoice</button>
      </div>
      <CDBContainer>
        <CDBCard>
          <CDBCardBody>
            <CDBDataTable
              responsive
              striped
              bordered
              hover
              entriesOptions={[5, 20, 25]}
              entries={5}
              pagesAmount={4}
              data={data()}
              materialSearch={true}
              
            />
          </CDBCardBody>
        </CDBCard>
      </CDBContainer>
      {showeditModal && <Paymentmodal showeditModal={showeditModal} setShoweditModal={setShoweditModal} currentdatas={currentdatas}/>}
    </div>
  );
};

export default Invoicetables;




