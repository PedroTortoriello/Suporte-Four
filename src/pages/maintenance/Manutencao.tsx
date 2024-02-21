import React, { useEffect, useState } from 'react';

const MaintenancePage = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const targetDate = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 horas no futuro
      const difference = targetDate.getTime() - now.getTime();
      
      const seconds = Math.floor((difference / 1000) % 60);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const hours = Math.floor((difference / 1000 / 3600) % 24);
      const days = Math.floor(difference / 1000 / 3600 / 24);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    const timer = setInterval(() => {
      calculateTimeLeft();
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl md:text-7xl font-bold text-[#177357] mb-4">Suporte | Four</h1>
      <p className="text-2xl md:text-4xl text-black font-bold mb-8">Em Manutenção</p>
      <p className="text-lg md:text-xl font-bold mb-8 text-black">Nosso site está em manutenção. Pedimos desculpas pelo transtorno.</p>
      <div className="flex items-center justify-center space-x-4">
        <div className="time-container">
          <div className="time-text">Dias</div>
          <div className="time-number">{timeLeft.days}</div>
        </div>
        <div className="time-container">
          <div className="time-text">Horas</div>
          <div className="time-number">{timeLeft.hours}</div>
        </div>
        <div className="time-container">
          <div className="time-text">Minutos</div>
          <div className="time-number">{timeLeft.minutes}</div>
        </div>
        <div className="time-container">
          <div className="time-text">Segundos</div>
          <div className="time-number">{timeLeft.seconds}</div>
        </div>
      </div>

    </div>
  );
};

export default MaintenancePage;
