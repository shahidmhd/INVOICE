import React, { useState } from 'react'
import { CDBCard, CDBCardBody, CDBContainer, CDBDataTable, CDBRow, CDBCol } from 'cdbreact';
const Cashbookpage = ({invoices,expense}) => {
console.log(invoices,"in");
console.log(expense,"ex");

  const updatedExpenseArray = [];

  expense.map((item) => {
    if (item?.tableRows.length > 0) {
      const VoucherNumber = item.VoucherNumber; // Get the VoucherNumber
      const selectedDate = item.selectedDate; // Get the VoucherNumber
      const date = item.date; // Get the VoucherNumber
      const tableRowsWithVoucherNumber = item.tableRows.map((row) => ({
        VoucherNumber: VoucherNumber, // Add VoucherNumber to each row
        amount: row.amount,
        selectedDate:selectedDate,
        date:date,
        perticulars: row.perticulars,
      }));
      updatedExpenseArray.push(...tableRowsWithVoucherNumber);
    }
  });
  
  console.log(updatedExpenseArray, "expense");
  

  const updatedDataArray = [];
  invoices.map((item) => {
    if (item?.updateddata.length > 0) {
      const invoiceNumber = item.invoiceNumber; // Get the invoiceNumber
      const updatedDataWithInvoiceNumber = item.updateddata.map((update) => ({
        invoiceNumber: invoiceNumber, // Add invoiceNumber to each object
        updateddate: update.updateddate,
        currentpaid: update.currentpaid,
        currentdate:update.currentdate
      }));
      updatedDataArray.push(...updatedDataWithInvoiceNumber);
    }
  });
  
  console.log(updatedDataArray, "credit");
  

//   const combinedData = [...expense, ...invoices];

// // Sort the combined array based on updateddate and selectedDate in ascending order
// combinedData.sort((a, b) => {
//   const dateA = new Date(a.updateddate || a.selectedDate);
//   const dateB = new Date(b.updateddate || b.selectedDate);
//   return dateA - dateB;
// });

// const mergedData = [];
// let currentTimestamp = null;
// let currentMergedObject = null;

// combinedData.forEach((item) => {
//   const itemTimestamp = new Date(item.updateddate || item.selectedDate).getTime();

//   if (itemTimestamp !== currentTimestamp) {
//     // If the timestamp is different, create a new merged object
//     currentMergedObject = {
//       timestamp: itemTimestamp,
//       items: [],
//     };
//     mergedData.push(currentMergedObject);
//     currentTimestamp = itemTimestamp;
//   }

//   // Push the current item to the items array in the merged object
//   currentMergedObject.items.push(item);
// });

// console.log(mergedData);
const combinedData = [...updatedExpenseArray, ...updatedDataArray];

// Sort the combined array based on selectedDate and updateddate in ascending order
combinedData.sort((a, b) => {
  const dateA = new Date(a.selectedDate || a.updateddate);
  const dateB = new Date(b.selectedDate || b.updateddate);
  return dateA - dateB;
});

const mergedData = [];
let currentTimestamp = null;
let currentMergedObject = null;

combinedData.forEach((item) => {
  const itemTimestamp = new Date(item.selectedDate || item.updateddate).getTime();

  if (itemTimestamp !== currentTimestamp) {
    // If the timestamp is different, create a new merged object
    currentMergedObject = {
      timestamp: itemTimestamp,
      items: [],
    };
    mergedData.push(currentMergedObject);
    currentTimestamp = itemTimestamp;
  }

  // Push the current item to the items array in the merged object
  currentMergedObject.items.push(item);
});

console.log(mergedData);


const data = () => {
  const rows = [];

    // Initialize total amounts to 0
    let totalAmountCredited = 0;
    let totalAmountDebited = 0;

  mergedData.forEach((item, index) => {
    const timestamp = new Date(item.timestamp).toLocaleDateString(); // Format the timestamp as needed
    const items = item.items;

    // Iterate through the items and extract data for each row




    
    items.forEach((itemData) => {
      const row = {
        No: index + 1, // You can adjust this logic to increment based on your requirements
        Date: timestamp,
        perticulars: itemData.perticulars || itemData.invoiceNumber, // Extract the perticulars field
        AmountCredited: itemData.currentpaid || 0, // Extract the AmountCredited field
        Amountdebited: itemData.amount || 0, // Extract the Amountdebited field
      };
    // Update the total amounts
    totalAmountCredited += itemData.currentpaid || 0;
    totalAmountDebited += itemData.amount || 0;
      rows.push(row);
    });
  });
  const newRow = {
    No:'', // Increment the No value for the new row
    Date: '', // Replace with the desired date
    perticulars: 'Total', // Replace with the particulars for the new row
    AmountCredited: totalAmountCredited, // Replace with the AmountCredited for the new row
    Amountdebited: totalAmountDebited, // Replace with the Amountdebited for the new row
  };

  rows.push(newRow);


  return {
    columns: [
      {
        label: 'No',
        field: 'No',
        width: 100,
      },
      {
        label: 'Date',
        field: 'Date',
        width: 200,
      },
      {
        label: 'perticulars',
        field: 'perticulars',
        width: 150,
      },
      {
        label: 'Amount Credited',
        field: 'AmountCredited',
        width: 150,
      },
      {
        label: 'Amount debited',
        field: 'Amountdebited',
        width: 150,
      },
    ],
    rows,
  };
};

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
          <button className='btn btn-large' onClick={() => setShowModal(true)} style={{ backgroundColor: 'black', color: 'white', cursor: 'pointer' }}>balance</button>
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

export default Cashbookpage
