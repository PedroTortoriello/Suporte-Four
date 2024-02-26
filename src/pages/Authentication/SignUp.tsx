import React, { useState } from 'react';
import { MdMailOutline, MdPersonOutline, MdBusiness } from "react-icons/md";
import { useForm } from 'react-hook-form';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from './scripts/api';
import Button from './scripts/Button';
import Image from './scripts/Image';
import { UserFormSchema } from './scripts/schemas';
import Four2 from './Four-Tecnologia-Logo-footer.png';
import Title from './scripts/Title';
import { Link } from 'react-router-dom';
import Four from './four-logo.png';
import DropdownUser from '../../components/Header/DropdownUser';
import { ResponseMessage } from './scripts/ResponseMessage';

type SignUpFormData = z.infer<typeof UserFormSchema>;

const SignUp: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({
    message: "",
    type: "",
  });

  // States para armazenar o nome e a empresa
  const [userName, setUserName] = useState("");
  const [userEmpresa, setUserEmpresa] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(UserFormSchema),
  });

  async function handleSignUp(data: SignUpFormData) {
    setLoading(true);

    try {
      const { confirmpassword, status, ...requestData } = data;
      const headers = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const requestDataUser = { ...requestData, status: true };

      await api.post("/novoUsuario", requestDataUser, headers).then((response) => {
        if (response.data.result === "Usuário já existe na base.") {
          setResponse({ message: response.data.result, type: "error" });
          setTimeout(() => setResponse({ message: "", type: "" }), 2100);
        } else {
          // Armazena o nome e a empresa
          setUserName(data.name);
          setUserEmpresa(data.empresa);

          window.location.href = "/Table/Table";
          localStorage.setItem("user", data.email);
        }
      });
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error.message);
    } finally {
      setLoading(false);
    }
  }
  
  
  return (
    <div className="signup-page login-page">
      <div className="flex justify-center items-center">
        <div className='boxLeft'>
          <form onSubmit={handleSubmit(handleSignUp)}>
            <div className="boxRight boxRight md:hidden w-50 h-10 items-center justify-center ">
              <Image imageLink={Four2}  />
            </div>
            <Title title="Suporte  Four" />

            <div className="input-box">
              <label htmlFor="name">Nome<i>*</i></label>
              <MdPersonOutline id="icon" className="material-icons" />
              <input
                className="input"
                {...register("name")}
                id="name"
                type="text"
                placeholder="Digite seu nome"
              />
            </div>

            <div className="input-box">
              <label htmlFor="empresa">Empresa<i>*</i></label>
              <MdBusiness id="icon" className="material-icons" />
              <input
                className="input"
                {...register("empresa")}
                id="empresa"
                type="text"
                placeholder="Digite o nome da empresa"
              />
            </div>

            <div className="input-box">
              <label htmlFor="email">Email<i>*</i></label>
              <MdMailOutline id="icon" className="material-icons" />
              <input
                className="input"
                {...register("email")}
                id="email"
                type="email"
                placeholder="Digite seu email"
              />
            </div>

            <div className="input-box">
              <label htmlFor="password">Senha<i>*</i></label>
              <MdPersonOutline id="icon" className="material-icons" />
              <input
                className="input"
                {...register("password")}
                id="password"
                type="password"
                placeholder="Digite sua senha"
              />
            </div>

            <div className="input-box">
              <label htmlFor="confirmpassword">Confirmar Senha<i>*</i></label>
              <MdPersonOutline id="icon" className="material-icons" />
              <input
                className="input"
                {...register("confirmpassword")}
                id="confirmpassword"
                type="password"
                placeholder="Confirme sua senha"
              />
            </div>

            {errors.email && <p className="error-message">{errors.email.message}</p>}
            {errors.password && <p className="error-message">{errors.password.message}</p>}
            {errors.confirmpassword && <p className="error-message">{errors.confirmpassword.message}</p>}

            {response.message !== "" && (
              <ResponseMessage message={response.message} type={response.type} />
            )}

            <div className="button-container">
              <Button
                name='button'
                id='button'
                type='submit'
                content={loading ? "Aguarde..." : "Cadastrar"}
                disabled={loading}
              />
            </div>

            <div className="signup-link">
              <p>Já possui uma conta? <Link to="/login" className='text-[#177357] font-bold'>Faça login</Link></p>
            </div>
          </form>
        </div>

        <div className="boxRight hidden md:block">
          <Image imageLink={Four}  />
        </div>
      </div>
      <DropdownUser userName={userName} userEmpresa={userEmpresa} />
    </div>
  );
};

export default SignUp;