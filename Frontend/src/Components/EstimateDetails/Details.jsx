
import React, { useState } from 'react';
import { CDBCard, CDBCardBody, CDBDataTable, CDBContainer } from 'cdbreact';
import { useNavigate } from 'react-router-dom';
import { deleteInvoice,} from '../../apicalls/Invoice';
import { toast } from 'react-toastify';
import { getselectedEstimate } from '../../apicalls/Estimate';
const Details = ({ invoices, render, setrender }) => {
  const navigate = useNavigate()
  // function formatDate(dateString) {
  //   console.log(dateString,"date ");
  //   const date = new Date(dateString);
  //   const formattedDate = date.toLocaleDateString("en-US");
  //   return formattedDate;
  // }
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




  const handleestimateprintpage = async (item) => {
    console.log(item);
   await getselectedEstimate(item._id)
    navigate(`/estimateprint/${item._id}`);
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
          width: 100,
        },
          {
            label: 'TotalAmount',
            field: 'totalAmount',
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
      ],
      rows: invoices.map((item, index) => ({
        No: index + 1,
        invoiceNumber: item.invoiceNumber,
        CompanyName: item.selectedCompanyId && item.selectedCompanyId.companyname ? item.selectedCompanyId.companyname : 'company Deleted',
        Date: formatDate(item.selectedDate),
        totalAmount: item.totalAmount,

        details: (
          <button
            onClick={() => handleestimateprintpage(item)}
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
      })),
    };
  };

  // Rest of your component code

  return (
    <div className='container-fluid p-5' style={{ height: '100vh', overflowY: 'auto' }}>
      {/* Invoice Heading */}
      <div className='mb-4'>
        <h1 className='text-center mb-3'>Manage Your Estimate</h1>
        <p className='text-center text-muted'>
          Welcome to the Invoice Management Dashboard.</p>
      </div>
      {/*  */}
      <div className='text-center mb-3'>
        <button className='btn btn-large' onClick={() => navigate('/estimate')} style={{ backgroundColor: 'black', color: 'white', cursor: 'pointer' }}>Add Estimate</button>
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
    </div>
  );
};

export default Details;




