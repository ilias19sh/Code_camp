import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers, PostUser } from '../api/ApiTemoinX';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const response = await getUsers();
        if (response.some(user => user.email === email && user.mot_de_passe === password)) {
          localStorage.setItem('isAuthenticated', true);
          navigate('/');
        } else {
            localStorage.setItem('isAuthenticated', false)
          alert('Identifiants incorrects. Veuillez réessayer.');
        }
      } else {
        // Création de compte
        await PostUser({
          pseudo: pseudo,
          email: email,
          mot_de_passe: password
        });
        alert('Compte créé avec succès !');
        setIsLogin(true);
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert(isLogin ? 'Erreur de connexion.' : 'Erreur lors de la création du compte.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            {isLogin ? 'Connexion à votre compte' : 'Créer un compte'}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            {!isLogin && (
              <div>
                <input
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Pseudo"
                  value={pseudo}
                  onChange={(e) => setPseudo(e.target.value)}
                />
              </div>
            )}
            <div>
              <input
                type="email"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 ${isLogin ? 'rounded-t-md' : ''} focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                placeholder="Adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isLogin ? 'Se connecter' : 'Créer un compte'}
            </button>
          </div>
          
          <div className="text-center">
            <button
              type="button"
              className="text-blue-600 hover:text-blue-800"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Créer un compte' : 'Déjà inscrit ? Connectez-vous'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
