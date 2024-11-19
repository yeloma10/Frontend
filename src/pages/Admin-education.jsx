import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png";
import DialogConfirm from "../components/Dialog";
import fetchAPI from "../utils/API.jsx";
import useAuthStore from "../utils/userStore.jsx";
// Import CSS files
import "./../assets/css/admin.css";
import "./../assets/css/Admin.min.css";

export default function AdminEducation() {
  const { logout, user } = useAuthStore((state) => state);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isDeconnectionOpen, setDeconnectionOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const fetchUsers = async () => {
    const response = await fetchAPI("account/api/all/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response) {
      const withoutAdmin = response.filter((item) => item.username !== "admin");
      setUsers(withoutAdmin);
      setFilteredUsers(withoutAdmin);
    }
  };

  // Fetch users when the component is mounted
  useState(() => {
    fetchUsers();
  }, []);

  useState(() => {
    setFilteredUsers(
      users.filter(
        (user) =>
          user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, users]);

  const handleDeleteUser = async (id) => {
    const response = await fetchAPI(`account/api/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response) {
      console.log("User deleted:", response);
      fetchUsers();
    }
  };

  const openDeleteDialog = (userId) => {
    setSelectedUserId(userId);
    setDialogOpen(true);
  };

  const confirmDeleteUser = () => {
    if (selectedUserId) {
      handleDeleteUser(selectedUserId);
      setDialogOpen(false);
    }
  };

  return (
    <>
      <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center">
              <img
                src={logo}
                alt="QuickStart Logo"
                className="h-6 w-6 mr-2 sm:h-10 sm:w-auto"
              />
              <h1 className="text-xl font-bold text-gray-900 sm:text-sm">
                O&apos;Speech
              </h1>
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setShowProfileOptions(true)}
              onMouseLeave={() => setShowProfileOptions(false)}
            >
              <img
                className="h-10 rounded-full cursor-pointer"
                src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${user?.email}`}
                alt="Logo"
              />

              {showProfileOptions && (
                <div className="card absolute right-0 mb-2- p-2 rounded-lg shadow-lg">
                  <button
                    onClick={() => setDeconnectionOpen(true)}
                    className="block text-[#569EB5] hover:text-green-700"
                  >
                    Déconnexion
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <section id="wrapper"  style={{ marginTop: '4rem' }}>
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

        <div className="w-screen bg-gray-50">
          <div className="mt-6 overflow-hidden rounded-xl bg-white px-6 shadow lg:px-4">
            <table className="min-w-full border-collapse border-spacing-y-2 border-spacing-x-2">
              <thead className="hidden border-b lg:table-header-group">
                <tr className="">
                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                    Username
                  </td>
                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                    Texte
                  </td>
                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                    Langue
                  </td>
                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                    Voix
                  </td>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((item, index) => (
                  <tr key={index} className="">
                    <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
                      {item.username}
                    </td>
                    <td className="whitespace-no-wrap hidden py-4 text-left text-sm text-gray-600 sm:px-3 lg:table-cell">
                      {item.first_name}
                    </td>
                    <td className="whitespace-no-wrap hidden py-4 text-left text-sm text-gray-600 sm:px-3 lg:table-cell">
                      {item.last_name}
                    </td>
                    <td className="whitespace-no-wrap hidden py-4 text-left text-sm text-gray-600 sm:px-3 lg:table-cell">
                      {item.email}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <DialogConfirm
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={confirmDeleteUser}
        title="Confirmer la suppression"
        content="Voulez-vous vraiment supprimer cet utilisateur ?"
      />

      <DialogConfirm
        isOpen={isDeconnectionOpen}
        onClose={() => setDeconnectionOpen(false)}
        onConfirm={handleLogout}
        message="Êtes-vous sûr de vouloir vous déconnecter ?"
      />
    </>
  );
}
