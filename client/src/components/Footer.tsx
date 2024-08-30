import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-700 w-full py-8 text-white mt-5">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-5">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-0 text-center md:text-left">
          TeamLancer
        </h2>
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
          <div className="flex space-x-4">
            <a
              href="https://github.com/Sivam-Manoj"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="text-2xl hover:text-gray-400" />
            </a>
            <a
              href="https://www.linkedin.com/in/sivammanoj"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="text-2xl hover:text-gray-400" />
            </a>
            <a
              href="mailto:manom8193@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaEnvelope className="text-2xl hover:text-gray-400" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
