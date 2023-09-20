import React, { useEffect, useState } from 'react';
import Sidebar from '../Components/Sidebar/Sidebar';
import Printing from '../Components/Printingpage/Printing';
import { useParams } from 'react-router-dom';
import Loading from './Loading';
import { getselectedEstimate } from '../apicalls/Estimate';

const Estimateprint = () => {
  const { id } = useParams();
  const [invoiceData, setInvoiceData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        const response = await getselectedEstimate(id);
        console.log(response.Data,"h");
        setInvoiceData(response.Data);
        setIsLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        // Handle the error
        setIsLoading(false); // Set loading to false in case of error as well
      }
    };

    fetchInvoiceData();
  }, [id]);

  return (
    <>
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        {isLoading ? <Loading /> : null}
        {!isLoading&&<Printing invoiceData={invoiceData} />}
      </div>
    </div>
  </>
  );
}

export default Estimateprint;
