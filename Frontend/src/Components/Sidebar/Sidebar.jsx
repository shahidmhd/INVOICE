import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBSidebarFooter,
} from 'cdbreact';
import { setLogout } from '../../Redux/Authslice';
import Addbank from '../../Modal/Addbank';
import AddTerms from '../../Modal/AddTerms';


const Sidebar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setmodal] = useState(false);
  const [modalOpenterms, setmodalOpenterms] = useState(false);
  const togglemodal = () => {
    setmodal(!modalOpen)
  }

  const togglemodalterms = () => {
    setmodalOpenterms(!modalOpenterms)
  }
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handlelogout = () => {
    // localStorage.removeItem('token')
    dispatch(setLogout())
    // navigate('/login')
  }

  const handleHomeClick = () => {
    navigate('/')
  }

  const handleClientsClick = () => {
    navigate('/company')
  };

  const handleServicesClick = () => {
    // Code to handle click on "Services" menu item
    navigate('/Service')
  };

  const handleInvoiceClick = () => {
    // Code to handle click on "Invoice" menu item
    navigate('/invoice')
  };

  const handleInvoictableclick = () => {
    navigate('/table')
  }


  const handleReportclick = () => {
    navigate('/Report')
  }

  const handlechangepassword = () => {
    navigate('/change-password')
  }


  const handleEstimateclick = () => {
    navigate('/estimate')
  }

  const handleEstimateDetailsclick = () => {
    navigate('/estimatedetails')
  }

  const handleledgerClick=()=>{
    navigate('/ledger')
  }



  return (
    <div style={{ height: '100vh', position: 'sticky', top: 0 }}>
      <CDBSidebar>
        <CDBSidebarHeader prefix={<i className="fa fa-bars" />}
          style={{ cursor: 'pointer' }} ><span onClick={handleHomeClick}>Home</span></CDBSidebarHeader>
        <CDBSidebarContent>
          <CDBSidebarMenu>
            {/* Add onClick handlers to each SidebarMenuItem */}
            <CDBSidebarMenuItem icon="th-large" onClick={handleClientsClick}>
              Company
            </CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon="th-large" onClick={handleServicesClick}>
              Services
            </CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon="file-invoice" iconType="solid" onClick={handleInvoiceClick}>
              Create Invoice
            </CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon="chart-bar" iconType="solid" onClick={handleInvoictableclick}>
              Invoice Details
            </CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon="th-large" onClick={handleReportclick}>
              Invoice Report
            </CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon="th-large" onClick={handleEstimateclick}>
              Estimate
            </CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon="th-large" onClick={handleEstimateDetailsclick}>
              Estimate Details
            </CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon="th-large" onClick={handleledgerClick}>
              ledger
            </CDBSidebarMenuItem>
          </CDBSidebarMenu>
        </CDBSidebarContent>



        <div className="sidebar-btn-wrapper" style={{ padding: '20px 5px' }}>
          <CDBSidebarMenu>
            <div>
              <CDBSidebarMenuItem icon="cog" iconType="solid" onClick={toggleDropdown}>
                Settings
              </CDBSidebarMenuItem>

              {dropdownOpen && (
                <>
                  <CDBSidebarMenuItem icon="university" iconType="solid" onClick={togglemodal} >
                    Add Bank Account
                  </CDBSidebarMenuItem>
                  <CDBSidebarMenuItem icon="plus" iconType="solid" onClick={togglemodalterms} >
                    Terms &condition
                  </CDBSidebarMenuItem>
                  <CDBSidebarMenuItem icon="lock" iconType="solid" onClick={handlechangepassword}>
                    change password
                  </CDBSidebarMenuItem>
                  <CDBSidebarMenuItem icon="sign-out-alt" iconType="solid" onClick={handlelogout} >
                    logout
                  </CDBSidebarMenuItem>
                </>

              )}
            </div>
            {/* <CDBSidebarMenuItem icon="credit-card" iconType="solid" onClick={handlelogout} >
              logout
            </CDBSidebarMenuItem> */}
          </CDBSidebarMenu>
        </div>

      </CDBSidebar>
      {modalOpen && <Addbank modalOpen={modalOpen} setmodal={setmodal} />}
      {modalOpenterms && <AddTerms modalOpenterms={modalOpenterms} setmodalOpenterms={setmodalOpenterms} />}
    </div>
  );
};

export default Sidebar;
