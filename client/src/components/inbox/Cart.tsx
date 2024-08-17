import { FaTrashAlt, FaFolderOpen } from "react-icons/fa";

const Cart = () => {
  return (
    <div className="bg-slate-300 flex justify-between items-center mt-3 rounded-xl w-full max-w-xs md:max-w-md lg:max-w-lg p-4 mx-auto">
      <div className="flex flex-col gap-y-2 flex-1">
        <h3 className="text-sm md:text-base font-medium">
          react web application
        </h3>
        <p className="text-xs md:text-sm text-gray-600">2025-10-19</p>
      </div>

      <div className="flex gap-x-2">
        <button className="bg-blue-500 text-white p-2 rounded-xl flex items-center gap-x-2 text-sm md:text-base hover:bg-blue-600 transition">
          <FaFolderOpen />
          <span>Open</span>
        </button>
        <button className="bg-red-500 text-white p-2 rounded-xl flex items-center gap-x-2 text-sm md:text-base hover:bg-red-600 transition">
          <FaTrashAlt />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};

export default Cart;
