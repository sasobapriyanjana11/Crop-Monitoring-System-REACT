import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCrop, saveCrop, removeCrop } from "../reducers/CropSlice.tsx";
import { RootState } from "../store/store.ts";
import {Crop} from "../models/Crop.ts";

export const CropForm=()=> {

    const dispatch = useDispatch();
    const [cropCode, setCropCode] = useState("");
    const [commonName, setCropCommonName] = useState("");
    const [scientificName, setCropScientificName] = useState("");
    const [category, setCategory] = useState("");
    const [cropSeason, setCropSeason] = useState("");
    const [fieldCode, setFieldCode] = useState("");
    const [image, setCropImage] = useState("");
    const crops = useSelector((state: RootState) => state.crops.crops);

    // State for managing modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Handlers
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    //add crop
    function AddCrop(e:React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        const newCrop = {cropCode, commonName, scientificName, image, category, cropSeason, fieldCode};
        dispatch(saveCrop(newCrop));
        console.log(newCrop);
        alert("Crop was added Successfully!!.");
        clear();
        closeModal();
    }
    function UpdateCrop(){
        const updatedCrops = {cropCode, commonName,scientificName,image,category,cropSeason,fieldCode};
        dispatch(updateCrop(updatedCrops));
        console.log(updatedCrops);
        alert("Update crop successfully!");
        clear();
        closeModal();
    }
    function clear(){
        setCropCode("");
        setCropCommonName("");
        setCropScientificName("");
        setCategory("");
        setCropImage("");
        setCropSeason("");
        setFieldCode("");
        setCropImagePreview("");
    }
    //delete crop
    function DeleteCrop(cropCode:string){
        alert("Crop was deleted Successfully!");
        dispatch(removeCrop(cropCode));
        closeModal();
    }
    //update crop
    function handleRowClick(crop:Crop){
        setCropCode(crop.cropCode);
        setCropCommonName(crop.commonName);
        setCropScientificName(crop.scientificName);
        setCropImage(crop.image);
        setCategory(crop.category);
        setCropSeason(crop.cropSeason);
        setFieldCode(crop.fieldCode);
        openModal();
    }
    // image preview
    const [cropImagePreview, setCropImagePreview] = useState("");
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setCropImagePreview(event.target.result);
            };
            reader.readAsDataURL(file);
            setCropImage(file);
        } else {
            setCropImagePreview("");
        }
    };

    return (
        <>
            {/* Main Content */}
            <div className="col-span-12 lg:col-span-10 p-4 fixed top-[60px] w-[calc(100%-260px)] left-[250px] min-h-[calc(100vh-60px)] bg-[#f5f5f5] overflow-y-auto">
                <h1 className="text-2xl font-bold text-center my-4">Crop Management</h1>

                <div className="flex justify-between items-center mb-3">
                    <input
                        type="text"
                        className="form-input w-1/2 border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Search Crop"
                    />
                    <button
                        onClick={openModal}
                        className="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:ring-2 focus:ring-green-400"
                    >
                        <i className="fa fa-plus"></i>
                        Add Crop
                    </button>
                </div>

                <table className="table-auto w-full border border-gray-300">
                    <thead className="bg-gray-200 text-green-700">
                    <tr>
                        <th className="px-4 py-2 border">Select</th>
                        <th className="px-4 py-2 border">Crop Code</th>
                        <th className="px-4 py-2 border">Common Name</th>
                        <th className="px-4 py-2 border">Scientific Name</th>
                        <th className="px-4 py-2 border">Category</th>
                        <th className="px-4 py-2 border">Season</th>
                        <th className="px-4 py-2 border">Field Code</th>
                        <th className="px-4 py-2 border">Image</th>
                        <th className="px-4 py-2 border">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {crops.map((crop) => (
                        <tr key={crop.cropCode}>
                            <td className="px-4 py-2 border">
                                <input type="checkbox"/>
                            </td>
                            <td className="px-4 py-2 border">{crop.cropCode}</td>
                            <td className="px-4 py-2 border">{crop.commonName}</td>
                            <td className="px-4 py-2 border">{crop.scientificName}</td>
                            <td className="px-4 py-2 border">{crop.category}</td>
                            <td className="px-4 py-2 border">{crop.cropSeason}</td>
                            <td className="px-4 py-2 border">{crop.fieldCode}</td>
                            <td className="px-4 py-2 border">{crop.image &&
                                <img src={cropImagePreview} alt="Field Image 1"
                                     className="h-16 w-16 object-cover rounded-md"/>}</td>
                            <td className="px-4 py-2 border">
                                <button className="text-purple-500"
                                        onClick={() => handleRowClick(crop)}>
                                    Update
                                </button>
                                <button
                                    className="text-red-500"
                                    onClick={
                                        () => DeleteCrop(crop.cropCode)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2">
                        <div className="flex justify-between items-center px-4 py-2 border-b bg-lime-200">
                            <h5 className="text-lg font-bold">Crop Details</h5>
                            <button
                                className="text-gray-500 hover:text-gray-700"
                                onClick={closeModal}
                            >
                                &times;
                            </button>
                        </div>
                        <div className="p-4">
                            <form id="cropForm" className="space-y-4">
                                {/* Input fields for crop details */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="cropCode" className="block font-medium">
                                            Crop Code
                                        </label>
                                        <input
                                            type="text"
                                            className="form-input w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                            id="cropCode"
                                            placeholder="Enter Crop Code"
                                            value={cropCode}
                                            onChange={(e) => setCropCode( e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="commonName" className="block font-medium">
                                            Common Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-input w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                            id="commonName"
                                            placeholder="Enter Common Name"
                                            value={commonName}
                                            onChange={(e) => setCropCommonName( e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="scientificName" className="block font-medium">
                                            Scientific Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-input w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                            id="scientificName"
                                            placeholder="Enter scientific Name"
                                            value={scientificName}
                                            onChange={(e) => setCropScientificName( e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="category" className="block font-medium">
                                            Category
                                        </label>
                                        <select
                                            className="form-select w-full border bg-white border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                            id="category"
                                            value={category}
                                            onChange={(e) => setCategory( e.target.value)}
                                        >
                                            <option value="" disabled>
                                                Select Category
                                            </option>
                                            <option value="Rice">Rice</option>
                                            <option value="Cowpea">Cowpea</option>
                                            <option value="Green gram">Green gram</option>
                                            <option value="Chickpea">Chickpea</option>
                                            <option value="Sweet potato">Sweet potato</option>
                                            <option value="Reddish">Reddish</option>
                                            <option value="Cassava">Cassava</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="cropSeason" className="block font-medium">
                                            cropSeason
                                        </label>
                                        <input
                                            type="text"
                                            className="form-input w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                            id="scientificName"
                                            placeholder="Enter cropSeason"
                                            value={cropSeason}
                                            onChange={(e) => setCropSeason(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="fieldCode" className="block font-medium">
                                            Field Code
                                        </label>
                                        <input
                                            type="text"
                                            className="form-input w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                            id="fieldCode"
                                            placeholder="Enter fieldCode"
                                            value={fieldCode}
                                            onChange={(e) => setFieldCode( e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block mb-1 text-gray-50">Field Image</label>
                                    <input type="file" className="form-input w-full border bg-white border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-200 file:text-green-800 hover:file:bg-green-200"
                                           onChange={handleImageChange}/>
                                    {cropImagePreview && (
                                        <div className="mt-4">
                                            <img src={cropImagePreview} alt="Preview"
                                                 className="h-32 w-32 object-cover rounded-md"/>
                                        </div>
                                    )}
                                </div>
                            </form>
                        </div>
                        <div className="flex justify-end space-x-2 px-4 py-2 border-t">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
                                onClick={AddCrop}
                            >
                                Save
                            </button>
                            <button
                                className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-400"
                                onClick={UpdateCrop}
                            >
                                Update
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:ring-2 focus:ring-red-400"
                                onClick={closeModal}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
