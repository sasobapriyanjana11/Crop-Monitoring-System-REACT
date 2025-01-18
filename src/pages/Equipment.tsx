import  { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { addEquipment, updateEquipment, deleteEquipment } from "../reducers/EquipmentSlice";
import { Staff } from "../models/Staff";
import { Field } from "../models/Field";

export function Equipment() {
    const equipments = useSelector((state: RootState) => state.equipments.equipments || []);

    const dispatch = useDispatch();
    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    // Handlers for modal visibility
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    // New Equipment state
    const [newEquipment, setNewEquipment] = useState<{
        equipmentId: string;
        name: string;
        type: string;
        status: string;
        assignedStaffDetails: Staff[];
        assignedFieldDetails: Field[];
    }>({
        equipmentId: "",
        name: "",
        type: "",
        status: "",
        assignedStaffDetails: [],
        assignedFieldDetails: [],
    });

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
                        <th className="px-4 py-2 border">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {equipments.map((equipment,index) => (
                        <tr key={index}>
                            <td className="px-4 py-2 border">
                                <input type="checkbox"/>
                            </td>
                            <td className="px-4 py-2 border">{equipment.equipmentId}</td>
                            <td className="px-4 py-2 border">{equipment.name}</td>
                            <td className="px-4 py-2 border">{equipment.type}</td>
                            <td className="px-4 py-2 border">{equipment.status}</td>
                            <td className="px-4 py-2 border">
                                <button
                                    className="text-red-500"
                                    onClick={() => {
                                        if (confirm("Are you sure you want to delete this equipment?")){
                                            dispatch(deleteEquipment(equipment.equipmentId))
                                        }}
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
                                            value={newEquipment.equipmentId}
                                            onChange={(e) => setNewEquipment({...newEquipment, equipmentId: e.target.value})}
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
                                            value={newEquipment.name}
                                            onChange={(e) => setNewEquipment({...newEquipment, name: e.target.value})}
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
                                            id="category"
                                            value={newEquipment.type}
                                            onChange={(e) => setNewEquipment({...newEquipment, type: e.target.value})}
                                        >
                                            <option value="" disabled>
                                                Select Type
                                            </option>
                                            <option value="ELECTRICAL">ELECTRICAL</option>
                                            <option value="MECHANICAL">MECHANICAL</option>

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
                                            value={newEquipment.status}
                                            onChange={(e) => setNewEquipment({...newEquipment, status: e.target.value})}

                                        />
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="flex justify-end space-x-2 px-4 py-2 border-t">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
                                onClick={() => dispatch(addEquipment(newEquipment))}
                            >
                                Save
                            </button>
                            <button
                                className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-400"
                                onClick={() => dispatch(updateEquipment(newEquipment))}
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

