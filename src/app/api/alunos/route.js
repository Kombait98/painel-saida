import { NextResponse } from 'next/server';

// Atualizamos os dados para refletir o seu exemplo
let alunos = [
  { id: 1, nome: "Fulano de tal", turma: "Turma A", status: "sala" },
  { id: 2, nome: "Ciclano", turma: "Turma A", status: "sala" },
  { id: 3, nome: "Runos", turma: "Turma B", status: "sala" },
  { id: 4, nome: "Lomas Jones", turma: "Turma B", status: "sala" },
  { id: 5, nome: "Joãozinho", turma: "Turma C", status: "sala" },
  { id: 6, nome: "Mariazinha", turma: "Turma C", status: "sala" },
];

export async function GET() {
  return NextResponse.json(alunos);
}

export async function POST(request) {
  const { id, status } = await request.json();
  
  alunos = alunos.map(aluno => 
    aluno.id === id ? { ...aluno, status } : aluno
  );
  
  return NextResponse.json({ success: true });
}