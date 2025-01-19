import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store.ts";
import React, {useState} from "react";
import {addMonitoringLog, deleteMonitoringLog, updateMonitoringLog} from "../reducers/MonitoringLogSlice.tsx";
import {MonitoringLog} from "../models/MonitoringLog.ts";

export const MonitoringLogForm=()=> {

    const dispatch=useDispatch();
    const [logCode, setLogCode] = useState("");
    const [logDate, setLogDate] = useState("");
    const [observation, setObservation] = useState("");
    const [observedImage, setObservedImage] = useState("");
    const[cropCode,setCropCode]=useState("");
    const[fieldCode,setFieldCode]=useState("");
    const[staffId,setStaffId]=useState("");
    const mlogs=useSelector((state:RootState)=>state.mLogs.mLogs);

    // State for managing modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);
    // Handlers
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    // image preview
    const [monitoringImagePreview, setMonitoringImagePreview] = useState("");
    const handleImageChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setMonitoringImagePreview(event.target.result);
            };
            reader.readAsDataURL(file);
            setObservedImage(file);
        } else {
            setMonitoringImagePreview("");
        }
    };
    //add monitoring
    function AddMonitoring(e:React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        const newMonitoring = {logCode,logDate,observation,observedImage,cropCode,fieldCode,staffId};
        dispatch(addMonitoringLog(newMonitoring));
        alert("Log was added Successfully!");
        clear();
       closeModal();
    }

    //update monitoring
    function handleRowClick(monitoring:MonitoringLog) {
        setLogCode(monitoring.logCode);
        setLogDate(monitoring.logDate);
        setObservation(monitoring.observation);
        setCropCode(monitoring.cropCode);
        setStaffId(monitoring.staffId);
        setFieldCode(monitoring.fieldCode);
        setObservedImage(monitoring.observedImage);
        openModal();
    }


    function UpdateMonitoring() {
        const updatedMonitoring = {logCode,logDate,observation,observedImage,cropCode,fieldCode,staffId};
        dispatch(updateMonitoringLog(updatedMonitoring));
        alert("Log was updated Successfully!");
        clear();
        closeModal();
    }

    //delete log
    function DeleteMonitoring(logCode:string) {
        alert("Log was deleted Successfully!");
        dispatch(deleteMonitoringLog(logCode));
        closeModal();
    }
    function clear(){
        setLogCode("");
        setLogDate("");
        setObservation("");
        setCropCode("");
        setObservedImage("");
        setFieldCode("");
        setStaffId("");
    }

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
                    {mlogs.map((mLog) => (
                        <tr key={mLog.logCode}>
                            <td className="px-4 py-2 border">
                                <input type="checkbox"/>
                            </td>
                            <td className="px-4 py-2 border">{mLog.logCode}</td>
                            <td className="px-4 py-2 border">{new Date(mLog.logDate).toLocaleDateString()}</td>
                            <td className="px-4 py-2 border">{mLog.observation}</td>
                            <td className="h-16 w-16 object-cover rounded-md">{mLog.observedImage &&
                                <img src={monitoringImagePreview} alt=" Image "
                                     className="h-16 w-16 object-cover rounded-md"/>}</td>
                            <td className="px-4 py-2 border">{mLog.fieldCode}</td>
                            <td className="px-4 py-2 border">{mLog.cropCode}</td>
                            <td className="px-4 py-2 border">{mLog.staffId}</td>
                            <td className="px-4 py-2 border">
                                <button
                                    className="text-purple-500"
                                    onClick={() => {
                                        handleRowClick(mLog)

                                    }
                                    }
                                >
                                    Update
                                </button>
                                <button
                                    className="text-red-500"
                                    onClick={() => {
                                        DeleteMonitoring(mLog.logCode)

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
                                            className="form-input w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                            id="logCode"
                                            placeholder="Enter Log Code"
                                            value={logCode}
                                            onChange={(e) => setLogCode(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="logDate" className="block font-medium">
                                            Log Date
                                        </label>
                                        <input
                                            type="date"
                                            className="form-input w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                            id="logDate"
                                            placeholder="Enter Log Date"
                                            value={logDate}
                                            onChange={(e) => setLogDate(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="observation" className="block font-medium">
                                            Observation
                                        </label>
                                        <input
                                            type="text"
                                            className="form-input w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                            id="observation"
                                            placeholder="Enter Observation"
                                            value={observation}
                                            onChange={(e) => setObservation( e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="observedImage" className="block font-medium">
                                            Observed Image
                                        </label>
                                        <input
                                            type="file"
                                            className="form-input w-full border bg-white border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-200 file:text-green-800 hover:file:bg-green-200"
                                            id="observedImage"
                                            onChange={handleImageChange}
                                        />
                                        {monitoringImagePreview && (
                                            <div className="mt-4">
                                                <img src={monitoringImagePreview} alt="Preview"
                                                     className="h-32 w-32 object-cover rounded-md"/>

                                            </div>
                                            )}
                                    </div>
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
                                        <label htmlFor="cropCode" className="block font-medium">
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
                                </div>


                            </form>
                        </div>
                        <div className="flex justify-end space-x-2 px-4 py-2 border-t">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
                                onClick={AddMonitoring}
                            >
                                Save
                            </button>
                            <button
                                className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-400"
                                onClick={UpdateMonitoring}
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