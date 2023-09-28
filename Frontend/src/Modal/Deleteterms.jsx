import React from 'react'
import { toast } from 'react-toastify'
import { deleteterms } from '../apicalls/Terms'

const Deleteterms = ({ showtermsdeleteModal, setShowtermsdeleteModal,id,render,setrender }) => {

    const handledelete=async()=>{
    const res=   await deleteterms(id)
    if(res.success){
        toast.success(res.message)
        setShowtermsdeleteModal(false)
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
                            Delete Terms&condition
                        </h5>
                            <button onClick={() => setShowtermsdeleteModal(false)} type='button' className='btn-close'   style={{ color: 'white', borderColor: 'white',cursor:'pointer' }} data-bs-dismiss='modal' aria-label='Close' ><i className='fas fa-times'></i></button>
                        </div>
                        <div className='modal-body'>
                            <p>Are you sure you want to delete this Terms&condition?</p>
                        </div>
                        <div className='modal-footer'>
                            <button onClick={() => setShowtermsdeleteModal(false)} type='button' className='btn btn-secondary'>
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

export default Deleteterms
