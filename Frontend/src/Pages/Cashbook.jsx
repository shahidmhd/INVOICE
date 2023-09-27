import React, { useEffect, useState } from 'react'
import Sidebar from '../Components/Sidebar/Sidebar'
import Cashbookpage from '../Components/Cashbook/Cashbookpage'
import { getallinvoices } from '../apicalls/Invoice'
import { getallexpense } from '../apicalls/Expense'

const Cashbook = () => {
    const [invoices,setinvoices]=useState([])
    const [expense,setexpense]=useState([])
    // useEffect(()=>{
    //     const fetchdata=async()=>{
    //         const response=await getallinvoices()
    //         setinvoices(response.Data)
    //     }
    //     fetchdata()

    // },[])
const getallinvoicess=async()=>{
    const response=await getallinvoices()
        setinvoices(response.Data)
}

const getallexpenses=async()=>{
    const response=await getallexpense()
    setexpense(response.Data)
}
    useEffect(() => {
        async function fetchData() {
                await Promise.all([getallinvoicess(),getallexpenses()]);
            
            }
            fetchData();
    }, [])
    return (
        <>
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                   {invoices&& <Cashbookpage invoices={invoices} expense={expense}/>}

                </div>
            </div>
        </>
    )
}

export default Cashbook
