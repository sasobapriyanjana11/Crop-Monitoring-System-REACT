import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store.ts";
import React, {useState} from "react";
import {addVehicle, deleteVehicle, updateVehicle} from "../reducers/VehicleSlice.tsx";
import {Vehicle} from "../models/Vehicle.ts";


export const VehicleForm=()=> {

    const dispatch = useDispatch();
    const [vehicleCode, setVehicleCode] = useState("");
    const [LicensePlateNumber,setLicensePlateNumber] = useState("");
    const [category, setVehicleCategory] = useState("");
    const [fuelType, setFuelType] = useState("");
    const [staffId,setStaffId] = useState("");
    const [remarks,setRemarks] = useState("");

    const vehicles = useSelector((state:RootState)=>state.vehicles.vehicles);

    // State for managing modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Handlers
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const [searchTerm, setSearchTerm] = useState("");

    //add vehicle
    function AddVehicle(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        const newVehicle = {vehicleCode,LicensePlateNumber,category,fuelType,staffId,remarks};
        dispatch(addVehicle(newVehicle));
        alert("Vehicle Added Successfully!");
        clearData();
       closeModal();
    }

    //update
    function handleRowClick(vehicle: Vehicle) {
        setVehicleCode(vehicle.vehicleCode);
        setLicensePlateNumber(vehicle.LicensePlateNumber);
        setVehicleCategory(vehicle.category);
        setFuelType(vehicle.fuelType);
        setStaffId(vehicle.staffId);
        setRemarks(vehicle.remarks);
        openModal();
    }
    function UpdateVehicle() {
        const updateVehicles = {vehicleCode,LicensePlateNumber,category,fuelType,staffId,remarks}
        dispatch(updateVehicle(updateVehicles));
        alert("Vehicle Updated Successfully!");
        clearData();
        closeModal();
    }

    //delete vehicle
    function DeleteVehicle(vehicleCode: string) {
        alert("Vehicle Deleted Successfully!");
        dispatch(deleteVehicle(vehicleCode));
        closeModal();
    }
    function clearData(){
        setVehicleCode("");
        setLicensePlateNumber("");
        setVehicleCategory("");
        setFuelType("");
        setStaffId("");
        setRemarks("");
        openModal();
    }

    return (
        <>
            <div className="col-span-12 lg:col-span-10 p-4 fixed top-[60px] w-[calc(100%-260px)] left-[250px] min-h-[calc(100vh-60px)] bg-[#f5f5f5] overflow-y-auto">
                <h1 className="text-2xl font-bold text-center my-4">Vehicle Management</h1>

                <div className="flex justify-between items-center mb-3">
                    <input
                        type="text"
                        className="form-input w-1/2 border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Search Vehicle"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        className="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:ring-2 focus:ring-green-400"
                        onClick={openModal}
                    >
                        <i className="fa fa-plus"></i>
                        Add Vehicle
                    </button>
                </div>

                <table className="table-auto w-full border border-gray-300">
                    <thead className="bg-gray-200 text-green-700">
                    <tr>
                        <th className="px-4 py-2 border">Select</th>
                        <th className="px-4 py-2 border">Vehicle Code</th>
                        <th className="px-4 py-2 border">License Plate Number</th>
                        <th className="px-4 py-2 border">Category</th>
                        <th className="px-4 py-2 border">Fuel Type</th>
                        <th className="px-4 py-2 border">Allocate Staff Member</th>
                        <th className="px-4 py-2 border">Remarks</th>
                        <th className="px-4 py-2 border">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {vehicles.map((vehicle) => (
                        <tr key={vehicle.vehicleCode}>
                            <td className="px-4 py-2 border">
                                <input type="checkbox"/>
                            </td>
                            <td className="px-4 py-2 border">{vehicle.vehicleCode}</td>
                            <td className="px-4 py-2 border">{vehicle.LicensePlateNumber}</td>
                            <td className="px-4 py-2 border">{vehicle.category}</td>
                            <td className="px-4 py-2 border">{vehicle.fuelType}</td>
                            <td className="px-4 py-2 border">{vehicle.staffId}</td>
                            <td className="px-4 py-2 border">{vehicle.remarks}</td>
                            <td className="px-4 py-2 border">
                                <button
                                    className="text-purple-500"
                                    onClick={() => {

                                       handleRowClick(vehicle);

                                    }
                                    }
                                >
                                   Update
                                </button>
                                <button
                                    className="text-red-500"
                                    onClick={() => {

                                        DeleteVehicle(vehicle.vehicleCode)

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
                        <h5 className="text-lg font-bold">Vehicle Details</h5>
                            <button className="text-gray-500 hover:text-gray-700" onClick={closeModal}>
                                &times;
                            </button>
                        </div>
                        <div className="p-4">
                            <form id="vehicleForm" className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="vehicleCode" className="block font-medium">
                                            Vehicle Code
                                        </label>
                                        <input
                                            type="text"
                                            className="form-input w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                            id="vehicleCode"
                                            placeholder="Enter Vehicle Code"
                                            value={vehicleCode}
                                            onChange={(e) => setVehicleCode( e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="licensePlateNUmber" className="block font-medium">
                                            License Plate Number
                                        </label>
                                        <input
                                            type="text"
                                            className="form-input w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                            id="licensePlateNUmber"
                                            placeholder="Enter License Plate Number"
                                            value={LicensePlateNumber}
                                            onChange={(e) => setLicensePlateNumber(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="category" className="block font-medium">
                                            Category
                                        </label>
                                        <input
                                            type="text"
                                            className="form-input w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                            id="category"
                                            placeholder="Enter Vehicle Category"
                                            value={category}
                                            onChange={(e) => setVehicleCategory(e.target.value)}

                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="fuelType" className="block font-medium">
                                            Fuel Type
                                        </label>
                                        <input
                                            type="text"
                                            className="form-input w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                            id="fuelType"
                                            placeholder="Enter Fuel Type"
                                            value={fuelType}
                                            onChange={(e) => setFuelType(e.target.value)}

                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="allocateStaffMember" className="block font-medium">
                                            Allocate Staff Member
                                        </label>
                                        <input
                                            type="text"
                                            className="form-input w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                            id="allocateStaffMember"
                                            placeholder="Enter Allocated Staff Member"
                                            value={staffId}
                                            onChange={(e) =>
                                                setStaffId(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="remarks" className="block font-medium">
                                            Remarks
                                        </label>
                                        <input
                                            type="text"
                                            className="form-input w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                            id="remarks"
                                            placeholder="Enter Remarks"
                                            value={remarks}
                                            onChange={(e) => setRemarks( e.target.value)}

                                        />
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="flex justify-end space-x-2 px-4 py-2 border-t">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
                                onClick={AddVehicle}
                            >
                                Save
                            </button>
                            <button
                                className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-400"
                                onClick={UpdateVehicle}
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