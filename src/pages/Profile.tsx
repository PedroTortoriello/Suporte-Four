"use client"

import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import CoverOne from '../images/cover/cover-01.png';
import { useState, useEffect } from 'react';

const Profile = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userEmpresa, setUserEmpresa] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Retrieve user data from localStorage
    const storedEmail = localStorage.getItem("userEmail");
    const storedName = localStorage.getItem("userName");
    const storedEmpresa = localStorage.getItem("userEmpresa");
    
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
    if (storedName) {
      setUserName(storedName);
    }
    if (storedEmpresa) {
      setUserEmpresa(storedEmpresa);
    }
  }, []);
  return (
    
      <DefaultLayout>
        <Breadcrumb pageName="Perfil" />

        <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="relative z-20 h-35 md:h-65">
            <img
              src={CoverOne}
              alt="profile cover"
              className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
            />

          </div>
          <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">

            <div className="mt-4">
              <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
                Nome: {userName}
              </h3>
              <p className="font-medium">Empresa: {userEmpresa}</p>


              <div className="mt-5 mx-auto max-w-180">
              <h4 className="font-semibold text-black dark:text-white">
                E-mail: {userEmail}
              </h4>

              </div>


              
            </div>
          </div>
        </div>
      </DefaultLayout>
    
  );
};

export default Profile;
