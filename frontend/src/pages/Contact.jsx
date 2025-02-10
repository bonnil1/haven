import React from 'react'

const Contact = () => {

    const handleSubmit = async (event) => {
        //code for handle submit
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
                    //placeholder="First Name"
                    //onChange={handleChange}
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
                    //placeholder="Last Name"
                    //onChange={handleChange}
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
                    //placeholder="Email Address"
                    //onChange={handleChange}
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
                    //onChange={(e) => setIssue(e.target.value)}
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
                    //placeholder="Enter description of your issue."
                    //onChange={handleChange}
                    pattern="^[A-Za-z ]+$"
                    required
                >
                </textarea>
            </div>
            <div className='flex flex-col mb-14'>
                <label className='text-xs text-slate-700 font-bold'>Attachments (optional)</label>
                <div className='flex flex-col items-center justify-center border border-green-700 border-opacity-30 rounded-md p-6 mt-2 text-center bg-[rgb(248,251,248)]'>
                    <label htmlFor="file-upload" className="cursor-pointer text-sm text-gray-700 font-semibold">
                        <span className='text-teal-700'>Add file</span> or drop file here
                    </label>
                    <input
                        id="file-upload"
                        className="hidden"
                        type="file"
                        name="attachment"
                        //onChange={handleUpload}
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
            
        </form>
        </div>
    </div>
  )
}

export default Contact