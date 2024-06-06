import { useState } from 'react';

const useModal = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    function openModal() {
        setModalIsOpen(true);
    }

    function closeModal() {
        setModalIsOpen(false);
    }

    return {
        modalIsOpen,
        openModal,
        closeModal,
    };
};

export default useModal;
