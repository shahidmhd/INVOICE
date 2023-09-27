import React, { useEffect, useState } from 'react'
// import Bankpage from '../Components/Bank/Bankpage'
// import Sidebar from '../Components/Sidebar/Sidebar'
import Loading from './Loading'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { setLogout } from '../Redux/Authslice'
import { getallbank } from '../apicalls/Bank'
const Sidebar = React.lazy(() => import('../Components/Sidebar/Sidebar'))
const Bankpage = React.lazy(() => import('../Components/Bank/Bankpage'))
const Bankdetails = () => {
    const dispatch = useDispatch()
    const [accounts, setaccounts] = useState([])
    const [render, setrender] = useState(false)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getallaccounts()
    }, [render])

    const getallaccounts = async () => {
        try {
            setLoading(true);
            const response = await getallbank()
            if (response.success) {
                setaccounts(response.Data)
                setLoading(false)
            } else {
                if (response.message === "invalid token please login") {
                    toast.error(response.message)
                    dispatch(setLogout())
                }
                // toast.error(response.message)


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
                    {!loading && <Bankpage accounts={accounts} render={render} setrender={setrender} />}
                </div>
            </div>
        </>
    )
}

export default Bankdetails
