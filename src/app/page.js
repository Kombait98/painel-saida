import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 gap-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Sistema de Saída Escolar</h1>
      
      <Link href="/portaria" className="bg-blue-600 text-white px-8 py-4 rounded-lg text-xl font-bold shadow-lg hover:bg-blue-700 w-64 text-center">
        Acessar Portaria
      </Link>
      
      <Link href="/sala" className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-xl font-bold shadow-lg hover:bg-indigo-700 w-64 text-center">
        Acessar Sala de Aula
      </Link>
    </div>
  );
}