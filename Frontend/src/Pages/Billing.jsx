import React, { useEffect } from 'react'
// import Bill from '../Components/Billpage/Bill'
// import Sidebar from '../Components/Sidebar/Sidebar'
import { getallcompanies, getnotdeletedallcompanies } from '../apicalls/Company';
import { getallServices } from '../apicalls/Service';
import { getallinvoices } from '../apicalls/Invoice';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLogout } from '../Redux/Authslice';
const Bill = React.lazy(() => import('../Components/Billpage/Bill'))
const Sidebar = React.lazy(() => import('../Components/Sidebar/Sidebar'))
const Billing = () => {
  const dispatch = useDispatch()
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
    const response = await getallinvoices()
    if (response.success) {
      const invoiceCounter = response.Data.length + 1;
      // const formattedCounter = invoiceCounter.toString().padStart(3, '0');
      // console.log(formattedCounter, "ggggggggggggggggg");
      // const newInvoiceNumber = `#CY100${formattedCounter}`;
      // setInvoiceNumber(newInvoiceNumber);
      // 
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear().toString(); // Get the last 2 digits of the current year
      const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Get the current month and pad with '0' if needed

      // Assuming 'formattedCounter' is your counter as you mentioned in the code
      const formattedCounters = invoiceCounter.toString().padStart(3, '0'); // Pad the counter to 4 digits

      const newInvoiceNumbers = `#CYN${currentMonth}${currentYear}${formattedCounters}`;
      // 
      setInvoiceNumber(newInvoiceNumbers);
    } else {
      if (response.message === "invalid token please login") {
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
          <Bill invoiceNumber={invoiceNumber} companydetails={companydetails} servicedetails={servicedetails} />
        </div>
      </div>

    </>
  )
}

export default Billing
