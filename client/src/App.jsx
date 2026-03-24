import ChatPage from "./pages/ChatPage";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      
      {/* Header */}
      <header className="bg-white shadow-md px-6 py-4 flex items-center justify-center">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">
          AI Flow Builder
        </h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative">
        <ChatPage />
      </main>
    </div>
  );
};

export default App;