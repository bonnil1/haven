import React from 'react'

const Signup = () => {
  return (
    <div className='flex justify-center items-center mt-20'>
        <form className='flex flex-col border border-slate-400 rounded-3xl w-5/6 sm:w-1/3 p-8 sm:p-16'>
            <h3 className='text-2xl text-slate-700 font-semibold mb-5'>Join Haven</h3>
            <div>
                <div className='flex flex-col mb-5'>
                    <label>Name</label>
                    <input
                        className="border border-slate-300 focus:outline-slate-500 rounded-md p-1 mt-2" 
                        type="text" 
                        placeholder="Your Name"
                        
                    >
                    </input>
                </div>
                <div className='flex flex-col'>
                    <label>Email</label>
                    <input
                        className="border border-slate-300 focus:outline-slate-500 rounded-md p-1 mt-2"
                        type="text" 
                        placeholder="Example@email.com"
                        pattern="^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z]{2,}$"
                    >
                    </input>
                </div>
                <button
                    className="bg-slate-700 hover:bg-slate-500 text-white py-2 border rounded-xl w-full mt-5"
                    type="submit"
                >
                    Continue
                </button>
            </div>    
            <h6 className='flex justify-center text-xs mt-2'>Already have an account? Log in.</h6>
        </form>
    </div>
  )
}

export default Signup