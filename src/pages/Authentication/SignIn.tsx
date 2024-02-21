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
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
  }
  
  return (
    <div className="login-page"> {/* Envolve todo o conteúdo da página de login */}
      <div className="flex justify-center items-center">
        <div className='boxLeft'>
          <form>
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
              />

          </div>

          <div className="button-container">
            <Link to="/Table/Table">
              <Button
                name='button'
                id='button'
                type='submit' 
                content="Login"
                target="_blank"
              />
            </Link>
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
