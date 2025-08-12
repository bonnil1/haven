import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { saveToSession, loadFromSession } from '../utils/sessionStorage';

const Lease5 = () => {

    const user_id = localStorage.getItem("user_id")
    const [photos, setPhotos] = useState([])
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("")
    const navigate = useNavigate();
    const titleWordLimit = 32;
    const descriptionWordLimit = 500;

    const form1 = loadFromSession("form1")
    const form2 = loadFromSession("form2")
    const form3 = loadFromSession("form3")
    const form41 = loadFromSession("form41")
    const [dateRanges, setDateRanges] = useState([{ id: uuidv4(), startDate: null, endDate: null }]);

    useEffect(() => {
        const stored2 = loadFromSession('form42');
        // Set dateRanges and ensure correct formatting
        if (stored2) {
        const converted = stored2.map((range) => ({
            ...range,
            id: range.id || uuidv4(),
            startDate: range.startDate ? new Date(range.startDate).toISOString().split("T")[0] : null,
            endDate: range.endDate ? new Date(range.endDate).toISOString().split("T")[0] : null,
        }));
        setDateRanges(converted);
        }
        console.log(stored2)
    }, []);

    const getWordCount = (str) => 
        str.trim().split(/\s+/).filter((word) => word.length > 0).length;

    const handlePhotoChange = (e) => {
        const files = Array.from(e.target.files);

        const newPhotos = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
            id: uuidv4(),
        }));

        setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]) 
    }

    const handleRemovePhoto = (id) => {
        setPhotos((prevPhotos) => {
            const updated = prevPhotos.filter((photo) => photo.id !== id)

            const removedPhoto = prevPhotos.find((photo) => photo.id === id)

            if (removedPhoto) {
                URL.revokeObjectURL(removedPhoto.preview);
            }

            return updated;
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

            setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleBeforeTitleInput = (e) => {
        const newChar = e.data || '';
        const inputValue = title;
        const cursorPos = e.target.selectionStart;

        const updatedText = inputValue.slice(0, cursorPos) + newChar + inputValue.slice(cursorPos);
        const words = updatedText.trim().split(/\s+/).filter(Boolean);

        if (words.length > titleWordLimit) {
            e.preventDefault();
          }
    }

    const handleBeforeDesInput = (e) => {
        const newChar = e.data || '';
        const inputValue = description;
        const cursorPos = e.target.selectionStart;

        const updatedText = inputValue.slice(0, cursorPos) + newChar + inputValue.slice(cursorPos);
        const words = updatedText.trim().split(/\s+/).filter(Boolean);

        if (words.length > descriptionWordLimit) {
            e.preventDefault();
          }
    }

    const titleWordCount = getWordCount(title)
    const descriptionWordCount = getWordCount(description)

    const slides = [
        {
            title: "Add some photos for your listing.",
        },
        {
            title: "Now, let's give your listing a title.",
        },
        {
            title: "Write a description for your listing."
        }
    ]

    const handleSubmit = async (event) => {
  
        event.preventDefault();

        try {
            const form = new FormData();

            form.append("title", title);
            form.append("description", description);
            photos.forEach((photo, index) => {
                form.append("photos", photo.file)
            });
            form.append("type", form1.type)
            form.append("space", form1.space)
            form.append("bathrooms", form1.bathrooms)
            form.append("bedrooms", form1.bedrooms)
            form.append("beds", form1.beds)
            form.append("guests", form1.guests)
            form.append("amenities", JSON.stringify(form2.amenities));
            form.append("furniture", JSON.stringify(form2.furniture));
            form.append("kitchen", JSON.stringify(form2.kitchen));
            form.append("safeties", JSON.stringify(form2.safeties));
            form.append("city", form3.city)
            form.append("country", form3.country)
            form.append("state", form3.state)
            form.append("street_address", form3.street_address)
            form.append("extra_info", form3.extra_info)
            form.append("postal_code", form3.postal_code)
            form.append("electric_fee", form41.electric_fee)
            form.append("rent", form41.rent)
            form.append("water_fee", form41.water_fee)
            form.append("dateRanges", JSON.stringify(dateRanges));
            form.append("user_id", user_id)

            {/* to check form info */}
            for (const [key, value] of form.entries()) {
                console.log(`${key}:`, value);
            }

            const response = await fetch("/api/property/submit", {
                //"/api/property/submit"
                //"http://localhost:4000/api/property/submit"
                method: "POST",
                body: form
            });

            if (!response.ok) {
                throw new Error("Failed to submit data");
            }

            const data = await response.json();
            console.log(data.message);

            if (data.message === "Property listing data saved.") {
                navigate('/lease-6')
            } 

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const stored = loadFromSession('form5');
        if (stored) setTitle(stored.title);
        if (stored) setDescription(stored.description);
        console.log(stored)
    }, []);
    
    const handleBack = (e) => {
        e.preventDefault();
        saveToSession('form5', {title, description});
    };

    return (
        <div className="flex justify-center font-nunito font-semibold text-slate-700 bg-lease-bg bg-cover bg-opacity-25">
        <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="relative w-10 flex flex-col items-center">
            <div className="absolute top-16 bottom-28 w-3 bg-white bg-opacity-70 rounded-md"/>
            {slides.map((_, index) => (
            <div key={index} className={`relative z-10 flex items-center justify-center w-10 h-10 mt-11 bg-red-400 text-white text-xl rounded-full
                ${photos.length > 3 ? "mb-[30rem]" : "mb-80"}`}>
                {index + 9}
            </div>
            ))}
            </div>
        {/* Slides */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-12 p-10">
            <div className="bg-white bg-opacity-70 p-10 pt-6 pb-6 rounded-lg shadow-md w-[42rem]">
                <h2 className="text-2xl font-semibold mb-1">Add some photos for your listing.</h2>
                <h4 className="text-lg font-light mb-4">You'll need to add 5 photos to get started. </h4>
                <div className={`transition-all duration-500 ease-in-out overflow-hidden w-full ${photos.length > 0 ? "h-16" : "aspect-[3/1]"}`}
                    onDrop={handleDrop} onDragOver={handleDragOver}
                    >
                    <label
                        htmlFor="file-upload"
                        className="w-full h-full flex items-center justify-center
                        text-lg font-medium text-stone-700
                        border border-stone-400 rounded-md bg-gray-150
                        hover:cursor-pointer hover:bg-[rgb(232,240,232)] hover:bg-opacity-40"
                    >
                        📁 Upload your images
                    </label>
                    <input
                        id="file-upload"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="hidden"
                    />
                </div>

                {photos.length > 0 && (
                    <div className="grid grid-cols-3 gap-4">
                    {photos.map((photo) => (
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

            <div className="bg-white bg-opacity-70 p-10 pt-6 pb-0 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-1">Write a description.</h2>
                <h4 className="text-lg font-light">Share what makes your place special.</h4>
                <textarea
                    className='border border-black border-opacity-30 focus:outline-[rgb(232,240,232)] rounded-md p-3 mt-4 text-sm w-full placeholder-gray-400 font-thin'
                    type="text" 
                    name="description"
                    value={description}
                    placeholder="Ex. 4 mins from subway J, M, N - Marcy Avenue (1 stop from Manhattan)"
                    rows='10'
                    onBeforeInput={handleBeforeDesInput}
                    onChange={handleDescriptionChange}
                    pattern="^[A-Za-z0-9 ]+$"
                    required
                >
                </textarea>
                <h4 className='text-sm text-gray-500 font-thin mt-2 mb-6'>{descriptionWordCount}/500 word count</h4>
            </div>

            <div className="bg-white bg-opacity-70 p-10 pt-6 pb-0 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-1">Now, let's give your listing a title.</h2>
                <h4 className="text-lg font-light">Keep it short & have fun with it - you can always change it later.</h4>
                <textarea
                    className='border border-black border-opacity-30 focus:outline-[rgb(232,240,232)] rounded-md p-3 mt-4 text-sm w-full placeholder-gray-400 font-thin'
                    type="text" 
                    name="title"
                    value={title}
                    placeholder="Ex. Cozy room near UC Davis"
                    rows='3'
                    onBeforeInput={handleBeforeTitleInput}
                    onChange={handleTitleChange}
                    pattern="^[A-Za-z0-9 ]+$"
                    required
                >
                </textarea>
                <h4 className='text-sm text-gray-500 font-thin mt-2 mb-6'>{titleWordCount}/32 word count</h4>
            </div>

            <div className='flex justify-between'>
                <button
                    className="text-white bg-[rgb(232,240,232)] bg-opacity-50 font-bold rounded-full w-1/4"
                    onClick={handleBack}
                >
                    <NavLink to="/lease-4">Back</NavLink>
                </button> 
                <button
                    className="text-[rgb(42,98,112)] bg-[rgb(232,240,232)] bg-opacity-50 font-bold rounded-full w-1/4"
                    type="submit"
                >
                {/* <NavLink to="/lease-5">Next</NavLink> */}
                Submit
                </button>  
            </div>
        </form>     
        </div>
        </div>
    )
}
export default Lease5