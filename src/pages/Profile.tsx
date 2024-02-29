import React, { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import CoverOne from '../images/Four/Fundo-Video-Chamada.jpg';
 
const Profile = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userEmpresa, setUserEmpresa] = useState("");
  const [userName, setUserName] = useState("");
 
  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    const name = localStorage.getItem("userName");
    const empresa = localStorage.getItem("userEmpresa");
   
    if (email && name && empresa) {
      setUserEmail(email);
      setUserName(name);
      setUserEmpresa(empresa);
    }
  }, []);
 
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Perfil" />
 
      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark flex flex-col md:flex-row">
        <div className="relative z-20 flex-1 h-60 md:h-80">
          <img
            src={CoverOne}
            alt="profile cover"
            className="h-full w-full rounded-tl-sm rounded-bl-sm object-cover object-center"
          />
        </div>
        <div className="flex-1 px-4 pb-6 text-center justify-center items-center lg:pb-8 xl:pb-11.5">
          <div className="mt-30 text-center justify-center">
            <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
              E-mail: {userEmail}
            </h3>
            <p className="font-medium">Empresa: {userEmpresa}</p>
          </div>
        </div>
 
      </div>
 
    </DefaultLayout>
  );
};
 
export default Profile;
 