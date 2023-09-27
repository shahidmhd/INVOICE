import React from 'react'

import { toast } from 'react-toastify'
import { deletebank } from '../apicalls/Bank'

const Deletebank = ({ showdeleteModal, setShowdeleteModal,id,render,setrender }) => {

    const handledelete=async()=>{
    const res=   await deletebank(id)
    if(res.success){
        toast.success(res.message)
        setShowdeleteModal(false)
        setrender(!render)
    }else{
        toast.error(res.message)
    }  
    }
    return (
        <>
            <div className='modal show' tabIndex='-1' style={{ display: 'block' }}>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header' style={{ backgroundColor: 'black' }}>
                        <h5 className='modal-title' id='staticBackdropLabel' style={{ color: 'white' }}>
                            Delete account
                        </h5>
                            <button onClick={() => setShowdeleteModal(false)} type='button' className='btn-close'   style={{ color: 'white', borderColor: 'white',cursor:'pointer' }} data-bs-dismiss='modal' aria-label='Close' ><i className='fas fa-times'></i></button>
                        </div>
                        <div className='modal-body'>
                            <p>Are you sure you want to delete this account?</p>
                        </div>
                        <div className='modal-footer'>
                            <button onClick={() => setShowdeleteModal(false)} type='button' className='btn btn-secondary'>
                                Cancel
                            </button>
                            <button onClick={() =>handledelete()} type='button' className='btn btn-danger' >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Deletebank
