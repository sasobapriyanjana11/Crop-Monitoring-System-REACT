import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {RootLayout} from "./components/RootLayout.tsx";
import {Dashboard} from "./pages/Dashboard.tsx";
import {Crop} from "./pages/Crop.tsx";
import {Field} from "./pages/Field.tsx";
import {Equipment} from "./pages/Equipment.tsx";
import {MonitoringLog} from "./pages/MonitoringLog.tsx";
import {Staff} from "./pages/Staff.tsx";
import {User} from "./pages/User.tsx";
import {Vehicle} from "./pages/Vehicle.tsx";
import {SignIn} from "./pages/SignIn.tsx";
import AuthLayout from "./components/AuthLayout.tsx";
import {SignUp} from "./pages/signUp.tsx";

function App() {
   const routes=createBrowserRouter([
       {
           path: '',
           element : <RootLayout/>,
           children : [
               { path : '', element : <Dashboard/>},
               { path : '/crop', element : <Crop/>},
               { path : '/field', element : <Field/>},
               { path : '/equipment', element : <Equipment/>},
               {path:'/monitoringLog', element:<MonitoringLog/>},
               {path:'/staff',element:<Staff/>},
               {path:'/user',element:<User/>},
               {path:'/vehicle',element:<Vehicle/>},
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
