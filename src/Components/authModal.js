import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { login, registerUser } from "../Api/usersApi";
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root");

const AuthModal = ({ isOpen, onRequestClose }) => {
  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilPicture, setProfilPicture] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);

  const navigate = useNavigate();

  // const handleSubmit = (event) => {
  //     console.log('handleSubmit');
  //     event.preventDefault();
  //     if (isRegistering) {
  //         if (password !== confirmPassword) {
  //             setPasswordError(true);
  //             setErrorMessage('Les mots de passe ne correspondent pas.');
  //             console.log('Mdp Different');
  //             setShowError(true);
  //             setTimeout(() => {
  //                 setShowError(false);
  //             }, 3000);
  //         } else {
  //             setPasswordError(false);
  //             console.log('inscription');
  //             // Traitement de l'inscription
  //         }
  //     }
  // };

  const handleLogin = async () => {
    
    login(email, password);
    navigate("/", { replace: true });
    setTimeout(() => {
      window.location.reload();
    }, 1000); // Délai de 1 seconde
  };

  const handleRegister = async (username, email, password, profilPicture) => {
    registerUser(username, email, password, profilPicture);
    setIsRegistering(false);
      
    console.log(username, email, password, "INSCRIS");
  };

  const handleSubmit = () => {
    if (isRegistering) {
      if (password !== confirmPassword) {
        setPasswordError(true);
        setErrorMessage("Les mots de passe ne correspondent pas.");
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 3000);
      } else {
        setPasswordError(false);
        handleRegister(username, email, password, profilPicture);
      }
    } else {
      handleLogin(email, password);
    }
  };
  

  const handleKeyPress = (event) => {
    console.log(event)
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit();
    }
  };
  useEffect(() => {
    if (!isOpen) {
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setPasswordError(false);
      setErrorMessage("");
      setShowError(false);
    }
  }, [isOpen]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Modal d'authentification"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded shadow-lg w-3/4 sm:w-1/2 md:w-1/3 lg:w-1/4 font-mono"
        overlayClassName="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-gray-700 text-3xl mb-4">
          {isRegistering ? "Inscription" : "Connexion"}
        </h2>
        {isRegistering && (
          <>
            <label className="block mb-6">
              <span className="text-gray-700">Image de profil</span>
              <input
                type="file"
                name="profilPicture"
                className="mt-1 block w-full text-lg bg-gray-100 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                onChange={(e) => setProfilPicture(e.target.files[0])}
              />
            </label>
            <div className="mb-4">
              <input
                className="border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500 w-full text-lg py-2 mb-2 font-mono"
                id="username"
                type="text"
                placeholder="Nom d'utilisateur"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </>
        )}
        <div className="mb-4">
          <input
            className="border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500 w-full text-lg py-2 mb-2 font-mono"
            id="Email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            className="border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500 w-full text-lg py-2 mb-2 font-mono"
            id="password"
            type="password"
            placeholder="Mot de passe"
            value={password}
            onKeyDown={handleKeyPress}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {isRegistering && (
          <div className="mb-6">
            <input
              className={`border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500 w-full text-lg py-2 mb-2 font-mono ${
                passwordError ? "border-red-500" : ""
              }`}
              id="confirmPassword"
              type="password"
              placeholder="Confirmez le mot de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {passwordError && (
              <p className="text-red-500">
                Les mots de passe ne correspondent pas.
              </p>
            )}
          </div>
        )}
        <div className="flex items-center justify-between font-mono">
          <button
            className="border-2 border-black hover:border-4 hover:bg-white-100 text-black font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition-all duration-200"
            disabled={isRegistering && password !== confirmPassword}
            type="submit"
            onClick={handleSubmit}

          >
            {isRegistering ? "S'inscrire" : "Se connecter"}
          </button>
        </div>
        <div className="text-center mt-4 font-mono">
          {isRegistering ? (
            <>
              <span>Vous avez déjà un compte ?</span>
              <button className="ml-2" onClick={() => setIsRegistering(false)}>
                Se connecter
              </button>
            </>
          ) : (
            <>
              <span>Vous n'avez pas de compte ?</span>
              <button className="ml-2" onClick={() => setIsRegistering(true)}>
                S'inscrire
              </button>
            </>
          )}
        </div>
      </Modal>
      {showError && (
        <div className="fixed bottom-4 right-4 bg-red-600 text-white p-4 rounded shadow-lg w-64 transition-all duration-500 ease-in-out">
          {errorMessage}
        </div>
      )}
    </>
  );
};

export default AuthModal;
