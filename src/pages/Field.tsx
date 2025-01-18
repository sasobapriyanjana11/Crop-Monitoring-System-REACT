import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store.ts";
import React, {useState} from "react";
import {deleteFields,addFields,updateFields} from "../reducers/FieldSlice.tsx";


export function Field() {
    const fields=useSelector((state:RootState)=>state.fields.fields);
    const dispatch=useDispatch();

    // State for managing modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);
    // Handlers
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const [newField, setNewField] = useState({
        fieldCode: "",
        fieldName: "",
        fieldLocation :"",
        extentSize:0,
        cropCode:"",
        staffId:"",
        fieldImage1:"",
        fieldImage2:""
    });
    const handleFileFieldImage_1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setNewField({ ...newField, fieldImage1: file.name }); // Store the file name or URL
        }
    };
    const handleFileFieldImage_2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setNewField({ ...newField, fieldImage2: file.name });
        }
    };

    return (
        <>
            {/* Main Content */}
            <div className="col-span-12 lg:col-span-10 p-4 fixed top-[60px] w-[calc(100%-260px)] left-[250px] min-h-[calc(100vh-60px)] bg-[#f5f5f5] overflow-y-auto">
                <h1 className="text-2xl font-bold text-center my-4">Field Management</h1>

                <div className="flex justify-between items-center mb-3">
                    <input
                        type="text"
                        className="form-input w-1/2 border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Search Field"
                    />
                    <button
                        onClick={openModal}
                        className="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:ring-2 focus:ring-green-400">
                        <i className="fa fa-plus"></i>
                        Add Field
                    </button>
                </div>

                <table className="table-auto w-full border  border-gray-300 ">
                    <thead className="bg-gray-200 text-green-700">
                    <tr>
                        <th className="px-4 py-2 border">Select</th>
                        <th className="px-4 py-2 border">Field Code</th>
                        <th className="px-4 py-2 border">Field Name</th>
                        <th className="px-4 py-2 border">Field Location</th>
                        <th className="px-4 py-2 border">Extent Size</th>
                        <th className="px-4 py-2 border">crops</th>
                        <th className="px-4 py-2 border">staff</th>
                        <th className="px-4 py-2 border">Field Image1</th>
                        <th className="px-4 py-2 border">Field Image2</th>
                        <th className="px-4 py-2 border">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {fields.map((field, index) => (
                        <tr key={index}>
                            <td className="px-4 py-2 border">
                                <input type="checkbox"/>
                            </td>
                            <td className="px-4 py-2 border">{field.fieldCode}</td>
                            <td className="px-4 py-2 border">{field.fieldName}</td>
                            <td className="px-4 py-2 border">{field.fieldLocation}</td>
                            <td className="px-4 py-2 border">{field.extentSize}</td>
                            <td className="px-4 py-2 border">{field.cropCode}</td>
                            <td className="px-4 py-2 border">{field.staffId}</td>
                            <td className="px-4 py-2 border">{field.fieldImage1 || "No Image"}</td>
                            <td className="px-4 py-2 border">{field.fieldImage2 || "No Image"}</td>
                            <td className="px-4 py-2 border">
                                <button
                                    className="text-red-500"
                                    onClick={() => {
                                        if (confirm("Are you sure you want to delete this field?")){
                                            dispatch(deleteFields(field.fieldCode))
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
                        <div className="flex justify-between items-center px-4 py-2 border-b bg-lime-100">
                            <h5 className="text-lg font-bold">Field Details</h5>
                            <button
                                className="text-gray-500 hover:text-gray-700"
                                onClick={closeModal}
                            >
                                &times;
                            </button>
                        </div>
                        <div className="p-4">
                            <form id="fieldForm" className="space-y-4">
                                {/* Input fields for crop details */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="fieldCode" className="block font-medium">
                                            Field Code
                                        </label>
                                        <input
                                            type="text"
                                            className="form-input w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                            id="fieldCode"
                                            placeholder="Enter Field Code"
                                            value={newField.fieldCode}
                                            onChange={(e) => setNewField({...newField, fieldCode: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="fieldName" className="block font-medium">
                                            Field Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-input w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                            id="fieldName"
                                            placeholder="Enter Field Name"
                                            value={newField.fieldName}
                                            onChange={(e) => setNewField({...newField, fieldName: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="fieldLocation" className="block font-medium">
                                            Field Location
                                        </label>
                                        <input
                                            type="text"
                                            className="form-input w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                            id="fieldLocation"
                                            placeholder="Enter Field Location"
                                            value={newField.fieldLocation}
                                            onChange={(e) => setNewField({...newField, fieldLocation: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="extentSize" className="block font-medium">
                                            Extent Size
                                        </label>
                                        <input
                                            type="number"
                                            className="form-input w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                            id="extentSize"
                                            placeholder="Enter Extent Size"
                                            value={newField.extentSize}
                                            onChange={(e) => setNewField({...newField, extentSize: Number(e.target.value)})}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="fieldCode" className="block font-medium">
                                            cropCode
                                        </label>
                                        <input
                                            type="text"
                                            className="form-input w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                            id="cropCode"
                                            placeholder="Enter Crop Code"
                                            value={newField.cropCode}
                                            onChange={(e) => setNewField({...newField, cropCode: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="staffId" className="block font-medium">
                                            Staff Id
                                        </label>
                                        <input
                                            type="text"
                                            className="form-input w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                            id="staffId"
                                            placeholder="Enter Staff Id"
                                            value={newField.staffId}
                                            onChange={(e) => setNewField({...newField, staffId: e.target.value})}
                                        />
                                    </div>
                                </div>
                                {/* Other fields */}
                                <div>
                                    <label htmlFor="fieldImage1" className="block font-medium">
                                        Field Image_1
                                    </label>
                                    <input
                                        type="file"
                                        className="form-input w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                        id="fieldImage1"
                                        onChange={handleFileFieldImage_1Change}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="fieldImage2" className="block font-medium">
                                        Field Image_2
                                    </label>
                                    <input
                                        type="file"
                                        className="form-input w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                        id="fieldImage2"
                                        onChange={handleFileFieldImage_2Change}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="flex justify-end space-x-2 px-4 py-2 border-t">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
                                onClick={() => dispatch(addFields(newField))}
                            >
                                Save
                            </button>
                            <button
                                className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-400"
                                onClick={() => dispatch(updateFields(newField))}
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