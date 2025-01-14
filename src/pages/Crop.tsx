import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCrop, saveCrop, removeCrop } from "../reducers/CropSlice.tsx";
import { RootState } from "../store/store.ts";

export function Crop() {
    const crops = useSelector((state: RootState) => state.crops.crops);
    const dispatch = useDispatch();

    // State for managing modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Handlers
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const [newCrop, setNewCrop] = useState({
        cropCode: "",
        commonName: "",
        scientificName: "",
        category: "",
        cropSeason: "",
        fieldCode: "",
        image: "", // Store file name or URL instead of the File object
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setNewCrop({ ...newCrop, image: file.name }); // Store the file name or URL
        }
    };

    return (
        <>
            {/* Main Content */}
            <div className="ccol-span-12 lg:col-span-10 p-4 fixed top-[60px] w-[calc(100%-260px)] left-[250px] min-h-[calc(100vh-60px)] bg-[#f5f5f5] overflow-y-auto">
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
                    {crops.map((crop, index) => (
                        <tr key={index}>
                            <td className="px-4 py-2 border">
                                <input type="checkbox" />
                            </td>
                            <td className="px-4 py-2 border">{crop.cropCode}</td>
                            <td className="px-4 py-2 border">{crop.commonName}</td>
                            <td className="px-4 py-2 border">{crop.scientificName}</td>
                            <td className="px-4 py-2 border">{crop.category}</td>
                            <td className="px-4 py-2 border">{crop.cropSeason}</td>
                            <td className="px-4 py-2 border">{crop.fieldCode}</td>
                            <td className="px-4 py-2 border">{crop.image || "No Image"}</td>
                            <td className="px-4 py-2 border">
                                <button
                                    className="text-red-500"
                                    onClick={() => {
                                        if (confirm("Are you sure you want to delete this ?")){
                                            dispatch(removeCrop(crop.cropCode))
                                        }}}
                                >
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
                        <div className="flex justify-between items-center px-4 py-2 border-b">
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
                                            className="form-input w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                            id="cropCode"
                                            placeholder="Enter Crop Code"
                                            value={newCrop.cropCode}
                                            onChange={(e) => setNewCrop({...newCrop, cropCode: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="commonName" className="block font-medium">
                                            Common Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-input w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                            id="commonName"
                                            placeholder="Enter Common Name"
                                            value={newCrop.commonName}
                                            onChange={(e) => setNewCrop({...newCrop, commonName: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="commonName" className="block font-medium">
                                            scientificName
                                        </label>
                                        <input
                                            type="text"
                                            className="form-input w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                            id="scientificName"
                                            placeholder="Enter Common Name"
                                            value={newCrop.scientificName}
                                            onChange={(e) => setNewCrop({...newCrop, scientificName: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="category" className="block font-medium">
                                            Category
                                        </label>
                                        <select
                                            className="form-select w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                            id="category"
                                            value={newCrop.category}
                                            onChange={(e) => setNewCrop({...newCrop, category: e.target.value})}
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
                                            className="form-input w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                            id="scientificName"
                                            placeholder="Enter cropSeason"
                                            value={newCrop.cropSeason}
                                            onChange={(e) => setNewCrop({...newCrop, cropSeason: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="fieldCode" className="block font-medium">
                                            fieldCode
                                        </label>
                                        <input
                                            type="text"
                                            className="form-input w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                            id="fieldCode"
                                            placeholder="Enter fieldCode"
                                            value={newCrop.fieldCode}
                                            onChange={(e) => setNewCrop({...newCrop, fieldCode: e.target.value})}
                                        />
                                    </div>
                                </div>
                                {/* Other fields */}
                                <div>
                                    <label htmlFor="cropImage" className="block font-medium">
                                        Image
                                    </label>
                                    <input
                                        type="file"
                                        className="form-input w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        id="image"
                                        onChange={handleFileChange}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="flex justify-end space-x-2 px-4 py-2 border-t">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
                                onClick={() => dispatch(saveCrop(newCrop))}
                            >
                                Save
                            </button>
                            <button
                                className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-400"
                                onClick={() => dispatch(updateCrop(newCrop))}
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
