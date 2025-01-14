import "./Dashbord.css"
import "../assets/styles/Dashboard.css"
export function Dashboard() {

    return (
        <>
            <div className="container">
                <div className="topbar">
                    <div className="logo">
                        <h1> GREEN SHADOW </h1>
                    </div>
                    <div className="searchbar">
                        <label htmlFor="search"> <i className="fas fa-search search-icon"></i></label>
                        <input
                            type="text"
                            className="form-input w-1/2 border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Search"
                        />
                    </div>
                    <i className="fas fa-bell notification-icon"></i>
                    <div className="user">
                        <img src="../assets/images/profile_pic.jpeg" alt="profile pic"/>
                    </div>
                </div>
                {/*main class*/}
                <div className="main">
                    <div className="cards">
                        <div className="card">
                            <div className="card-content">
                                <div className="number">10+</div>
                                <div className="card-name">Vehicles</div>
                            </div>
                            <div className="icon-box">
                                <i className="fas fa-truck vehicle-icon"></i>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-content">
                                <div className="number">100</div>
                                <div className="card-name">Employee</div>
                            </div>
                            <div className="icon-box">
                                <i className="fas fa-user-graduate"></i>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-content">
                                <div className="number">50+</div>
                                <div className="card-name">Crops</div>
                            </div>
                            <div className="icon-box">
                                <i className="fas fa-seedling field-icon"></i>
                            </div>
                        </div>

                    </div>
                    <div className="charts">
                        <div className="chart">
                            <h2>Growing speed (past 6 months)</h2>
                            <canvas id="lineChart"></canvas>
                        </div>
                        <div className="chart" id="doughnut-chart">
                            <h2>System Data</h2>
                            <canvas id="doughnut"></canvas>
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
        ;
}
