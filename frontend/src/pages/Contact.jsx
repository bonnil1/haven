import React from 'react'
import { useState } from 'react'

const Contact = () => {

    const [formData, setFormData] = useState({
        FirstName: '',
        LastName: '',
        Email: '',
        Issue: '',
        Description: '',
        Attachment: null
    })

    const [message, setMessage] = useState('')

    const handleChange = (event) => {
        if (event.target.name === 'Attachment') {
            setFormData({ ...formData,[event.target.name]: event.target.files[0]});
        } else {
            setFormData(prevState => {
                const updatedFormData = {...prevState,[event.target.name]: event.target.value};

                return updatedFormData;
            })
        }

        //console.log(formData)
    }
      
    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = new FormData();

        for (const key in formData) {
            if (key === 'Attachment') {
                if (formData[key]) {
                    form.append('Attachment', formData[key]);
                }
            } else {
                form.append(key, formData[key]);
            }
        }
        

        try {
            const response = await fetch("http://localhost:4000/api/contactus", {
                //"http://192.168.49.2:31560/api/contactus"
                //"/api/contactus"
                //"http://localhost:4000/api/contactus"
                method: "POST",
                body: form
            });

            const data = await response.json();

            if (data.message === "Customer support email sent successfully!") {
                setMessage(data.message);
            } 
        } catch (error) {
            console.error(error);
            setMessage("An error occurred while sending customer support email.");
        }
    }

  return (
    <div className='flex flex-col justify-center items-center mt-10 mb-10'>
        <div className='w-full sm:w-2/5'>
        <form onSubmit={handleSubmit} className='bg-[rgb(248,251,248)] border shadow-lg rounded-xl px-20 pt-16 pb-8'>
            <h1 className='font-nunito font-bold text-teal-800 text-4xl mb-12'>Contact Haven Support</h1>
            <div className='flex flex-col mb-5'>
                <label className='text-xs text-slate-700 font-bold'>First Name <span className='text-red-500'>*</span></label>
                <input
                    className="border border-green-700 border-opacity-30 focus:outline-slate-500 rounded-md p-1 mt-2 bg-[rgb(248,251,248)]" 
                    type="text" 
                    name="FirstName"
                    onChange={handleChange}
                    pattern="^[A-Za-z ]+$"
                    required
                >
                </input>
            </div>
            <div className='flex flex-col mb-5'>
                <label className='text-xs text-slate-700 font-bold'>Last Name <span className='text-red-500'>*</span></label>
                <input
                    className="border border-green-700 border-opacity-30 focus:outline-slate-500 rounded-md p-1 mt-2 bg-[rgb(248,251,248)]" 
                    type="text" 
                    name="LastName"
                    onChange={handleChange}
                    pattern="^[A-Za-z ]+$"
                    required
                >
                </input>
            </div>
            <div className='flex flex-col mb-5'>
                <label className='text-xs text-slate-700 font-bold'>Email Address <span className='text-red-500'>*</span></label>
                <input
                    className='border border-green-700 border-opacity-30 focus:outline-slate-500 rounded-md p-1 mt-2 bg-[rgb(248,251,248)]'
                    type="text" 
                    name="Email"
                    onChange={handleChange}
                    pattern="^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z]{2,}$"
                    required
                >
                </input>
            </div>
            <div className='flex flex-col mb-5'>
                <label className='text-xs text-slate-700 font-bold'>Please choose your issue below <span className='text-red-500'>*</span></label>
                <select
                    className='border border-green-700 border-opacity-30 focus:outline-slate-500 rounded-md p-1.5 mt-2 bg-[rgb(248,251,248)]'
                    name='Issue'
                    onChange={handleChange}
                    required
                >
                    <option value='' selected></option>
                    <option value='Issue1'>Issue 1</option>
                    <option value='Issue2'>Issue 2</option>
                    <option value='Issue3'>Issue 3</option>
                </select>
                </div>
            <div className='flex flex-col mb-5'>
                <label className='text-xs text-slate-700 font-bold'>Description <span className='text-red-500'>*</span></label>
                <textarea
                    className='border border-green-700 border-opacity-30 focus:outline-slate-500 rounded-md p-1 mt-2 text-xs bg-[rgb(248,251,248)]'
                    type="text" 
                    name="Description"
                    rows='5'
                    onChange={handleChange}
                    pattern="^[A-Za-z ]+$"
                    required
                >
                </textarea>
            </div>
            <div className='flex flex-col mb-7'>
                <label className='text-xs text-slate-700 font-bold'>Attachments (optional)</label>
                <div className='flex flex-col items-center justify-center border border-green-700 border-opacity-30 rounded-md p-6 mt-2 text-center bg-[rgb(248,251,248)]'>
                    <label htmlFor="file-upload" className="cursor-pointer text-sm text-gray-700 font-semibold">
                        <span className='text-teal-700'>Add file</span> or drop file here
                    </label>
                    <input
                        id="file-upload"
                        className="hidden"
                        type="file"
                        name="Attachment"
                        accept=".png,.jpg,.jpeg,.pdf,.docx"
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className='flex justify-center'>
                <button 
                className='bg-[rgb(250,112,99)] rounded-xl text-white font-bold text-sm px-14 py-1'
                type="submit"
            >
                Send
            </button>
            </div>
            {message === "Customer support email sent successfully!" && (
                <h4 className='flex justify-center text-xs text-teal-800 text-bold mt-5'>Support is on the way! Someone will reach out within 24 hours.</h4>
            )}
        </form>
        </div>
    </div>
  )
}

export default Contact