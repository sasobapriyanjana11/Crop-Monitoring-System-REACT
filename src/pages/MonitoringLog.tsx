import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store.ts";
import React, {useState} from "react";
import {addMonitoringLog, deleteMonitoringLog, updateMonitoringLog} from "../reducers/MonitoringLogSlice.tsx";

export function MonitoringLog() {
    const mlogs=useSelector((state:RootState)=>state.mLogs.mLogs);
    const dispatch=useDispatch();

    // State for managing modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);
    // Handlers
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const[newMLog,setNewMLog]=useState({
        logCode: "",
        logDate: new Date(),
        observation:"",
        observedImage:"",
        fieldCode:"",
        cropCode:"",
        staffId:""
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setNewMLog({ ...newMLog, observedImage: file.name }); // Store the file name or URL
        }
    };

    return (
        <>
            {/* Main Content */}
            <div className="col-span-12 lg:col-span-10 p-4 fixed top-[60px] w-[calc(100%-260px)] left-[250px] min-h-[calc(100vh-60px)] bg-[#f5f5f5] overflow-y-auto">
                <h1 className="text-2xl font-bold text-center my-4">Monitoring Log Management</h1>

                <div className="flex justify-between items-center mb-3">
                    <input
                        type="text"
                        className="form-input w-1/2 border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Search Monitoring Logs"
                    />
                    <button
                        onClick={openModal}
                        className="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:ring-2 focus:ring-green-400"
                    >
                        <i className="fa fa-plus"></i>
                        Add Log
                    </button>
                </div>

                <table className="table-auto w-full border border-gray-300">
                    <thead className="bg-gray-200 text-green-700">
                    <tr>
                        <th className="px-4 py-2 border">Select</th>
                        <th className="px-4 py-2 border">Log Code</th>
                        <th className="px-4 py-2 border">Log Date</th>
                        <th className="px-4 py-2 border">Observation</th>
                        <th className="px-4 py-2 border">Observed Image</th>
                        <th className="px-4 py-2 border">Field Code</th>
                        <th className="px-4 py-2 border">Crop Code</th>
                        <th className="px-4 py-2 border">Staff Id</th>
                        <th className="px-4 py-2 border">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {mlogs.map((mLog, index) => (
                        <tr key={index}>
                            <td className="px-4 py-2 border">
                                <input type="checkbox"/>
                            </td>
                            <td className="px-4 py-2 border">{mLog.logCode}</td>
                            <td className="px-4 py-2 border">{new Date(mLog.logDate).toLocaleDateString()}</td>
                            <td className="px-4 py-2 border">{mLog.observation}</td>
                            <td className="px-4 py-2 border">{mLog.observedImage || "No Image"}</td>
                            <td className="px-4 py-2 border">{mLog.fieldCode}</td>
                            <td className="px-4 py-2 border">{mLog.cropCode}</td>
                            <td className="px-4 py-2 border">{mLog.staffId}</td>
                            <td className="px-4 py-2 border">
                                <button
                                    className="text-red-500"
                                    onClick={() => {
                                        if (confirm("Are you sure you want to delete this log?")){
                                            dispatch(deleteMonitoringLog(mLog.logCode))
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
                        <div className="flex justify-between items-center px-4 py-2 border-b">
                            <h5 className="text-lg font-bold">Monitoring Log Details</h5>
                            <button
                                className="text-gray-500 hover:text-gray-700"
                                onClick={closeModal}
                            >
                                &times;
                            </button>
                        </div>
                        <div className="p-4">
                            <form id="monitoringLogForm" className="space-y-4">
                                {/* Input fields for crop details */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="fieldCode" className="block font-medium">
                                            Log Code
                                        </label>
                                        <input
                                            type="text"
                                            className="form-input w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                            id="logCode"
                                            placeholder="Enter Log Code"
                                            value={newMLog.logCode}
                                            onChange={(e) => setNewMLog({...newMLog, logCode: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="logDate" className="block font-medium">
                                            Log Date
                                        </label>
                                        <input
                                            type="text"
                                            className="form-input w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                            id="logDate"
                                            placeholder="Enter Log Date"
                                            value={newMLog.logDate.toISOString().split('T')[0]}
                                            onChange={(e) => setNewMLog({
                                                ...newMLog,
                                                logDate: new Date(e.target.value)
                                            })}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="observation" className="block font-medium">
                                            Observation
                                        </label>
                                        <input
                                            type="text"
                                            className="form-input w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                            id="observation"
                                            placeholder="Enter Observation"
                                            value={newMLog.observation}
                                            onChange={(e) => setNewMLog({...newMLog, observation: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="observedImage" className="block font-medium">
                                            Observed Image
                                        </label>
                                        <input
                                            type="file"
                                            className="form-input w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                            id="observedImage"
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="fieldCode" className="block font-medium">
                                            Field Code
                                        </label>
                                        <input
                                            type="text"
                                            className="form-input w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                            id="fieldCode"
                                            placeholder="Enter Field Code"
                                            value={newMLog.fieldCode}
                                            onChange={(e) => setNewMLog({...newMLog, fieldCode: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="cropCode" className="block font-medium">
                                            cropCode
                                        </label>
                                        <input
                                            type="text"
                                            className="form-input w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                            id="cropCode"
                                            placeholder="Enter Crop Code"
                                            value={newMLog.cropCode}
                                            onChange={(e) => setNewMLog({...newMLog, cropCode: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="staffId" className="block font-medium">
                                            Staff Id
                                        </label>
                                        <input
                                            type="text"
                                            className="form-input w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                            id="staffId"
                                            placeholder="Enter Staff Id"
                                            value={newMLog.staffId}
                                            onChange={(e) => setNewMLog({...newMLog, staffId: e.target.value})}
                                        />
                                    </div>
                                </div>


                            </form>
                        </div>
                        <div className="flex justify-end space-x-2 px-4 py-2 border-t">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
                                onClick={() => dispatch(addMonitoringLog(newMLog))}
                            >
                                Save
                            </button>
                            <button
                                className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-400"
                                onClick={() => dispatch(updateMonitoringLog(newMLog))}
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