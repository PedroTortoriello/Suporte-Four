import React, { useState, ChangeEvent } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import CardDataStats from '../../components/CardDataStats';
import { FaCheck, FaEdit, FaEnvelopeOpen } from 'react-icons/fa';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { PlusCircle } from 'lucide-react';
import api from '../Authentication/scripts/api';

function TicketTable({ loggedInEmail }: { loggedInEmail: string }) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    email: loggedInEmail, // Preenche automaticamente com o e-mail logado
    sistema: '',
    question: ''
  });
  const [openTickets, setOpenTickets] = useState<any[]>([]);
  const [openTicketsCount, setOpenTicketsCount] = useState(0);
  const [completedTicketsCount, setCompletedTicketsCount] = useState(0);
  const [editingTicketIndex, setEditingTicketIndex] = useState<number | null>(null);

  const headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTicketIndex(null);
    setFormData({
      email: loggedInEmail, // Mantém o e-mail logado
      sistema: '',
      question: ''
    });
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  function generateRandomCode() {
    const min = 1000;
    const max = 9999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const codigo = generateRandomCode();
    const ticketData = { ...formData, codigo };
  
    try {
      // Fazer uma requisição POST para a rota '/ticket' no backend
      await api.post('/ticket', ticketData, headers);
  
      // Atualizar o estado do componente com os tickets após a criação bem sucedida
      setOpenTickets([...openTickets, ticketData]); // Adiciona o novo ticket à lista de tickets
  
      // Limpar o formulário e fechar o modal
      setFormData({
        email: loggedInEmail, // Mantém o e-mail logado
        sistema: '',
        question: ''
      });
      setShowModal(false);
    } catch (error) {
      console.error('Erro ao enviar ticket:', error);
    }
  };


  const handleCheckboxChange = (index: number) => {
    const updatedOpenTickets = [...openTickets];
    updatedOpenTickets.splice(index, 1);
    setOpenTickets(updatedOpenTickets);
    setOpenTicketsCount(openTicketsCount - 1);
    setCompletedTicketsCount(completedTicketsCount + 1);
  };

  const handleEditTicket = (index: number, event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
    if ((event.target as HTMLInputElement).type !== 'checkbox') {
      setEditingTicketIndex(index);
      setShowModal(true);
      const ticket = openTickets[index];
      setFormData({
        email: ticket.email,
        sistema: ticket.sistema,
        question: ticket.question
      });
    }
  };

  
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Atendimentos" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 font-900">
        <CardDataStats title="Atendimentos em Aberto" total={openTicketsCount}>
          <FaEnvelopeOpen />
        </CardDataStats>
        <CardDataStats title="Atendimentos Realizados" total={completedTicketsCount}>
          <FaCheck />
        </CardDataStats>
      </div>
      <div className="mt-20 relative w-full overflow-x-auto overscroll-y-auto border-1 shadow-md sm:rounded-xl" style={{ maxHeight: 'calc(-100px + 100vh)' }}>
        <table className="table w-full py-5 text-xs">
          <thead className="sticky top-0 bg-sky-700 text-xs">
            <tr>
              <th className="py-6 px-6 whitespace-nowrap bg-sky-700">
                <div className="flex flex-row items-center justify-center">
                  <span className="text-sm font-semibold text-black">Código</span>
                </div>
              </th>
              <th className="py-6 px-6 whitespace-nowrap bg-sky-700">
                <div className="flex flex-row items-center justify-center">
                  <span className="text-sm font-semibold text-black">E-mail</span>
                </div>
              </th>
              <th className="py-6 px-6 whitespace-nowrap bg-sky-700">
                <div className="flex flex-row items-center justify-center">
                  <span className="text-sm font-semibold text-black">Sistema</span>
                </div>
              </th>
              <th className="py-6 px-6 whitespace-nowrap bg-sky-700">
                <div className="flex flex-row items-center justify-center">
                  <span className="text-sm font-semibold text-black">Situação</span>
                </div>
              </th>
              <th className="py-6 px-6 whitespace-nowrap bg-sky-700">
                <div className="flex flex-row items-center justify-center">
                  <span className="text-sm font-semibold text-black"></span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {openTickets.map((ticket, index) => (
              <tr key={index} className="bg-zinc-50 text-zinc-800 hover:text-blue-500 text-sm font-light hover:bg-blue-100 border-b border-sky-700" onClick={(event) => handleEditTicket(index, event)}>
                <td className="cursor-pointer whitespace-nowrap text-center ">
                  <div className="py-2">
                    <span className="px-1 py-1">{ticket.codigo}</span>
                  </div>
                </td>
                <td className="cursor-pointer whitespace-nowrap text-center">
                  <div className="py-2">
                    <span className="px-1 py-1">{ticket.email}</span>
                  </div>
                </td>
                <td className="cursor-pointer whitespace-nowrap text-center ">
                  <div className="py-2">
                    <span className="px-1 py-1">{ticket.sistema}</span>
                  </div>
                </td>
                <td className="cursor-pointer whitespace-nowrap text-center ">
                  <div className="py-2">
                    <input 
                      type="checkbox" 
                      id={`ticket-${index}`} 
                      name={`ticket-${index}`} 
                      value="Concluído" 
                      onChange={() => handleCheckboxChange(index)} 
                    />
                  </div>
                </td>
                <td className="cursor-pointer whitespace-nowrap text-center ">
                  <div className="py-2">
                    <span className="px-1 py-1 "><FaEdit /></span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!showModal && (
        <button onClick={handleOpenModal} className="fixed bottom-8 right-8 bg-sky-700 w-16 h-16 flex items-center justify-center rounded-full shadow-md hover:bg-green-600 cursor-pointer">
          <PlusCircle className='text-white'/>
        </button>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="p-8 w-100 rounded-lg absolute right-0 bottom-0 bg-sky-700">
            <button onClick={handleCloseModal} className="absolute top-2 right-2 text-white hover:text-gray-200">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-[20px] font-bold mb-4 text-black">{editingTicketIndex !== null ? 'Editar Ticket' : 'Envie sua dúvida'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-15 font-bold text-black">E-mail</label> {/* Alterado de name para email */}
                <input type="text" id="email" name="email" value={loggedInEmail} onChange={handleInputChange} className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" readOnly />
              </div>
              <div className="mb-4">
                <label htmlFor="sistema" className="block text-15 font-bold text-black">Sistema</label>
                <select id="sistema" name="sistema" value={formData.sistema} onChange={handleInputChange} className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                  <option value="">Selecione o sistema</option>
                  <option value="Amie">Amie</option>
                  <option value="Site Four">Site Four</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="question" className="block text-15 font-bold text-black">Dúvida</label>
                <textarea 
                  id="question" 
                  name="question" 
                  value={formData.question} 
                  onChange={handleInputChange} 
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 "  
                  style={{ maxHeight: '150px' }}
                />
              </div>
              <button type="submit" className="bg-sky-700 text-white px-4 py-2 rounded-md hover:bg-blue-600">{editingTicketIndex !== null ? 'Salvar' : 'Enviar'}</button>
            </form>
          </div>
        </div>
      )}

    </DefaultLayout>
  );
}

export default TicketTable;
