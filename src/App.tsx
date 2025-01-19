import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {RootLayout} from "./components/RootLayout.tsx";
import {Dashboard} from "./pages/Dashboard.tsx";
import {FieldForm} from "./pages/Field.tsx";
import {EquipmentForm} from "./pages/Equipment.tsx";
import {MonitoringLogForm} from "./pages/MonitoringLog.tsx";
import {StaffForm} from "./pages/Staff.tsx";
import {User} from "./pages/User.tsx";
import {VehicleForm} from "./pages/Vehicle.tsx";
import {SignIn} from "./pages/SignIn.tsx";
import AuthLayout from "./components/AuthLayout.tsx";
import {SignUp} from "./pages/signUp.tsx";
import {CropForm} from "./pages/Crop.tsx";

function App() {
   const routes=createBrowserRouter([
       {
           path: '',
           element : <RootLayout/>,
           children : [
               { path : '', element : <Dashboard/>},
               { path : '/crop', element : <CropForm/>},
               { path : '/field', element : <FieldForm/>},
               { path : '/equipment', element : <EquipmentForm/>},
               {path:'/monitoringLog', element:<MonitoringLogForm/>},
               {path:'/staff',element:<StaffForm/>},
               {path:'/user',element:<User/>},
               {path:'/vehicle',element:<VehicleForm/>},
           ],
       },
       {
           path:"",
           element:<AuthLayout/>,
           children:[
               { path: "/login", element: <SignIn /> },
               { path: "/signup", element: <SignUp /> },
           ],
       },

   ]);

  return (
    <>
        <RouterProvider router={routes}>

        </RouterProvider>
    </>
  )
}

export default App
