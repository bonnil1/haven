import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { saveToSession, loadFromSession } from '../utils/sessionStorage';

const Lease5 = () => {

    const [photos, setPhotos] = useState([])
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("")
    const navigate = useNavigate();
    const titleWordLimit = 32;
    const descriptionWordLimit = 500;

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

            {/* to check form info */}
            for (const [key, value] of form.entries()) {
                console.log(`${key}:`, value);
            }

            const response = await fetch("/api/lease-4", {
                //"/api/lease-4"
                //"http://localhost:4000/api/lease-4"
                method: "POST",
                body: form
            });

            if (!response.ok) {
                throw new Error("Failed to submit data");
            }

            const data = await response.json();
            console.log(data.message);

            if (data.message === "Lease 4 submitted successfully.") {
                setMessage(data.message);
                navigate('/lease-5')
            } 

        } catch (error) {
            console.error(error);
        }
    }

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
                    className="text-white text-opacity-70 bg-[rgb(232,240,232)] bg-opacity-30 font-bold rounded-full w-1/4"
                >
                    <NavLink to="/lease-4">Back</NavLink>
                </button> 
                <button
                    className="text-white bg-[rgb(232,240,232)] bg-opacity-50 font-bold rounded-full w-1/4"
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