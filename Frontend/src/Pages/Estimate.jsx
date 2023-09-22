import React, { useEffect } from 'react'
import Estimat from '../Components/Estimatepage/Estimat'
import {getnotdeletedallcompanies } from '../apicalls/Company';
import { getallServices } from '../apicalls/Service';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLogout } from '../Redux/Authslice';
import { getallestimate } from '../apicalls/Estimate';
const Sidebar = React.lazy(() => import('../Components/Sidebar/Sidebar'))
const Estimate = () => {
  const dispatch =useDispatch()
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [companydetails, setCompanydetails] = useState([]);
  const [servicedetails, setServicedetails] = useState([]);
  const [loading, setLoading] = useState(true);


  const getCompanyData = async () => {
    const response = await getnotdeletedallcompanies();
    setCompanydetails(response.Data);
  };

  const getServiceData = async () => {
    const responseService = await getallServices();
    setServicedetails(responseService.Data);
  };

  const getallInvoices = async () => {
    const response = await getallestimate()
    if (response.success) {
      const invoiceCounter = response.Data.length + 1;
      // const formattedCounter = invoiceCounter.toString().padStart(2, '0');
      // const newInvoiceNumber = `B2C${formattedCounter}`;
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear().toString(); // Get the last 2 digits of the current year
      const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Get the current month and pad with '0' if needed

      // Assuming 'formattedCounter' is your counter as you mentioned in the code
      const formattedCounters = invoiceCounter.toString().padStart(3, '0'); // Pad the counter to 4 digits

      const newInvoiceNumbers = `#CYN${currentMonth}${currentYear}${formattedCounters}`;
      // 
      setInvoiceNumber(newInvoiceNumbers);
      // setInvoiceNumber(newInvoiceNumber);
    } else {
      if(response.message==="invalid token please login"){
        toast.error(response.message)
        dispatch(setLogout())
      }
      //  toast.error("invoices is not getting")
    }

  }

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      await Promise.all([getCompanyData(), getServiceData(), getallInvoices()]);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
  <>
   <div style={{ display: 'flex' }}>
        <div style={{ flex: '0 0 auto' }}>
          <Sidebar />
        </div>
        <div style={{ flex: '1', overflowY: 'scroll' }}>
          <Estimat invoiceNumber={invoiceNumber} companydetails={companydetails} servicedetails={servicedetails}  />
        </div>
      </div>
  </>
  )
}

export default Estimate
