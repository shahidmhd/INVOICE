import React, { useEffect, useState } from 'react';
import Sidebar from '../Components/Sidebar/Sidebar';
// import Printing from '../Components/Printingpage/Printing';
import { useParams } from 'react-router-dom';
import { getselectedinvioce } from '../apicalls/Invoice';
import Loading from './Loading';
import { getallbank } from '../apicalls/Bank';
import { getallterms } from '../apicalls/Terms';
import Printingpageigst from '../Components/Printingigstsgst/Printingpageigst';

const Printingigst = () => {
  const { id } = useParams();
  const [invoiceData, setInvoiceData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state
  const [bankData, setbankData] = useState(null);
  const [termsData, settermsData] = useState(null);

  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        const response = await getselectedinvioce(id);
        const account=await getallbank()
        const terms=await getallterms()
        settermsData(terms.Data)
        setbankData(account.Data)
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
        {!isLoading&&<Printingpageigst invoiceData={invoiceData} bankData={bankData} termsData={termsData} />}
      </div>
    </div>
  </>
  );
}

export default Printingigst;
