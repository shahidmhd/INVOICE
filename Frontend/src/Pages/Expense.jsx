import React, { useEffect, useState } from 'react'
import Loading from './Loading'
import Expensepage from '../Components/Expense/Expensepage'
import Sidebar from '../Components/Sidebar/Sidebar'
import { getnotdeletedallledger } from '../apicalls/Ledger'
import { getallexpense } from '../apicalls/Expense'

const Expense = () => {
    const [ledgerdetails, setledgerdetails] = useState([]);
    const [VoucherNumber, setVoucherNumber] = useState('');
const getallntdeletedledger=async()=>{
    const response = await getnotdeletedallledger();
    setledgerdetails(response.Data);
}

const getalllexpenses=async()=>{
    const response = await getallexpense()
    if(response.success){
        const invoiceCounter = response.Data.length + 1;
        const formattedCounters = invoiceCounter.toString().padStart(2, '0');
        setVoucherNumber(formattedCounters)
    }
}

    useEffect(() => {
       
        async function fetchData() {
           
            await Promise.all([ getallntdeletedledger(),getalllexpenses()]);
     
          }
          fetchData();
      }, []);

   
    return (
        <>
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                    <Expensepage VoucherNumber={VoucherNumber} ledgerdetails={ledgerdetails}/>
                </div>
            </div>
        </>

    )
}

export default Expense
