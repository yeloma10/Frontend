// Importation des modules et composants nécessaires
import { Trash } from "lucide-react";  // Icône de suppression (Trash) depuis lucide-react
import { useEffect, useState } from "react";  // Hooks React pour la gestion des états et des effets secondaires
import { Link, useNavigate } from "react-router-dom";  // Pour la navigation entre les pages
import logo from "../assets/img/logo.png";  // Importation du logo pour l'en-tête
import DialogConfirm from "../components/Dialog";  // Importation du composant de confirmation (dialogue) pour les actions de suppression
import fetchAPI from "../utils/API.jsx";  // Utilitaire pour effectuer des appels API
import useAuthStore from "../utils/userStore.jsx";  // Utilisation du store d'authentification pour la gestion de l'état utilisateur

// Import CSS files
import "./../assets/css/admin.css";
import "./../assets/css/Admin.min.css";

// Composant principal du Dashboard Admin
export default function AdminDashboard() {
  // Déclaration des variables d'état et des hooks nécessaires
  const navigate = useNavigate();  // Hook pour la navigation programmatique
  const { logout, isLoggedIn, user } = useAuthStore((state) => state);  // Extraction des états d'authentification
  const [dialogOpen, setDialogOpen] = useState(false);  // Contrôle de l'état du dialogue de confirmation de suppression
  const [showProfileOptions, setShowProfileOptions] = useState(false);  // Contrôle de l'affichage du menu déroulant des options de profil
  const [users, setUsers] = useState([]);  // Stocke tous les utilisateurs récupérés
  const [filteredUsers, setFilteredUsers] = useState([]);  // Stocke les utilisateurs filtrés selon la requête de recherche
  const [searchQuery, setSearchQuery] = useState("");  // Stocke la requête de recherche de l'utilisateur
  const [selectedUserId, setSelectedUserId] = useState(null);  // Stocke l'ID de l'utilisateur sélectionné pour la suppression
  const [isDeconnectionOpen, setDeconnectionOpen] = useState(false);  // Contrôle l'affichage du dialogue de confirmation de déconnexion

  // Fonction de gestion de la déconnexion de l'utilisateur
  const handleLogout = () => {
    logout();  // Appel de la méthode de déconnexion du store d'authentification
   // Redirection vers la page de connexion
  };

  // Fonction pour récupérer la liste des utilisateurs (en excluant "admin")
  const fetchUsers = async () => {
    const response = await fetchAPI("account/api/all/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response) {
      const withoutAdmin = response.filter((item) => item.username !== "admin");  // Exclure l'utilisateur "admin"
      setUsers(withoutAdmin);  // Mise à jour de l'état des utilisateurs
      setFilteredUsers(withoutAdmin);  // Mise à jour de l'état des utilisateurs filtrés
    }
  };

  // Utilisation de useEffect pour exécuter des effets secondaires au montage du composant et à chaque changement de l'état de connexion
  useState(() => {
    fetchUsers();
  }, []);


  // Utilisation de useEffect pour filtrer les utilisateurs en fonction de la requête de recherche
  useEffect(() => {
    setFilteredUsers(
      users.filter(
        (user) =>
          user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, users]);

  // Fonction pour supprimer un utilisateur en fonction de son ID
  const handleDeleteUser = async (id) => {
    const response = await fetchAPI(`account/api/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response) {
      console.log("Utilisateur supprimé :", response);  // Log de la réponse de suppression
      fetchUsers();  // Recharger la liste des utilisateurs après la suppression
    }
  };

  // Ouvre le dialogue de confirmation de suppression et définit l'ID de l'utilisateur sélectionné
  const openDeleteDialog = (userId) => {
    setSelectedUserId(userId);  // Définir l'ID de l'utilisateur à supprimer
    setDialogOpen(true);  // Ouvrir le dialogue de confirmation
  };

  // Confirme la suppression de l'utilisateur et ferme le dialogue
  const confirmDeleteUser = () => {
    if (selectedUserId) {
      handleDeleteUser(selectedUserId);  // Effectuer la suppression
      setDialogOpen(false);  // Fermer le dialogue
    }
  };

  return (
    <>
      {/* En-tête avec le logo et les options de profil */}
      <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
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

            {/* Menu déroulant des options de profil avec option de déconnexion */}
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

              {/* Menu déroulant des options de profil */}
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

      {/* Contenu principal */}
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
          <div className="mx-auto max-w-screen-xl px-2 py-10">
            <div className="mt-4 w-full">
              {/* Formulaire de recherche */}
              <div className="flex w-full flex-col items-center justify-between space-y-2 sm:flex-row sm:space-y-0">
                <form className="relative flex w-full max-w-2xl items-center">
                  <svg
                    className="absolute left-2 block h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" className=""></circle>
                    <line
                      x1="21"
                      y1="21"
                      x2="16.65"
                      y2="16.65"
                      className=""
                    ></line>
                  </svg>
                  <input
                    type="text"
                    name="search"
                    className="h-12 w-full border-b-gray-400 bg-transparent py-4 pl-12 text-sm outline-none focus:border-b-2"
                    placeholder="Rechercher par nom d'utilisateur ou email"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </form>
              </div>
            </div>

            {/* Tableaux affichant les utilisateurs filtrés */}
            <div className="mt-6 overflow-hidden rounded-xl bg-white px-6 shadow lg:px-4">
              <table className="min-w-full border-collapse border-spacing-y-2 border-spacing-x-2">
                <thead className="hidden border-b lg:table-header-group">
                  <tr className="">
                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                      Nom d'utilisateur
                    </td>
                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                      Nom
                    </td>
                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                      Email
                    </td>
                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                      Action
                    </td>
                  </tr>
                </thead>

                <tbody>
                  {/* Affichage des utilisateurs filtrés */}
                  {filteredUsers.map((item) => (
                    <tr key={item.id}>
                      <td className="whitespace-no-wrap py-4 text-sm text-gray-600 sm:px-3 lg:table-cell">
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

                      {/* Bouton de suppression pour chaque utilisateur */}
                      <td className="py-4 text-sm text-gray-600">
                        <button
                          className="px-3 py-1 bg-red-500 text-white rounded"
                          onClick={() => openDeleteDialog(item.id)}
                        >
                          <Trash className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Dialogues de confirmation pour la suppression d'un utilisateur et la déconnexion */}
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
