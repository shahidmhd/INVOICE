import React, { useEffect, useState } from 'react'
import Expensedetailpage from '../Components/ExpenseDetails/Expensedetailpage'
import Sidebar from '../Components/Sidebar/Sidebar'
import Loading from './Loading'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { setLogout } from '../Redux/Authslice'
import { getnotdeletedexpense } from '../apicalls/Expense'
const ExpenseDetail = () => {
    const dispatch=useDispatch()
    const [expense, setexpense] = useState([])
    const [render, setrender] = useState(false)
    const [loading, setloading] = useState(true)
    const getallexpense = async () => {
      setloading(true)
      const response = await getnotdeletedexpense()
      if(response.success){
        setexpense(response.Data)
        setloading(false)
      }else{
        if(response.message==="invalid token please login"){
          toast.error(response.message)
          dispatch(setLogout())
        }
      }
  
    }
    useEffect(() => {
        getallexpense()
    }, [render])
  return (
    <>
            <div style={{ display: 'flex' }}>
                <Sidebar/>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                {loading ? <Loading /> : null}
                {!loading && <Expensedetailpage  render={render} setrender={setrender} expense={expense} />}

                </div>
            </div>
        </>
  )
}

export default ExpenseDetail
