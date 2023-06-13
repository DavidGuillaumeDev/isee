import React, { useState, useEffect } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const AuthModal = ({ isOpen, onRequestClose }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showError, setShowError] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (username.trim() === '' || password.trim() === '') {
            setErrorMessage('Veuillez remplir tous les champs.');
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
            }, 3000);
            return;
        }
    
        if (isRegistering) {
            if (confirmPassword.trim() === '') {
                setErrorMessage('Veuillez confirmer votre mot de passe.');
                setShowError(true);
                setTimeout(() => {
                    setShowError(false);
                }, 3000);
                return;
            }
            
            if (password !== confirmPassword) {
                setPasswordError(true);
                setErrorMessage('Les mots de passe ne correspondent pas.');
                setShowError(true);
                setTimeout(() => {
                    setShowError(false);
                }, 3000);
                return;
            } else {
                setPasswordError(false);
                console.log('Inscription');
                // Traitement de l'inscription
            }
        } else {
            console.log('Connexion');
            // Traitement de la connexion ici...
        }
    };
    

    useEffect(() => {
        if (!isOpen) {
            setUsername('');
            setPassword('');
            setConfirmPassword('');
            setPasswordError(false);
            setErrorMessage('');
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
                <h2 className="text-gray-700 text-3xl mb-4">{isRegistering ? "Inscription" : "Connexion"}</h2>
                <form onSubmit={handleSubmit}>
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
                    <div className="mb-4">
                        <input
                            className="border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500 w-full text-lg py-2 mb-2 font-mono"
                            id="password"
                            type="password"
                            placeholder="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {isRegistering && (
                        <div className="mb-6">
                            <input
                                className={`border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500 w-full text-lg py-2 mb-2 font-mono ${passwordError ? "border-red-500" : ""}`}
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirmez le mot de passe"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            {passwordError && <p className="text-red-500">Les mots de passe ne correspondent pas.</p>}
                        </div>
                    )}
                    <div className="flex items-center justify-between font-mono">
                        <button
                            className="border-2 border-black hover:border-4 hover:bg-white-100 text-black font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition-all duration-200"
                            type="submit"
                            disabled={isRegistering && password !== confirmPassword}
                        >
                            {isRegistering ? "S'inscrire" : "Se connecter"}
                        </button>
                    </div>
                </form>
                <div className="text-center mt-4 font-mono">
                    {isRegistering ? (
                        <>
                            <span>Vous avez déjà un compte ?</span>
                            <button className="ml-2" onClick={() => setIsRegistering(false)}>Se connecter</button>
                        </>
                    ) : (
                        <>
                            <span>Vous n'avez pas de compte ?</span>
                            <button className="ml-2" onClick={() => setIsRegistering(true)}>S'inscrire</button>
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
