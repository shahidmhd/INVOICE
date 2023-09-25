import React from 'react'
const Sidebar = React.lazy(() => import('../Components/Sidebar/Sidebar'))
const Ledgerpage = React.lazy(() => import('../Components/Ledger/Ledgerpage'))


const Ledger = () => {
    return (
        <>
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                    <Ledgerpage  />
                </div>
            </div>
        </>

    )
}

export default Ledger
