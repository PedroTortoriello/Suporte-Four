import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdMailOutline, MdPersonOutline } from "react-icons/md";
import Button from './scripts/Button';
import Title from  './scripts/Title';
import Image from './scripts/Image';
import './StyleLogin.css';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Inicializado como false

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleLogin = async (email: string, password: string) => {
    try {
        const response = await fetch('http://localhost:3033/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        if (!response.ok) {
            throw new Error('Failed to login');
        }
        const data = await response.json();
        // Se o login for bem-sucedido, atualize o estado isAuthenticated para true
        setIsAuthenticated(true);
    } catch (error) {
        console.error('Login Error:', error.message);
        // Exibir mensagem de erro mais específica
        setError('Failed to login: ' + error.message);
    }
  };

  return (
    <div className="login-page"> 
      <div className="flex justify-center items-center">
        <div className='boxLeft'>
          <form onSubmit={(e) => {
              e.preventDefault(); // Evitar o comportamento padrão do formulário
              handleLogin(email, password); // Chamar a função de login
            }}>
            <Title
              title="Suporte  Four"
            />

            <div className="input-box">
              <label htmlFor="email">Email<i>*</i></label>
              <MdMailOutline id="icon" className="material-icons" />
              <input
                className="input"
                name="email"
                id="email"
                type="email"
                placeholder="Digite seu email"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>

            <div className="input-box">
              <label htmlFor="pswd">Senha<i>*</i></label>
              <MdPersonOutline id="icon" className="material-icons" />
              <input
                className="input"
                name="pswd"
                id="pswd"
                placeholder='Digite sua Senha'
                type={isPasswordVisible ? "text" : "password"} 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="button-container">
              {/* Botão de login condicional com base no estado de autenticação */}
              <Button
                name="button"
                id="button"
                type="submit"
                content={isAuthenticated ? "Logged In" : "Login"}
                target="_blank"
              />
            </div>

            <div className="signup-link">
              <Link to="/auth/signup">
                <p>Ainda não possui conta? <span className='text-[#177357] font-bold'>Cadastre-se</span></p>
              </Link>
            </div>
          </form>
        </div>

        <div className="boxRight hidden md:block">
          {/* Aqui você pode renderizar uma imagem ou outro conteúdo */}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
