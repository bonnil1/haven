import React from 'react'
import { useState } from 'react'
import { MdMarkEmailRead } from "react-icons/md";

const Email = () => {

    const Email = localStorage.getItem("email")
    const FirstName = localStorage.getItem("firstname")

    const [message, setMessage] = useState('')

    const handleResend = async (event) => {
        event.preventDefault()

        try {
            const response = await fetch("/api/new-user-resend", {
                //"/api/new-user-resend"
                //"http://localhost:4000/api/new-user-resend"
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({Email, FirstName})
            })

            const data = await response.json();

            if (data.message === "Email resent successfully!") {
                setMessage(data.message);
            } 
            //error handling statement for if email does not resend successfully
        } catch (error) {
            console.error(error);
            console.log("An error occurred while resending the email.");
        }
    };

    return (
    <div className='flex justify-center items-center'>
        <div className='flex flex-col border rounded-3xl shadow-xl bg-[rgb(248,251,248)] mt-20 font-roboto w-5/6 sm:w-1/2 p-8 sm:p-16 sm:px-20 items-center'>
            <h3 className='text-3xl text-[rgb(48,92,112)] mb-5'>Please verify your email</h3>
            <h4>We just sent an email to {Email}.</h4>
            <h4>Click on the link in your email to complete your signup.</h4>
            <h3><MdMarkEmailRead className='size-28 text-slate-700 m-5'/></h3>
            <h5>Can't find the email? No Problem.</h5>
            <button 
                className='bg-[rgb(42,98,112)] hover:bg-teal-900 text-white py-2 border rounded-xl w-1/2 mt-5'
                onClick={handleResend}
            >
                Resend Verification Email
            </button>
            {message === "Email resent successfully!" && (
                    <h4 className='flex justify-center text-xs text-teal-600 mt-2'>Verification email resent successfully!</h4>
                )}
        </div>
    </div>
    )
}

export default Email