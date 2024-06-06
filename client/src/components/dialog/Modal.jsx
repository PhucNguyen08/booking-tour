/* eslint-disable react/prop-types */
import Modal from 'react-modal';

const CustomModal = props => {
    const { isOpen, onRequestClose, minWidth, children } = props;

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            minWidth: minWidth,
        },
        overlay: {
            backgroundColor: 'rgba(49,49,49,0.8)',
        },
    };
    return (
        <Modal
            ariaHideApp={false}
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}>
            {children}
        </Modal>
    );
};

export default CustomModal;
