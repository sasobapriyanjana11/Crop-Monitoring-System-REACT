import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store.ts";
import React, { useState } from "react";
import { removeStaff, addStaff, updateStaff } from "../reducers/StaffSlice.tsx";
import {Staff} from "../models/Staff.ts";


export const StaffForm=()=> {
    const dispatch = useDispatch();
    const staff = useSelector((state: RootState) => state.staff.staff);
    const [id, setId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [ designation, setDesignation] = useState("");
    const [gender, setGender] = useState("");
    const [joinedDate, setJoinDate] = useState("");
    const [DOB, setDob] = useState("");
    const [address, setAddress] = useState("");
    const [contactNumber, setContactNumber] = useState<number>(0);
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const[fieldCode, setFieldCode] = useState("");
    const[vehicleCode, setVehicleCode] = useState("");

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Handlers
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    //add staff
    function AddStaff(e:React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault(); // Prevent form from submitting
        const newStaff = {
            id, firstName, lastName, designation, gender, joinedDate, DOB, address, contactNumber, email, role,fieldCode,vehicleCode
        };
        dispatch(addStaff(newStaff));
        alert("Staff member added successfully!");
        clearData();
    }
    //update staff
    function handleRowClick(staff:Staff) {
        setId(staff.id);
        setFirstName(staff.firstName);
        setLastName(staff.lastName);
        setDesignation(staff.designation);
        setGender(staff.gender);
        setJoinDate(staff.joinedDate);
        setDob(staff.DOB);
        setAddress(staff.address);
        setContactNumber(staff.contactNumber);
        setEmail(staff.email);
        setRole(staff.role);
        setFieldCode(staff.fieldCode);
        setVehicleCode(staff.vehicleCode);
        openModal();
    }
    function UpdateStaff() {
        const updateStaffs ={id, firstName, lastName, designation, gender, joinedDate, DOB, address, contactNumber, email, role,fieldCode,vehicleCode};
        dispatch(updateStaff(updateStaffs));
        alert("Staff member updated successfully!");
        closeModal();
    }

    //delete staff
    function DeleteStaff(email:string) {
        alert("Staff member delete successfully!!")
        dispatch(removeStaff(email))
        closeModal();
    }
    //clear data
    function clearData(){
        setId("");
        setFirstName("");
        setLastName("");
        setDesignation("");
        setGender("");
        setJoinDate("");
        setDob("");
        setAddress("");
        setContactNumber(0);
        setEmail("");
        setRole("");
        setFieldCode("");
        setVehicleCode("");
        openModal();
    }

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
                        <th className="px-4 py-2 border">Field Code</th>
                        <th className="px-4 py-2 border">Vehicle Code</th>
                        <th className="px-4 py-2 border">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {staff.map((staff) => (
                        <tr key={staff.id}>
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
                            <td className="px-4 py-2 border">{staff.fieldCode}</td>
                            <td className="px-4 py-2 border">{staff.vehicleCode}</td>
                            <td className="px-4 py-2 border">
                                <button
                                    className="text-purple-500"
                                    onClick={() => {
                                            handleRowClick(staff)
                                    }
                                    }
                                >
                                    Update
                                </button>
                                <button
                                    className="text-red-500"
                                    onClick={() => {
                                       DeleteStaff(staff.email);
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
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label htmlFor="staffId" className="block font-medium">
                                        Staff Id
                                    </label>
                                    <input
                                        type="text"
                                        className="form-input w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                        id="id"
                                        placeholder="Enter Staff Id"
                                        value={id}
                                        onChange={(e) => setId(e.target.value)}
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
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
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
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
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
                                        value={designation}
                                        onChange={(e) => setDesignation(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="gender" className="block font-medium">
                                        Gender
                                    </label>
                                    <select
                                        className="form-select w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                        id="gender"
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
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
                                        value={joinedDate}
                                        onChange={(e) => setJoinDate(e.target.value)}
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
                                        value={DOB}
                                        onChange={(e) => setDob(e.target.value)}
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
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
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
                                        value={contactNumber}
                                        onChange={(e) => setContactNumber(Number(e.target.value))}
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
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="role" className="block font-medium">
                                        Role
                                    </label>
                                    <select className="form-input w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none" value={role}
                                            onChange={(e) => setRole(e.target.value)}>
                                        <option value="MANAGER">Manager</option>
                                        <option value="ADMINISTRATIVE">Administrative</option>
                                        <option value="SCIENTIST">Scientist</option>
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
                                    <label htmlFor="vehicleCode" className="block font-medium">
                                        Vehicle Code
                                    </label>
                                    <select
                                        className="form-select w-full border bg-white border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                        id="vehicleCode"
                                        value={vehicleCode}
                                        onChange={(e) => setVehicleCode(e.target.value)}
                                    >
                                        <option value="" disabled>
                                            Select Vehicle Code
                                        </option>
                                        <option value="V-001">V-001</option>
                                        <option value="V-002">V-002</option>
                                        <option value="V-003">V-003</option>

                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                        {/* Submit/Save/update button */}
                        <div className="flex justify-end space-x-2 px-4 py-2 border-t">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
                                onClick={AddStaff}
                            >
                                Save
                            </button>
                            <button
                                className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-400"
                                onClick={UpdateStaff}
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
