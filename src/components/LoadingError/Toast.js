import React from 'react'
import { ToastContainer, toast } from 'react-toastify';


const Toast = () => {
  return (
    <div>
        <ToastContainer
        position="top-right"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        />

       {/* same as  */}
       <ToastContainer />
    </div>
  )
}

export default Toast