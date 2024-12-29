import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

const HousingRequest = () => {

    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [reason, setReason] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [guests, setGuests] = useState('1');
    const [bedrooms, setBedrooms] = useState('1');
    const [property, setProperty] = useState('');
    const [budget, setBudget] = useState('');
    const [name, setName] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactPhone, setContactPhone] = useState('');

    const navigate = useNavigate();

    const submitForm = (e) => {
        e.preventDefault();

        const newRequest = {
        startDate,
        endDate, 
        reason,
        state,
        city,
        guests,
        bedrooms,
        property,
        budget,
        name: {
            contactEmail,
            contactPhone,
        },
        };
    }

    return (
        <section className='bg-white'>
        <div className='container m-auto max-w-2xl py-8'>
        <div className='bg-slate-100 px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <form onSubmit={submitForm}>
            <h2 className='text-3xl text-center font-semibold mb-6'>Housing Request</h2>
            <h3 className='flex justify-center text-lg mb-8'>Fill out the form below and we'll have homeowners reach out to you!</h3>
            <div className='mb-4 flex space-x-4'>
              <div className='flex-1'>  
              <label
                htmlFor='move-in'
                className='text-gray-700 font-bold '
              >
                Move-In Date
              </label>
              <DatePicker
                    selectsStart
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    startDate={startDate}
                    placeholderText="Check in"
                    className="border rounded w-full py-2 px-3 mt-2"
              />  
              </div>
              <div className='flex-1'>  
              <label
                htmlFor='move-out'
                className='text-gray-700 font-bold '
              >
                Move-Out Date
              </label>  
              <DatePicker
                    selectsEnd
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    endDate={endDate}
                    startDate={startDate}
                    minDate={startDate}
                    placeholderText="Check out"
                    className="border rounded w-full py-2 px-3 mt-2"
              />
              </div>
            </div>

            <div className='mb-4'>
              <label
                htmlFor='reason'
                className='block text-gray-700 font-bold mb-2'
              >
                Reason for Travel
              </label>
              <select
                id='reason'
                name='reason'
                className='border rounded w-full py-2 px-3'
                required
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              >
                <option value='' disabled selected>Select One</option>
                <option value='Digital Nomad'>Digital Nomad</option>
                <option value='Student'>Student</option>
                <option value='Traveling Healthcare'>Traveling Healthcare</option>
                <option value='Work'>Work</option>
              </select>
            </div>

            <div className='mb-4 flex space-x-4'>
              <div className='flex-1'>  
              <label
                htmlFor='state'
                className='block text-gray-700 font-bold mb-2'
              >
                State
              </label>
              <select
                id='state'
                name='state'
                className='border rounded w-full py-2 px-3'
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                <option value='' disabled selected>Select One</option>
                <option value='California'>California</option>
                <option value='Maui'>Maui</option>
                <option value='Oahu'>Oahu</option>
              </select>
              </div>
              <div className='flex-1'>  
              <label
                htmlFor='city'
                className='block text-gray-700 font-bold mb-2'
              >
                City
              </label>  
              <select
                id='city'
                name='city'
                className='border rounded w-full py-2 px-3'
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                <option value='' disabled>Select One</option>
                {/*populate city with api based on state selected */}
              </select>
              </div>
            </div>

            <div className='mb-4 flex space-x-4'>
            <div className='flex-1'>
              <label
                htmlFor='guests'
                className='block text-gray-700 font-bold mb-2'
              >
                Number of Guests
              </label>
              <select
                id='guests'
                name='guests'
                className='border rounded w-full py-2 px-3'
                required
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
              >
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4+</option>
              </select>
            </div>
            <div className='flex-1'>
              <label
                htmlFor='type'
                className='block text-gray-700 font-bold mb-2'
              >
                Number of Bedrooms
              </label>
              <select
                id='bedrooms'
                name='bedrooms'
                className='border rounded w-full py-2 px-3'
                required
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
              >
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4+</option>
              </select>
            </div>
            </div>

            <div className='mb-4 flex space-x-4'>
            <div className='flex-1'>
              <label
                htmlFor='property'
                className='block text-gray-700 font-bold mb-2'
              >
                Property Type
              </label>
              <select
                id='property'
                name='property'
                className='border rounded w-full py-2 px-3'
                required
                value={property}
                onChange={(e) => setProperty(e.target.value)}
              >
                <option value='' disabled selected>Select Property Type</option>
                <option value='Apartment'>Apartment</option>
                <option value='Entire Home'>Entire Home</option>
                <option value='Hotel'>Hotel</option>
                <option value='Private Room'>Private Room</option>
              </select>
            </div>
            <div className='flex-1'>
              <label
                htmlFor='budget'
                className='block text-gray-700 font-bold mb-2'
              >
                Budget
              </label>
              <select
                id='budget'
                name='budget'
                className='border rounded w-full py-2 px-3'
                required
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              >
                <option value='' disabled selected>Select One</option>
                <option value='$1200-$1600'>$1200-$1600</option>
                <option value='$1600-$2000'>$1600-$2000</option>
                <option value='$2000-$2400'>$2000-$2400</option>
              </select>
            </div>
            </div>

            <div className='mb-4'>
              <label
                htmlFor='name'
                className='block text-gray-700 font-bold mb-2'
              >
                First and Last Name
              </label>
              <input
                type='text'
                id='name'
                name='name'
                className='border rounded w-full py-2 px-3'
                placeholder='Full Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className='mb-4 flex space-x-4'>
              <div className='flex-1'>
              <label
                htmlFor='contact_email'
                className='block text-gray-700 font-bold mb-2'
              >
                Contact Email
              </label>
              <input
                type='email'
                id='contact_email'
                name='contact_email'
                className='border rounded w-full py-2 px-3'
                placeholder='Email Address'
                required
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
              />

              </div>
              <div className='flex-1'>
              <label
                htmlFor='contact_phone'
                className='block text-gray-700 font-bold mb-2'
              >
                Contact Phone
              </label>
              <input
                type='tel'
                id='contact_phone'
                name='contact_phone'
                className='border rounded w-full py-2 px-3'
                placeholder='Phone Number'
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
              />
              </div>
            </div>  

            <div>
              <button
                className='bg-blue-500 hover:text-teal-200 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
                type='submit'
              >
                Send Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
    )
}


export default HousingRequest