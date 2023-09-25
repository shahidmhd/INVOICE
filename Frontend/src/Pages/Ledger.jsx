import React, { useEffect, useState } from 'react'
import { getnotdeletedallledger } from '../apicalls/Ledger'
const Sidebar = React.lazy(() => import('../Components/Sidebar/Sidebar'))
const Ledgerpage = React.lazy(() => import('../Components/Ledger/Ledgerpage'))
import Loading from './Loading'
import { toast } from 'react-toastify'
const Ledger = () => {
    const [ledger, setledger] = useState([])
    const [render, setrender] = useState(false)
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getallLedger()
      }, [render])
    
      const getallLedger = async () => {
        try {
          setLoading(true);
          const response = await getnotdeletedallledger()
          if (response.success) {
            setledger(response.Data)
            setLoading(false)
          
          }
        } catch (err) {
          toast.error("err.message")
        }
    
      }
    return (
        <>
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                {loading ? <Loading /> : null}
                  {!loading&& <Ledgerpage  ledger={ledger} render={render} setrender={setrender}/>}
                </div>
            </div>
        </>

    )
}

export default Ledger
