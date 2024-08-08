import React from "react";
import { IoAddCircle } from "react-icons/io5";

interface Props {
  toggleModal: () => void;
}

const ModalButton = ({ toggleModal }: Props) => {
  return (
    <div className="flex justify-end p-5">
      <button
        onClick={toggleModal}
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        <div className="flex justify-center items-center">
          <IoAddCircle size={30} />
          Agregar Enlace
        </div>
      </button>
    </div>
  );
};

export default ModalButton;
