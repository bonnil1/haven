import React from 'react'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

const Contact = () => {

    const user_id = localStorage.getItem("user_id")

    const [formData, setFormData] = useState({
        FirstName: localStorage.getItem("firstname") || "",
        LastName: localStorage.getItem("lastname") || "",
        Email: localStorage.getItem("email") || "",
        Issue: '',
        Description: '',
        attachments: []
    })

    const [message, setMessage] = useState('')

    const handleChange = (event) => {

        const { name, type, value, files } = event.target;
        
        if (type === 'file') {
            if (!files) return;

            const fileArray = Array.from(files)

            const newPhotos = fileArray.map((file) => ({
                file, 
                preview: URL.createObjectURL(file),
                id: uuidv4()
            }))

            setFormData(prevFormData => {
                const existing = prevFormData.attachments || [];

                const combined = [...existing, ...newPhotos]

                return {
                    ...prevFormData,
                    attachments: combined
                }
            })
        } else {
            setFormData(prevState => {
                const updatedForm = {...prevState, [event.target.name]: event.target.value}

                return updatedForm
            })
        }
    }

    const handleRemovePhoto = (id) => {
        setFormData(prevFormData => {
            
            const removedPhoto = prevFormData.attachments.find(file => file.id === id);
            
            if (removedPhoto) {
                URL.revokeObjectURL(removedPhoto.preview);
            }
            
            const updated = prevFormData.attachments.filter(file => file.id != id);
        
            return {
                ...prevFormData,
                attachments: updated
            }
        })
    }

    const handleDrop = (event) => {
        event.preventDefault();
        event.stopPropagation();

        const droppedFiles = event.dataTransfer.files;

        if (droppedFiles && droppedFiles.length > 0) {
            const files = Array.from(droppedFiles);

            const newPhotos = files.map((file) => ({
                file,
                preview: URL.createObjectURL(file),
                id: uuidv4(),
            }));

            setFormData(prevFormData => ({
                ...prevFormData,
                attachments: [...prevFormData.attachments, ...newPhotos]
            }));
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };
      
    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = new FormData();

        for (const key in formData) {
            if (key === 'attachments') {
                if (formData[key] && formData[key].length > 0) {
                    formData[key].forEach(({ file }) => {
                        form.append('attachments', file);
                    });
                }
            } else {
                form.append(key, formData[key]);
            }
        }

        try {
            const response = await fetch("/api/contactus", {
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
    <div className='font-nunito text-slate-700'>
        <div className='grid grid-cols-[25%_75%]'>
            <div className='flex flex-col bg-gray-100 min-h-screen'>
                <div className='mx-8'>
                    <h1 className='text-2xl font-medium mt-8'>Contact Haven Support</h1>
                    <div className='flex flex-col bg-white rounded-lg shadow-md my-5 p-5'>
                        <h3>A Haven representative will get back to you in 24 hours. In the meantime, please visit our FAQs page.</h3>
                    </div>
            
                    <div className='flex flex-col bg-white rounded-lg shadow-md my-8 p-5 space-y-1'>
                        <h1 className='text-lg'>How to Rent in 7 Easy Steps</h1>
                        <hr className="my-2 border-green-700 border-opacity-30"/>
                        <h3 className='text-sm'>Step 1) Get Verified</h3>
                        <h3 className='text-sm'>Step 2) Search for an apartment</h3>
                        <h3 className='text-sm'>Step 3) Look through details</h3>
                        <h3 className='text-sm'>Step 4) Send inquiry</h3>
                        <h3 className='text-sm'>Step 5) Chat with host</h3>
                        <h3 className='text-sm'>Step 6) Sign contract</h3>
                        <h3 className='text-sm'>Step 7) Confirm payment</h3>
                    </div>
                </div>
            </div>  
            <div className='flex flex-col bg-gray-100 min-h-screen'>
                <form onSubmit={handleSubmit} className='bg-white border shadow-lg rounded-xl px-10 lg:px-24 py-8 mx-8 my-20'>
                    <h1 className='text-md font-bold mb-5'>We're here to help! Let us know what your issue.</h1>
                    <div className='flex flex-col md:flex-row justify-between gap-4 mb-5'>
                        <div className='flex flex-col flex-1'>
                            <label className='text-xs text-slate-700 font-bold'>First Name <span className='text-red-500'>*</span></label>
                            <input
                                className="border border-opacity-30 focus:outline-slate-500 rounded-md p-1 mt-2 bg-gray-100 w-full" 
                                type="text" 
                                name="FirstName"
                                value={formData.FirstName}
                                onChange={handleChange}
                                pattern="^[A-Za-z ]+$"
                                required
                            >
                            </input>
                        </div>
                        <div className='flex flex-col flex-1'>
                            <label className='text-xs text-slate-700 font-bold'>Last Name <span className='text-red-500'>*</span></label>
                            <input
                                className="border border-opacity-30 focus:outline-slate-500 rounded-md p-1 mt-2 bg-gray-100 w-full" 
                                type="text" 
                                name="LastName"
                                value={formData.LastName}
                                onChange={handleChange}
                                pattern="^[A-Za-z ]+$"
                                required
                            >
                            </input>
                        </div>
                        <div className='flex flex-col flex-1'>
                            <label className='text-xs text-slate-700 font-bold'>Email Address <span className='text-red-500'>*</span></label>
                            <input
                                className='border border-opacity-30 focus:outline-slate-500 rounded-md p-1 mt-2 bg-gray-100 w-full'
                                type="text" 
                                name="Email"
                                value={formData.Email}
                                onChange={handleChange}
                                pattern="^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z]{2,}$"
                                required
                            >
                            </input>
                        </div>
                    </div>
                <div className='flex flex-col mb-5'>
                    <label className='text-xs text-slate-700 font-bold'>Please choose your issue below <span className='text-red-500'>*</span></label>
                    <select
                        className='border border-opacity-30 focus:outline-slate-500 rounded-md p-1.5 mt-2 bg-gray-100 text-xs'
                        name='Issue'
                        onChange={handleChange}
                        required
                    >
                        <option value=''>-- Please select an issue --</option>
                        <option value='Fraud'>Fraud & Scam Concerns.</option>
                        <option value='Listing'>Listing Issues.</option>
                        <option value='Payment'>Payment Issues.</option>
                        <option value='Policy'>Platform Policy Disputes.</option>
                        <option value='Safety'>Safety & Security Concerns.</option>
                        <option value='Technical'>Technical Issues.</option>
                        <option value='Other'>Other.</option>
                    </select>
                </div>
                <div className='flex flex-col mb-5'>
                    <label className='text-xs text-slate-700 font-bold'>Description <span className='text-red-500'>*</span></label>
                    <textarea
                        className='border border-opacity-30 focus:outline-slate-500 rounded-md p-1 mt-2 bg-gray-100 text-xs'
                        type="text" 
                        name="Description"
                        rows='3'
                        onChange={handleChange}
                        pattern="^[A-Za-z0-9 ]+$"
                        required
                    >
                    </textarea>
                </div>
                <div className='flex flex-col mb-7'>
                    <label className='text-xs text-slate-700 font-bold'>Attachments (optional)</label>
                    <div className='flex flex-col items-center justify-center border border-opacity-30 rounded-md py-4 mt-2 text-center bg-gray-100'
                        onDrop={handleDrop} onDragOver={handleDragOver}
                    >
                        <label 
                            htmlFor="file-upload"
                            className="cursor-pointer text-sm text-gray-700 font-semibold"
                            >
                            <span className='text-teal-700'>Add file</span> or drop file here
                        </label>
                        <input
                            id="file-upload"
                            className="hidden"
                            type="file"
                            name="attachments"
                            accept=".png,.jpg,.jpeg,.pdf,.docx"
                            onChange={handleChange}
                            multiple
                        />
                    </div>

                    {formData.attachments.length > 0 && (
                        <div className="grid grid-cols-3 gap-4 mt-3">
                        {formData.attachments.map((photo) => (
                            <div key={photo.id} className="relative group">
                                <img
                                    src={photo.preview}
                                    alt="Preview"
                                    className="w-full h-40 object-cover rounded border"
                                />
                                <button
                                    onClick={() => handleRemovePhoto(photo.id)}
                                    className="absolute top-2 right-2 bg-gray-400 text-white rounded-full py-1 px-2 text-xs opacity-0 group-hover:opacity-100 transition"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                        </div>
                    )}
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
                    <h4 className='flex justify-center text-xs text-teal-800 font-bold mt-5'>Support is on the way! Someone will reach out within 24 hours.</h4>
                )}
            </form>

            </div>  
        </div>
    </div>

  )
}

export default Contact