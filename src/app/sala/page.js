'use client';
import { useState, useEffect } from 'react';

export default function SalaDeAula() {
  const [alunosPendentes, setAlunosPendentes] = useState([]);
  // NOVO: Estado para controlar qual turma está expandida/aberta
  const [turmaExpandida, setTurmaExpandida] = useState(null); 

  const carregarAlunos = async () => {
    const res = await fetch('/api/alunos');
    const data = await res.json();
    setAlunosPendentes(data.filter(a => a.status === 'chamado' || a.status === 'se_arrumando'));
  };

  useEffect(() => {
    carregarAlunos();
    const interval = setInterval(carregarAlunos, 3000); 
    return () => clearInterval(interval);
  }, []);

  const responderPortaria = async (id, status) => {
    await fetch('/api/alunos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status })
    });
    carregarAlunos();
  };

  // NOVO: Agrupa os alunos pendentes por turma (mesma lógica da portaria)
  const turmasAgrupadas = alunosPendentes.reduce((acc, aluno) => {
    if (!acc[aluno.turma]) {
      acc[aluno.turma] = [];
    }
    acc[aluno.turma].push(aluno);
    return acc;
  }, {});

  // NOVO: Função que abre ou fecha uma turma ao clicar
  const toggleTurma = (nomeDaTurma) => {
    if (turmaExpandida === nomeDaTurma) {
      setTurmaExpandida(null); // Se já está aberta, fecha
    } else {
      setTurmaExpandida(nomeDaTurma); // Se está fechada, abre ela e fecha as outras
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="bg-indigo-600 text-white p-6 rounded-lg shadow-md mb-8">
        <h1 className="text-3xl font-bold">Painel da Sala de Aula</h1>
        <p>Selecione a turma para visualizar os alunos solicitados</p>
      </header>

      {Object.keys(turmasAgrupadas).length === 0 ? (
        <div className="text-center text-gray-500 mt-20 text-xl">
          Nenhum aluno solicitado no momento.
        </div>
      ) : (
        <div className="space-y-4">
          {Object.keys(turmasAgrupadas).sort().map(nomeDaTurma => (
            <div key={nomeDaTurma} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
              
              {/* Cabeçalho da Turma (Clicável) */}
              <button 
                onClick={() => toggleTurma(nomeDaTurma)}
                className="w-full bg-slate-800 text-white p-4 font-bold text-xl flex justify-between items-center hover:bg-slate-700 transition"
              >
                <span>{nomeDaTurma}</span>
                <div className="flex items-center gap-3">
                  {/* Mostra um selinho com a quantidade de alunos solicitados */}
                  <span className="bg-red-500 text-white text-sm py-1 px-3 rounded-full">
                    {turmasAgrupadas[nomeDaTurma].length} pendente(s)
                  </span>
                  {/* Ícone de seta apontando para cima se estiver aberto, ou para baixo se fechado */}
                  <span>{turmaExpandida === nomeDaTurma ? '▲' : '▼'}</span>
                </div>
              </button>

              {/* Corpo da Turma - Só é renderizado se esta for a turmaExpandida */}
              {turmaExpandida === nomeDaTurma && (
                <div className="p-6 bg-gray-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 border-t border-gray-300">
                  {turmasAgrupadas[nomeDaTurma].map(aluno => (
                    <div 
                      key={aluno.id} 
                      className={`bg-white p-6 rounded-xl shadow border-l-4 ${aluno.status === 'se_arrumando' ? 'border-yellow-500' : 'border-red-500'}`}
                    >
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">{aluno.nome}</h2>
                      
                      {aluno.status === 'se_arrumando' && (
                        <p className="text-yellow-600 text-sm font-bold mb-4">
                          ⏳ Aluno está se arrumando...
                        </p>
                      )}
                      {aluno.status === 'chamado' && (
                        <p className="text-red-600 text-sm font-bold mb-4">
                          🚨 Portaria chamando!
                        </p>
                      )}

                      <div className="flex space-x-2">
                        <button 
                          onClick={() => responderPortaria(aluno.id, 'a_caminho')}
                          className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600 font-semibold transition"
                        >
                          Já saiu
                        </button>
                        
                        {aluno.status === 'chamado' && (
                          <button 
                            onClick={() => responderPortaria(aluno.id, 'se_arrumando')}
                            className="flex-1 bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 font-semibold transition"
                          >
                            Arrumando
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          ))}
        </div>
      )}
    </div>
  );
}