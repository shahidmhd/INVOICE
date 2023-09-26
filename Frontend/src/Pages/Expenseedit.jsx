import React, { useEffect, useState } from 'react'
import Sidebar from '../Components/Sidebar/Sidebar'
import Expenseeditpage from '../Components/Expenseedit/Expenseeditpage'
import { getselectedexpense } from '../apicalls/Expense';
import { useParams } from 'react-router-dom';
import { getnotdeletedallledger } from '../apicalls/Ledger';

const Expenseedit = () => {
    const { id } = useParams();
    const [ledgerdetails, setledgerdetails] = useState();
    const [expensedata, setexpensedata] = useState(null);

    const getselectedexpenses = async (id) => {
        const response = await getselectedexpense(id);
        setexpensedata(response.Data);
    }

    const getallnotdeletedledger=async()=>{
        const response = await getnotdeletedallledger();
        setledgerdetails(response.Data);
    }

    useEffect(() => {
        async function fetchData() {
                await Promise.all([getselectedexpenses(id),getallnotdeletedledger()]);
            
            }
            fetchData();
    }, [])

    return (
        <>
            <div style={{ display: 'flex' }}>
                <div style={{ flex: '0 0 auto' }}>
                    <Sidebar />
                </div>
                <div style={{ flex: '1', overflowY: 'scroll' }}>
                {expensedata && ledgerdetails && <Expenseeditpage expensedata={expensedata} ledgerdetails={ledgerdetails} />}

                </div>
            </div>

        </>
    )
}

export default Expenseedit
