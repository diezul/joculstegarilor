export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-6">Flag Quiz Game</h1>
      <p className="mb-4 text-lg">Apasă Start pentru a începe jocul</p>
      <a href="/game" className="bg-blue-500 text-white p-4 rounded-md">
        Start Joc
      </a>
    </div>
  );
}
