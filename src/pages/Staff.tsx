import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store.ts";
import { useState } from "react";
import { Field } from "../models/Field.ts";
import { Vehicle } from "../models/Vehicle.ts";
import { removeStaff, addStaff, updateStaff } from "../reducers/StaffSlice.tsx";


export function Staff() {
    const staff = useSelector((state: RootState) => state.staff.staff);
    const dispatch = useDispatch();

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Handlers
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // Initialize new staff state with correct types
    const [newStaff, setNewStaff] = useState({
        id: "",
        firstName: "",
        lastName: "",
        designation: "",
        gender: "",
        joinedDate: new Date(),  // Set a default date or handle it as needed
        DOB: new Date(),          // Set a default date or handle it as needed
        address: "",
        contactNumber: 0,
        email: "",
        role: "",
        field: [] as Field[],     // Default to an empty array of type Field
        vehicle: [] as Vehicle[], // Default to an empty array of type Vehicle
    });

    return (
        <>
            {/* Main Content */}
            <div className="col-span-12 lg:col-span-10 p-4 fixed top-[60px] w-[calc(100%-260px)] left-[250px] min-h-[calc(100vh-60px)] bg-[#f5f5f5] overflow-y-auto">
                <h1 className="text-2xl font-bold text-center my-4">Staff Management</h1>

                <div className="flex justify-between items-center mb-3">
                    <input
                        type="text"
                        className="form-input w-1/2 border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Search Staff"
                    />
                    <button
                        onClick={openModal}
                        className="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:ring-2 focus:ring-green-400"
                    >
                        <i className="fa fa-plus"></i>
                        Add Staff
                    </button>
                </div>

                <table className="table-auto w-full border border-gray-300">
                    <thead className="bg-gray-200 text-green-700">
                    <tr>
                        <th className="px-4 py-2 border">Select</th>
                        <th className="px-4 py-2 border">id</th>
                        <th className="px-4 py-2 border">First Name</th>
                        <th className="px-4 py-2 border">Last Name</th>
                        <th className="px-4 py-2 border">Designation</th>
                        <th className="px-4 py-2 border">Gender</th>
                        <th className="px-4 py-2 border">Joined Date</th>
                        <th className="px-4 py-2 border">DOB</th>
                        <th className="px-4 py-2 border">Address</th>
                        <th className="px-4 py-2 border">Contact No</th>
                        <th className="px-4 py-2 border">Email</th>
                        <th className="px-4 py-2 border">Role</th>
                        <th className="px-4 py-2 border">Field</th>
                        <th className="px-4 py-2 border">Vehicle</th>
                        <th className="px-4 py-2 border">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {staff.map((staff, index) => (
                        <tr key={index}>
                            <td className="px-4 py-2 border">
                                <input type="checkbox"/>
                            </td>
                            <td className="px-4 py-2 border">{staff.id}</td>
                            <td className="px-4 py-2 border">{staff.firstName}</td>
                            <td className="px-4 py-2 border">{staff.lastName}</td>
                            <td className="px-4 py-2 border">{staff.designation}</td>
                            <td className="px-4 py-2 border">{staff.gender}</td>
                            <td className="px-4 py-2 border"> {new Date(staff.joinedDate).toLocaleDateString()}</td>
                            <td className="px-4 py-2 border">{new Date(staff.DOB).toLocaleDateString()}</td>
                            <td className="px-4 py-2 border">{staff.address}</td>
                            <td className="px-4 py-2 border">{staff.contactNumber}</td>
                            <td className="px-4 py-2 border">{staff.email}</td>
                            <td className="px-4 py-2 border">{staff.role}</td>
                            <td className="px-4 py-2 border">{staff.field.join(", ")}</td>
                            <td className="px-4 py-2 border">{staff.vehicle.join(", ")}</td>
                            <td className="px-4 py-2 border">
                                <button
                                    className="text-red-500"
                                    onClick={() => {
                                        if (confirm("Are you sure you want to delete this staff member?")){
                                            dispatch(removeStaff(staff.id))
                                        }
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

            {/* Modal */}
            {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2">
                    <div className="flex justify-between items-center px-4 py-2 border-b bg-lime-100">
                        <h5 className="text-lg font-bold">Staff Details</h5>
                        <button
                            className="text-gray-500 hover:text-gray-700"
                            onClick={closeModal}
                        >
                            &times;
                        </button>
                    </div>
                    <div className="p-4">
                        <form id="staffForm" className="space-y-4">
                            {/* Input fields for staff details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="staffId" className="block font-medium">
                                        Staff Id
                                    </label>
                                    <input
                                        type="text"
                                        className="form-input w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                        id="id"
                                        placeholder="Enter Staff Id"
                                        value={newStaff.id}
                                        onChange={(e) => setNewStaff({...newStaff, id: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="firstName" className="block font-medium">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-input w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                        id="firstName"
                                        placeholder="Enter First Name"
                                        value={newStaff.firstName}
                                        onChange={(e) => setNewStaff({...newStaff, firstName: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block font-medium">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-input w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                        id="lastName"
                                        placeholder="Enter Last Name"
                                        value={newStaff.lastName}
                                        onChange={(e) => setNewStaff({...newStaff, lastName: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="designation" className="block font-medium">
                                        Designation
                                    </label>
                                    <input
                                        type="text"
                                        className="form-input w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                        id="designation"
                                        placeholder="Enter Designation"
                                        value={newStaff.designation}
                                        onChange={(e) => setNewStaff({...newStaff, designation: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="gender" className="block font-medium">
                                        Gender
                                    </label>
                                    <select
                                        className="form-select w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                        id="gender"
                                        value={newStaff.gender}
                                        onChange={(e) => setNewStaff({...newStaff, gender: e.target.value})}
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="joinedDate" className="block font-medium">
                                        Joined Date
                                    </label>
                                    <input
                                        type="date"
                                        className="form-input w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                        id="joinedDate"
                                        value={newStaff.joinedDate.toISOString().split('T')[0]}
                                        onChange={(e) => setNewStaff({
                                            ...newStaff,
                                            joinedDate: new Date(e.target.value)
                                        })}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="DOB" className="block font-medium">
                                        Date of Birth
                                    </label>
                                    <input
                                        type="date"
                                        className="form-input w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                        id="DOB"
                                        value={newStaff.DOB.toISOString().split('T')[0]}
                                        onChange={(e) => setNewStaff({...newStaff, DOB: new Date(e.target.value)})}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="address" className="block font-medium">
                                        Address
                                    </label>
                                    <textarea
                                        className="form-textarea w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                        id="address"
                                        placeholder="Enter Address"
                                        value={newStaff.address}
                                        onChange={(e) => setNewStaff({...newStaff, address: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="contactNumber" className="block font-medium">
                                        Contact Number
                                    </label>
                                    <input
                                        type="number"
                                        className="form-input w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                        id="contactNumber"
                                        placeholder="Enter Contact Number"
                                        value={newStaff.contactNumber}
                                        onChange={(e) => setNewStaff({
                                            ...newStaff,
                                            contactNumber: Number(e.target.value)
                                        })}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block font-medium">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className="form-input w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                        id="email"
                                        placeholder="Enter Email"
                                        value={newStaff.email}
                                        onChange={(e) => setNewStaff({...newStaff, email: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="role" className="block font-medium">
                                        Role
                                    </label>
                                    <input
                                        type="text"
                                        className="form-input w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                        id="role"
                                        placeholder="Enter Role"
                                        value={newStaff.role}
                                        onChange={(e) => setNewStaff({...newStaff, role: e.target.value})}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                    {/* Submit/Save/update button */}
                    <div className="flex justify-end space-x-2 px-4 py-2 border-t">
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
                            onClick={() => dispatch(addStaff(newStaff))}
                        >
                            Save
                        </button>
                        <button
                            className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-400"
                            onClick={() => dispatch(updateStaff(newStaff))}
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
