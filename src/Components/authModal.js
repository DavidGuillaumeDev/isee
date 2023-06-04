import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const AuthModal = ({ isOpen, onRequestClose }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [register, setRegister] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (register && password !== confirmPassword) {
            setPasswordError(true);
        } else {
            setPasswordError(false);
            // ici, vous pouvez gérer l'authentification ou l'inscription de l'utilisateur
        }
    };

    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Modal d'authentification"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded shadow-lg w-3/4 sm:w-1/2 md:w-1/3 lg:w-1/4 font-mono"
        overlayClassName="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-gray-700 text-3xl mb-4">{register ? "Inscription" : "Connexion"}</h2>
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
            {register && (
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
                    className="bg-indigo-500 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" 
                    type="submit"
                    disabled={register && password !== confirmPassword}
                >
                    {register ? "S'inscrire" : "Se connecter"}
                </button>
            </div>
        </form>
        <div className="text-center mt-4 font-mono">
            {register ? (
                <>
                    <span>Vous avez déjà un compte ?</span>
                    <button className="text-indigo-500 ml-2" onClick={() => setRegister(false)}>Se connecter</button>
                </>
            ) : (
                <>
                    <span>Vous n'avez pas de compte ?</span>
                    <button className="text-indigo-500 ml-2" onClick={() => setRegister(true)}>S'inscrire</button>
                </>
            )}
        </div>
      </Modal>
    );
};

export default AuthModal;
