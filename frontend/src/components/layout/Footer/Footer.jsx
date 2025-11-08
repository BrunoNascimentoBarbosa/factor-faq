export const Footer = () => {
  return (
    <footer className="bg-[#1A323E] text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex justify-center mb-4">
          <img
            src="/assets/logo.svg"
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
