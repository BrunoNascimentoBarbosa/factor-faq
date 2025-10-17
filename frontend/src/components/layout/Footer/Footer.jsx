export const Footer = () => {
  return (
    <footer className="bg-secondary text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex justify-center mb-4">
          <img
            src="/assets/logo.png"
            alt="Logo"
            className="h-8 w-auto"
          />
        </div>
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} Todos os direitos reservados
        </p>
      </div>
    </footer>
  );
};
