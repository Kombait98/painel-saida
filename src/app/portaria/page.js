'use client';
import { useState, useEffect } from 'react';

export default function Portaria() {
  const [alunos, setAlunos] = useState([]);
  // Estado para controlar qual turma está expandida/aberta
  const [turmaExpandida, setTurmaExpandida] = useState(null);

  const carregarAlunos = async () => {
    const res = await fetch('/api/alunos');
    const data = await res.json();
    setAlunos(data);
  };

  useEffect(() => {
    carregarAlunos();
    const interval = setInterval(carregarAlunos, 3000); 
    return () => clearInterval(interval);
  }, []);

  const atualizarStatus = async (id, status) => {
    await fetch('/api/alunos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status })
    });
    carregarAlunos();
  };

  // Agrupa os alunos que ainda não foram entregues
  const turmasAgrupadas = alunos.reduce((acc, aluno) => {
    if (aluno.status !== 'entregue') {
      if (!acc[aluno.turma]) {
        acc[aluno.turma] = [];
      }
      acc[aluno.turma].push(aluno);
    }
    return acc;
  }, {});

  // Função que abre ou fecha uma turma ao clicar
  const toggleTurma = (nomeDaTurma) => {
    if (turmaExpandida === nomeDaTurma) {
      setTurmaExpandida(null); // Se já está aberta, fecha
    } else {
      setTurmaExpandida(nomeDaTurma); // Se está fechada, abre ela e fecha as outras
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="bg-blue-600 text-white p-4 rounded-lg shadow-md mb-6 text-center sticky top-0 z-10">
        <h1 className="text-2xl font-bold">Painel da Portaria</h1>
        <p className="text-sm text-blue-200">Selecione a turma e chame o aluno</p>
      </header>

      <div className="space-y-4 pb-10">
        {Object.keys(turmasAgrupadas).length === 0 ? (
          <p className="text-center text-gray-500 mt-10">Todos os alunos já foram entregues.</p>
        ) : (
          Object.keys(turmasAgrupadas).sort().map(nomeDaTurma => (
            <div key={nomeDaTurma} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
              
              {/* Cabeçalho da Turma (Clicável) */}
              <button 
                onClick={() => toggleTurma(nomeDaTurma)}
                className="w-full bg-slate-800 text-white p-4 font-bold text-xl flex justify-between items-center hover:bg-slate-700 transition"
              >
                <span>{nomeDaTurma}</span>
                <div className="flex items-center gap-3">
                  <span className="bg-blue-500 text-white text-sm py-1 px-3 rounded-full">
                    {turmasAgrupadas[nomeDaTurma].length} aluno(s)
                  </span>
                  <span>{turmaExpandida === nomeDaTurma ? '▲' : '▼'}</span>
                </div>
              </button>

              {/* Corpo da Turma - Só é renderizado se esta for a turmaExpandida */}
              {turmaExpandida === nomeDaTurma && (
                <div className="divide-y divide-gray-200 p-2 bg-gray-50 border-t border-gray-300">
                  {turmasAgrupadas[nomeDaTurma].map(aluno => (
                    <div key={aluno.id} className="p-4 flex flex-col md:flex-row justify-between md:items-center bg-white mb-2 rounded shadow-sm">
                      
                      <div className="mb-3 md:mb-0">
                        <h2 className="font-semibold text-gray-800 text-lg">{aluno.nome}</h2>
                        {aluno.status === 'chamado' && (
                          <span className="text-red-500 text-sm font-bold mt-1 flex items-center gap-1">🚨 Aguardando resposta da sala</span>
                        )}
                        {aluno.status === 'a_caminho' && (
                          <span className="text-green-600 text-sm font-bold mt-1 flex items-center gap-1">🟢 A caminho</span>
                        )}
                        {aluno.status === 'se_arrumando' && (
                          <span className="text-yellow-600 text-sm font-bold mt-1 flex items-center gap-1">🟡 Se arrumando</span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {/* Botão Chamar (Só aparece se estiver na sala) */}
                        {aluno.status === 'sala' && (
                          <button 
                            onClick={() => atualizarStatus(aluno.id, 'chamado')}
                            className="flex-1 md:flex-none bg-blue-500 text-white px-5 py-2 rounded-lg shadow-sm hover:bg-blue-600 font-medium active:scale-95 transition-transform"
                          >
                            Chamar
                          </button>
                        )}

                        {/* Botão Chamar Novamente (Aparece se estiver chamado ou se_arrumando) */}
                        {(aluno.status === 'chamado' || aluno.status === 'se_arrumando') && (
                          <button 
                            onClick={() => atualizarStatus(aluno.id, 'chamado')}
                            className="flex-1 md:flex-none bg-orange-500 text-white px-3 py-2 rounded-lg shadow-sm hover:bg-orange-600 font-medium active:scale-95 transition-transform text-sm flex items-center justify-center"
                          >
                            🔔 Chamar Novamente
                          </button>
                        )}

                        {/* Botão Entregar (Aparece sempre que o aluno já foi chamado, independente da resposta do professor) */}
                        {(aluno.status === 'chamado' || aluno.status === 'a_caminho' || aluno.status === 'se_arrumando') && (
                          <button 
                            onClick={() => atualizarStatus(aluno.id, 'entregue')}
                            className="flex-1 md:flex-none bg-green-500 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-green-600 font-medium active:scale-95 transition-transform flex items-center justify-center"
                          >
                            ✅ Entregar
                          </button>
                        )}
                      </div>
                      
                    </div>
                  ))}
                </div>
              )}

            </div>
          ))
        )}
      </div>
    </div>
  );
}