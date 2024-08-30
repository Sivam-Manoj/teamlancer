import { FaWindowClose } from "react-icons/fa";
import React from "react";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
  position?: string;
}

const Modal: React.FC<ModalProps> = ({
  onClose,
  children,
  position = "top-[3.5rem] right-0 md:right-3",
}) => {
  return (
    <div
      className={`absolute ${position} z-20 bg-slate-200 p-4 rounded-lg shadow-lg`}
    >
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
      >
        <FaWindowClose className="text-xl" />
      </button>
      {children}
    </div>
  );
};

export { Modal };
