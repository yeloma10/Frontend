// Import necessary modules
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.png";
import DialogConfirm from "../components/Dialog";
import useAuthStore from "../utils/userStore.jsx";


// Import CSS files
import "./../assets/css/admin.css";
import "./../assets/css/Admin.min.css";

export default function AdminAdmin() {
  const navigate = useNavigate();
  const { logout, user } = useAuthStore((state) => state);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  
  // Handle user logout
  const handleLogout = () => {
    logout();
  };
  
  // Render profile options (if hover on user avatar)
  const renderProfileOptions = () => (
    <div className="absolute right-0 mb-2 p-2 rounded-lg shadow-lg bg-white">
      <button
        onClick={() => setDialogOpen(true)}
        className="block text-[#569EB5] hover:text-green-700"
      >
        Déconnexion
      </button>
    </div>
  );

  // Graphical data (example)
  const areaChartData = {
    labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai'],
    datasets: [
      {
        label: 'Aperçu des gains',
        data: [4000, 5000, 7000, 2000, 9000],
        fill: true,
        backgroundColor: 'rgba(0, 123, 255, 0.2)',
        borderColor: 'rgba(0, 123, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: ['Direct', 'Social', 'Référal'],
    datasets: [
      {
        data: [55, 30, 15],
        backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
        hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
        hoverBorderColor: '#ffffff',
      },
    ],
  };

  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img
                src={logo}
                alt="Logo QuickStart"
                className="h-6 w-6 mr-2 sm:h-10 sm:w-auto"
              />
              <h1 className="text-xl font-bold text-gray-900 sm:text-sm">
                O&apos;Speech
              </h1>
            </Link>
  
            {/* Profile Avatar and Options */}
            <div
              className="relative"
              onMouseEnter={() => setShowProfileOptions(true)}
              onMouseLeave={() => setShowProfileOptions(false)}
            >
              <img
                className="h-10 rounded-full cursor-pointer"
                src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${user?.email}`}
                alt="User Avatar"
              />
              {showProfileOptions && renderProfileOptions()}
            </div>
          </div>
        </div>
      </header>
  
      {/* Main content section */}
      <main className="main">
        <section id="wrapper" style={{ marginTop: '2rem' }}>
          <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
              <div className="sidebar-brand-icon rotate-n-15">
                <i className="fas fa-laugh-wink"></i>
              </div>
              <div className="sidebar-brand-text mx-3"> Admin <sup>O'Speech</sup></div>
            </a>
            <hr className="sidebar-divider my-0" />
            <li className="nav-item active">
              <a className="nav-link" href="Admin-Dashboard">
                <i className="fas fa-fw fa-tachometer-alt"></i>
                <span>Dashboard</span>
              </a>
            </li>
            <hr className="sidebar-divider" />
            <div className="sidebar-heading"> Interface </div>
            <li className="nav-item">
              <a className="nav-link" href="Admin-client">
                <i className="fas fa-fw fa-chart-area"></i>
                <span>Clients</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="Admin-education">
                <i className="fas fa-fw fa-table"></i>
                <span>Education</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="Admin-marketing">
                <i className="fas fa-fw fa-table"></i>
                <span>Marketing</span>
              </a>
            </li>
          </ul>
  
          {/* Main Content Wrapper */}
          <div id="content-wrapper" className="d-flex flex-column" style={{ marginTop: '2rem' }}>
            <div id="content">
              <div className="container-fluid">
                <div className="row">
                  {/* Stats Cards */}
                  <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-primary shadow h-100 py-2">
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Nombres DE PERSONNES INSCRITES:</div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">2</div>
                          </div>
                          <div className="col-auto">
                            <i className="fas fa-calendar fa-2x text-gray-300"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
         
                  <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-info shadow h-100 py-2">
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Education</div>
                            <div className="row no-gutters align-items-center">
                              <div className="col-auto">
                                <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">50%</div>
                              </div>
                              <div className="col">
                                <div className="progress progress-sm mr-2">
                                  <div className="progress-bar bg-info" role="progressbar" style={{ width: "50%" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-auto">
                            <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
  
                  <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-info shadow h-100 py-2">
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Marketing</div>
                            <div className="row no-gutters align-items-center">
                              <div className="col-auto">
                                <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">50%</div>
                              </div>
                              <div className="col">
                                <div className="progress progress-sm mr-2">
                                  <div className="progress-bar bg-info" role="progressbar" style={{ width: "50%" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                              </div>
                            </div>
                          </div>
  
                          <div className="col-auto">
                            <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Charts */}
                <div className="row">
                  <div className="col-xl-8 col-lg-7">
                    <div className="card shadow mb-4">
                      <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Performance</h6>
                      </div>
                      <div className="card-body">
                        <Line data={areaChartData} />
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-4 col-lg-5">
                    <div className="card shadow mb-4">
                      <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Répartition des sources</h6>
                      </div>
                      <div className="card-body">
                        <Pie data={pieChartData} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Logout Confirmation Dialog */}
        <DialogConfirm
          isOpen={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onConfirm={handleLogout}
          message="Êtes-vous sûr de vouloir vous déconnecter ?"
        />
      </main>
    </>
  );
}

