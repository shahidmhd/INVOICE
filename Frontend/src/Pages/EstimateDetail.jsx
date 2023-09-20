


import React, { useEffect, useState } from 'react'
import Sidebar from '../Components/Sidebar/Sidebar'

import Loading from './Loading'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { setLogout } from '../Redux/Authslice'
import Details from '../Components/EstimateDetails/Details'
import { getnotdeletedEstimate } from '../apicalls/Estimate'

const EstimateDetail = () => {
  const dispatch=useDispatch()
  const [invoices, setallinvoices] = useState([])
  const [render, setrender] = useState(false)
  const [loading, setloading] = useState(true)
  const getallinvoice = async () => {
    setloading(true)
    const response = await getnotdeletedEstimate()
    if(response.success){
      setallinvoices(response.Data)
      setloading(false)
    }else{
      if(response.message==="invalid token please login"){
        toast.error(response.message)
        dispatch(setLogout())
      }
    }

  }
  useEffect(() => {
    getallinvoice()
  }, [render])
  return (
    <>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          {loading ? <Loading /> : null}
          {!loading && <Details render={render} setrender={setrender} invoices={invoices} />}
        </div>
      </div>
    </>
  )
}

export default EstimateDetail

