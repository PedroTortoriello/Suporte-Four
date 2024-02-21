// SignUp.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdMailOutline, MdPersonOutline, MdBusiness  } from "react-icons/md";
import Button from './scripts/Button';
import Title from './scripts/Title';
import Image from './scripts/Image'; // Importe o componente Image
import Four from './four-logo.png'; // Importe a imagem Four
import Four2 from './Four-Tecnologia-Logo-footer.png'
import './StyleLogin.css'; // Estilo para a tela de login

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    empresa: '',
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aqui você pode fazer o que precisa com os dados do formulário, como enviar para o backend
    console.log(formData);
  };

  return (
    <div className="signup-page login-page"> {/* Adicione a classe login-page para compartilhar estilos */}
      <div className="flex justify-center items-center">
        <div className='boxLeft'>
          <form onSubmit={handleSubmit}>
            <div className="boxRight boxRight md:hidden w-50 h-10 items-center justify-center ">
              <Image imageLink={Four2}  />
            </div>
            <Title
              title="Suporte  Four"
            />

            <div className="input-box">
              <label htmlFor="name">Nome<i>*</i></label>
              <MdPersonOutline id="icon" className="material-icons" />
              <input
                className="input"
                name="name"
                id="name"
                type="text"
                placeholder="Digite seu nome"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-box">
              <label htmlFor="name">Empresa<i>*</i></label>
              <MdBusiness id="icon" className="material-icons" />
              <input
                className="input"
                name="empresa"
                id="empresa"
                type="text"
                placeholder="Digite o nome da Empresa"
                value={formData.empresa}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-box">
              <label htmlFor="email">Email<i>*</i></label>
              <MdMailOutline id="icon" className="material-icons" />
              <input
                className="input"
                name="email"
                id="email"
                type="email"
                placeholder="Digite seu email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-box">
              <label htmlFor="password">Senha<i>*</i></label>
              <MdPersonOutline id="icon" className="material-icons" />
              <input
                className="input"
                name="password"
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <Link to="/Table/Table">
              <Button
                name='button'
                id='button'
                type='submit'
                content="Cadastrar"
              />
            </Link>
          </form>
        </div>

        <div className="boxRight hidden md:block">
          <Image imageLink={Four}  />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
