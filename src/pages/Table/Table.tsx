import React, { useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import CardDataStats from '../../components/CardDataStats';
import { FaCheck, FaEnvelopeOpen } from 'react-icons/fa';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { PlusCircle } from 'lucide-react';

function TicketTable() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    sistema: '',
    question: ''
  });
  const [openTickets, setOpenTickets] = useState([]); // Estado para armazenar os atendimentos em aberto
  const [openTicketsCount, setOpenTicketsCount] = useState(0); // Estado para contar o número de atendimentos em aberto
  const [completedTicketsCount, setCompletedTicketsCount] = useState(0); // Estado para contar o número de atendimentos realizados
  const [editingTicketIndex, setEditingTicketIndex] = useState(null); // Estado para controlar o ticket em edição

  const handleOpenModal = () => {
    setShowModal(true);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTicketIndex(null); // Limpar o índice do ticket em edição ao fechar o modal
    setFormData({ // Limpar o formulário ao fechar o modal
      name: '',
      email: '',
      sistema: '',
      question: ''
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Função para gerar um código aleatório numérico
  function generateRandomCode() {
    const min = 1000; // Valor mínimo do código
    const max = 9999; // Valor máximo do código
    return Math.floor(Math.random() * (max - min + 1)) + min; // Gera um número aleatório entre min e max
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Gerar um código aleatório para o atendimento
    const codigo = generateRandomCode();
    // Adicionar o código aos dados do atendimento
    const ticketData = { ...formData, codigo };
    if (editingTicketIndex !== null) {
      // Se estiver editando um ticket, substitua-o no array de tickets abertos
      const updatedOpenTickets = [...openTickets];
      updatedOpenTickets[editingTicketIndex] = ticketData;
      setOpenTickets(updatedOpenTickets);
      setEditingTicketIndex(null);
    } else {
      // Adicionar os dados do novo atendimento em aberto ao estado
      setOpenTickets([...openTickets, ticketData]);
      // Incrementar o contador de atendimentos em aberto
      setOpenTicketsCount(openTicketsCount + 1);
    }
    // Limpar o formulário e fechar o modal
    setFormData({
      name: '',
      email: '',
      sistema: '',
      question: ''
    });
    setShowModal(false);
  
    // Enviar dados para o backend
    try {
      const response = await fetch('http://localhost:5173/backend', { // <-- URL correta
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ticketData)
      });
      if (!response.ok) {
        throw new Error('Erro ao enviar e-mail');
      }
      console.log('E-mail enviado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
    }
  };

  const handleCheckboxChange = (index) => {
    // Remover o atendimento em aberto que foi concluído
    const updatedOpenTickets = [...openTickets];
    updatedOpenTickets.splice(index, 1);
    setOpenTickets(updatedOpenTickets);
    // Decrementar o contador de atendimentos em aberto
    setOpenTicketsCount(openTicketsCount - 1);
    // Incrementar o contador de atendimentos realizados
    setCompletedTicketsCount(completedTicketsCount + 1);
  };

  const handleEditTicket = (index) => {
    setEditingTicketIndex(index);
    setShowModal(true);
    // Preencher o formulário com os dados do ticket selecionado
    const ticket = openTickets[index];
    setFormData({
      name: ticket.name,
      email: ticket.email,
      sistema: ticket.sistema,
      question: ticket.question
    });
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
                  <span className="text-sm font-semibold text-black">Nome</span>
                </div>
              </th>
              <th className="py-6 px-6 whitespace-nowrap bg-sky-700">
                <div className="flex flex-row items-center justify-center">
                  <span className="text-sm font-semibold text-black">Empresa</span>
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
            </tr>
          </thead>
          <tbody>
            {openTickets.map((ticket, index) => (
              <tr key={index} className="bg-zinc-50 text-zinc-800 hover:text-blue-500 text-sm font-light hover:bg-blue-100 border-b border-sky-700" onClick={() => handleEditTicket(index)}>
                <td className="cursor-pointer whitespace-nowrap text-center ">
                  <div className="py-2">
                    <span className="px-1 py-1">{ticket.codigo}</span>
                  </div>
                </td>
                <td className="cursor-pointer whitespace-nowrap text-center ">
                  <div className="py-2">
                    <span className="px-1 py-1">{ticket.name}</span>
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
          <div className=" p-8 w-100 rounded-lg absolute right-0 bottom-0 bg-sky-700">
            <h2 className="text-[20px] font-bold mb-4 text-black">{editingTicketIndex !== null ? 'Editar Ticket' : 'Envie sua dúvida'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-15 font-bold text-black">Nome</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-15 font-bold text-black">Empresa</label>
                <input type="text" id="email" name="email" value={formData.email} onChange={handleInputChange} className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
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
