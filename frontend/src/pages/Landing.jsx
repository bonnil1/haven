import React from 'react'
import Search from '../components/Search'

const Landing = ({closeMenu}) => {


    return (
        <div>
            <div className='bg-custom-image-5 bg-cover bg-center h-screen font-nunito'>
                {/*Laptop View*/}    
                <div className="hidden md:block">
                <div className="flex justify-center">
                    <div className="bg-white shadow-md rounded-full border sm:m-28">
                        <Search />
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Landing