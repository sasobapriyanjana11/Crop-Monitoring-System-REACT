import {Outlet} from "react-router";
import {Navigation} from "./Navigation.tsx";


export const RootLayout = () => {

    return (
        <div>
            <Navigation />
            <main>
                <Outlet />
            </main>
        </div>
    );
};