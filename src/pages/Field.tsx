import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store.ts";
import React, {useState} from "react";
import {deleteFields,addFields,updateFields} from "../reducers/FieldSlice.tsx";
import {Field} from "../models/Field.ts";

export const FieldForm=()=> {

    const dispatch=useDispatch();
    const [fieldCode, setFieldCode] = useState("");
    const [fieldName, setFieldName] = useState("");
    const [fieldLocation, setFieldLocation] = useState("");
    const [extentSize, setExtentSize] = useState<number>(0);
    const [fieldImage1, setFieldImage1] = useState("");
    const [fieldImage2, setFieldImage2] = useState("");
    const[cropCode, setCropCode] = useState("");
    const[staffId, setStaffId] = useState("");
    const fields=useSelector((state:RootState)=>state.fields.fields);

    // State for managing modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);
    // Handlers
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    // image preview
    const [fieldImagePreview1, setFieldImagePreview1] = useState("");
    const [fieldImagePreview2, setFieldImagePreview2] = useState("");

    const handleImageChange1 = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setFieldImagePreview1(event.target.result); // Update the preview state for image 1
            };
            reader.readAsDataURL(file);
            setFieldImage1(file); // Save the file itself to be stored in the state
        } else {
            setFieldImagePreview1(""); // Clear the preview if no file selected
        }
    };
    const handleImageChange2 = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setFieldImagePreview2(event.target.result);
            };
            reader.readAsDataURL(file);
            setFieldImage2(file);
        } else {
            setFieldImagePreview2("");
        }
    };

    //add field
    function AddField(e:React.MouseEvent<HTMLButtonElement>){
        e.preventDefault();
        const newField ={
            fieldCode:fieldCode,
            fieldName:fieldName,
            fieldLocation:fieldLocation,
            extentSize:extentSize,
            fieldImage1:fieldImage1,
            fieldImage2:fieldImage2,
            cropCode:cropCode,
            staffId:staffId,
        };
        dispatch(addFields(newField));
        alert("Field member added successfully!!");
        clear();
        closeModal();
    }
    //update field
    function handleRowClick(field:Field){
        setFieldCode(field.fieldCode);
        setFieldName(field.fieldName);
        setFieldLocation(field.fieldLocation);
        setExtentSize(Number(field.extentSize));
        setFieldImage1(field.fieldImage1);
        setFieldImage2(field.fieldImage2);
        setCropCode(field.cropCode);
        setStaffId(field.staffId);
        openModal();
    }

    function UpdateField(){
        const updatedFields = {
            fieldCode:fieldCode,
            fieldName:fieldName,
            fieldLocation:fieldLocation,
            extentSize:extentSize,
            fieldImage1:fieldImage1,
            fieldImage2:fieldImage2,
            cropCode:cropCode,
            staffId:staffId
        };
        dispatch(updateFields(updatedFields));
        alert("Updated Field successfully!!");
        clear();
        closeModal();
    }
    //delete field
    function DeleteField(fieldCode:string){
        alert("Field Deleted Successfully!!");
        dispatch(deleteFields(fieldCode));
        closeModal();
    }
    function clear(){
        setFieldCode("");
        setFieldName("");
        setFieldLocation("");
        setExtentSize(0);
        setFieldImage1("");
        setFieldImage2("");
        setCropCode("");
        setStaffId("");
    }


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
                        <th className="px-4 py-2 border">Crop Code</th>
                        <th className="px-4 py-2 border">Staff Id</th>
                        <th className="px-4 py-2 border">Field Image1</th>
                        <th className="px-4 py-2 border">Field Image2</th>
                        <th className="px-4 py-2 border">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {fields.map((field) => (
                        <tr key={field.fieldCode}>
                            <td className="px-4 py-2 border">
                                <input type="checkbox"/>
                            </td>
                            <td className="px-4 py-2 border">{field.fieldCode}</td>
                            <td className="px-4 py-2 border">{field.fieldName}</td>
                            <td className="px-4 py-2 border">{field.fieldLocation}</td>
                            <td className="px-4 py-2 border">{field.extentSize}</td>
                            <td className="px-4 py-2 border">{field.cropCode}</td>
                            <td className="px-4 py-2 border">{field.staffId}</td>
                            <td className="px-4 py-2 border">{field.fieldImage1 &&
                                <img src={fieldImagePreview1} alt="Field Image 1"
                                     className="h-16 w-16 object-cover rounded-md"/>}</td>
                            <td className="px-4 py-2 border">{field.fieldImage2 &&
                                <img src={fieldImagePreview2} alt="Field Image 2"
                                     className="h-16 w-16 object-cover rounded-md"/>}</td>
                            <td className="px-4 py-2 border">
                                <button
                                    className="text-purple-500"
                                    onClick={() => {
                                        handleRowClick(field);

                                    }}
                                >
                                   Update
                                </button>
                                <button
                                    className="text-red-500"
                                    onClick={() => {
                                        DeleteField(field.fieldCode)

                                    }}
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
                                            value={fieldCode}
                                            onChange={(e) => setFieldCode(e.target.value)}
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
                                            value={fieldName}
                                            onChange={(e) => setFieldName(e.target.value)}
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
                                                value={fieldLocation}
                                                onChange={(e) => setFieldLocation(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="extendSize" className="block font-medium">
                                                Extent Size
                                            </label>
                                            <select
                                                className="form-select w-full border bg-white border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                                id="extentSize"
                                                value={extentSize}
                                                onChange={(e) => setExtentSize(Number(e.target.value))}
                                            >
                                                <option value={0} disabled>Select Size</option>
                                                <option value={1000}>1000</option>
                                                <option value={2000}>2000</option>
                                                <option value={3000}>3000</option>

                                            </select>
                                        </div>

                                            <div>
                                                <label htmlFor="fieldCode" className="block font-medium">
                                                    Crop Code
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-input w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                                    id="cropCode"
                                                    placeholder="Enter Crop Code"
                                                    value={cropCode}
                                                    onChange={(e) => setCropCode(e.target.value)}
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
                                                    value={staffId}
                                                    onChange={(e) => setStaffId(e.target.value)}
                                                />
                                            </div>

                                        <div>
                                            <label htmlFor="fieldImage1" className="block font-medium">
                                                Field Image_1
                                            </label>
                                            <input
                                                type="file"
                                                className="form-input w-full border bg-white border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-200 file:text-green-800 hover:file:bg-green-200"
                                                id="fieldImage1"
                                                onChange={handleImageChange1}
                                            />
                                            {/* Image Preview */}
                                            {fieldImagePreview1 && (
                                                <div className="mt-4">
                                                    <img src={fieldImagePreview1} alt="Preview"
                                                         className="h-32 w-32 object-cover rounded-full"/>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <label htmlFor="fieldImage2" className="block font-medium">
                                                Field Image_2
                                            </label>
                                            <input
                                                type="file"
                                                className="form-input w-full border bg-white border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-200 file:text-green-800 hover:file:bg-green-200"
                                                id="fieldImage2"
                                                onChange={handleImageChange2}
                                            />
                                            {/* Image Preview */}
                                            {fieldImagePreview2 && (
                                                <div className="mt-4">
                                                    <img src={fieldImagePreview2} alt="Preview"
                                                         className="h-32 w-32 object-cover rounded-md"/>
                                                </div>
                                            )}
                                        </div>
                                </div>
                            </form>
                        </div>
                        <div className="flex justify-end space-x-2 px-4 py-2 border-t">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
                                onClick={AddField}
                            >
                                Save
                            </button>
                            <button
                                className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-400"
                                onClick={UpdateField}
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