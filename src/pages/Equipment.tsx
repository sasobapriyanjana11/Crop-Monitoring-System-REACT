import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { addEquipment, updateEquipment, deleteEquipment } from "../reducers/EquipmentSlice";
import {Equipment} from "../models/Equipment.ts";

export const EquipmentForm=()=> {
    const dispatch = useDispatch();

    const [equipmentId, setEquipmentId] = useState("");
    const [name, setEquipmentName] = useState("");
    const [type, setEquipmentType] = useState("");
    const [status, setStatus] = useState("");
    const [fieldCode, setFieldCode] = useState("");
    const [staffCode,setStaffCode] = useState("");

    const equipments = useSelector((state: RootState) => state.equipments.equipments || []);


    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    // Handlers for modal visibility
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    //add equipment
    function AddEquipment(e:React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        const newEquipment = {equipmentId,name,type,status,fieldCode,staffCode}
        dispatch(addEquipment(newEquipment))
        alert("Successfully Added Equipment");
        clear();
       closeModal();

    }
    //update equipment
    function handleRowClick(equipment: Equipment) {
        setEquipmentId(equipment.equipmentId);
        setEquipmentName(equipment.name);
        setEquipmentType(equipment.type);
        setStatus(equipment.status);
        setFieldCode(equipment.fieldCode);
        setStaffCode(equipment.staffCode);
        openModal();
    }
    function UpdateEquipment() {
        const updateEquipments = {equipmentId,name,type,status,fieldCode,staffCode};
        dispatch(updateEquipment(updateEquipments));
        alert("Successfully Update Equipment");
        clear();
       closeModal();
    }

    //delete equipment
    function DeleteEquipment(equipmentCode: string) {
        alert("Deleting Equipment");
        dispatch(deleteEquipment(equipmentCode));
        closeModal();
    }
    function clear(){
        setEquipmentId("");
        setEquipmentName("");
        setStatus("");
        setEquipmentType("");
        setFieldCode("");
        setStaffCode("");

    }

    return (
        <>
            <div className="col-span-12 lg:col-span-10 p-4 fixed top-[60px] w-[calc(100%-260px)] left-[250px] min-h-[calc(100vh-60px)] bg-[#f5f5f5] overflow-y-auto">
                <h1 className="text-2xl font-bold text-center my-4">Equipment Management</h1>

                <div className="flex justify-between items-center mb-3">
                    <input
                        type="text"
                        className="form-input w-1/2 border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Search Equipment"
                    />
                    <button
                        className="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:ring-2 focus:ring-green-400"
                        onClick={openModal}
                    >
                        <i className="fa fa-plus"></i>
                        Add Equipment
                    </button>
                </div>

                <table className="table-auto w-full border border-gray-300">
                    <thead className="bg-gray-200 text-green-700">
                    <tr>
                        <th className="px-4 py-2 border">Select</th>
                        <th className="px-4 py-2 border">Equipment Code</th>
                        <th className="px-4 py-2 border">Equipment Name</th>
                        <th className="px-4 py-2 border">Type</th>
                        <th className="px-4 py-2 border">Status</th>
                        <th className="px-4 py-2 border">Field Code</th>
                        <th className="px-4 py-2 border">Staff Code</th>
                        <th className="px-4 py-2 border">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {equipments.map((equipment, index) => (
                        <tr key={index}>
                            <td className="px-4 py-2 border">
                                <input type="checkbox"/>
                            </td>
                            <td className="px-4 py-2 border">{equipment.equipmentId}</td>
                            <td className="px-4 py-2 border">{equipment.name}</td>
                            <td className="px-4 py-2 border">{equipment.type}</td>
                            <td className="px-4 py-2 border">{equipment.status}</td>
                            <td className="px-4 py-2">{equipment.fieldCode}</td>
                            <td className="px-4 py-2">{equipment.staffCode}</td>
                            <td className="px-4 py-2 border">
                                <button
                                    className="text-purple-500"
                                    onClick={() => {
                                        handleRowClick(equipment);
                                    }
                                    }
                                >
                                    Update
                                </button>
                                <button
                                    className="text-red-500"
                                    onClick={() => {
                                        DeleteEquipment(equipment.equipmentId)
                                    }
                                    }
                                >
                                    Delete
                                </button>
                            </td>

                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2">
                        <div className="flex justify-between items-center px-4 py-2 border-b bg-lime-100">
                            <h5 className="text-lg font-bold">Equipment Details</h5>
                            <button className="text-gray-500 hover:text-gray-700" onClick={closeModal}>
                                &times;
                            </button>
                        </div>
                        <div className="p-4">
                            <form id="equipmentForm" className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="equipmentId" className="block font-medium">
                                            Equipment Code
                                        </label>
                                        <input
                                            type="text"
                                            className="form-input w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                            id="equipmentId"
                                            placeholder="Enter equipmentId"
                                            value={equipmentId}
                                            onChange={(e) => setEquipmentId( e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="name" className="block font-medium">
                                            Equipment Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-input w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                            id="name"
                                            placeholder="Enter Equipment name"
                                            value={name}
                                            onChange={(e) => setEquipmentName( e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="type" className="block font-medium">
                                            Type
                                        </label>
                                        <select
                                            className="form-select w-full border bg-white border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                            id="type"
                                            value={type}
                                            onChange={(e) => setEquipmentType(e.target.value)}
                                        >
                                            <option value="" disabled>
                                                Select Type
                                            </option>
                                            <option value="ELECTRICAL">ELECTRICAL</option>
                                            <option value="MECHANICAL">MECHANICAL</option>

                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="fieldCode" className="block font-medium">
                                            Field Code
                                        </label>
                                        <select
                                            className="form-select w-full border bg-white border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                            id="fieldCode"
                                            value={fieldCode}
                                            onChange={(e) => setFieldCode(e.target.value)}
                                        >
                                            <option value="" disabled>
                                                Select Field Code
                                            </option>
                                            <option value="F-001">F-001</option>
                                            <option value="F-002">F-002</option>
                                            <option value="F-003">F-003</option>

                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="staffId" className="block font-medium">
                                            Staff Id
                                        </label>
                                        <select
                                            className="form-select w-full border bg-white border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                            id="staffCode"
                                            value={staffCode}
                                            onChange={(e) => setStaffCode(e.target.value)}
                                        >
                                            <option value="" disabled>
                                                Select Staff Code
                                            </option>
                                            <option value="S-001">S-001</option>
                                            <option value="S-002">S-002</option>
                                            <option value="S-003">S-003</option>

                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="status" className="block font-medium">
                                            Status
                                        </label>
                                        <input
                                            type="text"
                                            className="form-input w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                            id="status"
                                            placeholder="Enter Equipment Status"
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}

                                        />
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="flex justify-end space-x-2 px-4 py-2 border-t">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
                                onClick={AddEquipment}
                            >
                                Save
                            </button>
                            <button
                                className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-400"
                                onClick={UpdateEquipment}
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

