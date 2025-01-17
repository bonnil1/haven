import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ListProperty = () => {
    
    const [property, setProperty] = useState('');
    const [name, setName] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [bedrooms, setBedrooms] = useState('1');
    const [bathrooms, setBathrooms] = useState('1');
    const [price, setPrice] = useState('');

    const navigate = useNavigate();

    const submitForm = (e) => {
        e.preventDefault();

        const newRequest = {
        property,  
        name: {
            contactEmail,
            contactPhone,
        },  
        state,
        city,
        bedrooms,
        bathrooms,
        price,
        };
    }

    return (
        <section className='bg-white'>
        <div className='container m-auto max-w-2xl '>
        <div className='bg-white px-6 py-8 shadow-md rounded-md border md:m-0'>
          <form onSubmit={submitForm}>
            <h2 className='text-3xl text-center font-semibold mb-6'>List Your Property</h2>
            <h3 className='flex justify-center text-lg mb-8'>Fill out the form below to start listing your property.</h3>
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
                    value={property}
                    onChange={(e) => setProperty(e.target.value)}
                    required
                >
                    <option value='' disabled selected>Select Property Type</option>
                    <option value='Apartment'>Apartment</option>
                    <option value='Entire Home'>Entire Home</option>
                    <option value='Hotel'>Hotel</option>
                    <option value='Private Room'>Private Room</option>
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
                className='border rounded w-full py-2 px-3 focus:outline-slate-500'
                placeholder='Full Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                pattern='^[A-Za-z ]+$'
                required
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
                className='border rounded w-full py-2 px-3 focus:outline-slate-500'
                placeholder='Email Address'
                title='Example@email.com'
                pattern='^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z]{2,}$'
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                required
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
                className='border rounded w-full py-2 px-3 focus:outline-slate-500'
                placeholder='Phone Number'
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                required
              />
              </div>
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
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
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
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              >
                <option value='' disabled>Select One</option>
                {/*populate city with api based on state selected */}
              </select>
              </div>
            </div>

            <div className='mb-4 flex space-x-4'>
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
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                    required
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
                    Number of Bathrooms
                </label>
                <select
                    id='bathrooms'
                    name='bathrooms'
                    className='border rounded w-full py-2 px-3'
                    value={bathrooms}
                    onChange={(e) => setBathrooms(e.target.value)}
                    required
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
                htmlFor='price'
                className='block text-gray-700 font-bold mb-2'
              >
                Price
              </label>
              <input
                type='text'
                id='price'
                name='price'
                className='border rounded w-full py-2 px-3 focus:outline-slate-500'
                placeholder='Price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            </div>

            <div>
              <button
                className='bg-slate-700 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded-xl w-full focus:outline-none focus:shadow-outline'
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

export default ListProperty