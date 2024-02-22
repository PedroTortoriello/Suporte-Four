"use client"

import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdMailOutline, MdPersonOutline, MdOutlineVisibility  } from "react-icons/md";
import Four from './four-logo.png';
import Four2 from './Four-Tecnologia-Logo-footer.png'
import Button from './scripts/Button';
import Title from  './scripts/Title';
import Image from './scripts/Image';
import './StyleLogin.css';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5173/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        const errorMessage = await response.json();
        throw new Error(errorMessage.error || 'Erro ao fazer login');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  
  return (
    <div className="login-page"> 
      <div className="flex justify-center items-center">
        <div className='boxLeft'>
          <form onSubmit={handleLogin}>
            <div className="boxRight boxRight md:hidden w-50 h-10 items-center justify-center ">
              <Image imageLink={Four2}  />
            </div>
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
              {isAuthenticated ? (
                <Link to="/Table/Table">
                  <Button
                    name="button"
                    id="button"
                    type="submit"
                    content="Login"
                    target="_blank"
                  />
                </Link>
              ) : (
                <Button
                  name="button"
                  id="button"
                  type="submit"
                  content="Login"
                  target="_blank"
                />
              )}
            </div>

          <div className="signup-link">
            <Link to="/auth/signup">
              <p>Ainda não possui conta? <span className='text-[#177357] font-bold'>Cadastre-se</span>    </p>
            </Link>
          </div>
          </form>
        </div>

        <div className="boxRight hidden md:block">
          <Image imageLink={Four}  />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
