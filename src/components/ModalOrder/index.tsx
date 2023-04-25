import Modal from "react-modal"
import styles from './styles.module.scss'

import {FiX} from 'react-icons/fi'
import {OrderItemProps} from '../../pages/dashboard'

interface ModalOrderProps{
    isOpen: boolean;
    onRequestClose: () => void;
    order: OrderItemProps[]
    handleFinishOrder: (id: string) => void;
}

export function ModalOrder({isOpen, onRequestClose, order, handleFinishOrder}: ModalOrderProps){

    

    return(
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
        >
            <button
                type='button'
                onClick={onRequestClose}
                className="react-modal-close"
                style={{background: 'transparent', border: 0}}
            >
                <FiX size={45} color="#F34748" />
            </button>

            <div className={styles.conatiner}>
                <h2>Detalhes do pedido</h2>
                <span className={styles.table}>
                    Mesa: <strong>{order[0].order.table}</strong>
                </span>

                {order.map((item) => (
                    <section className={styles.containerItem} key={item.id}>
                        <span>{item.amount} - <strong>{item.product.name}</strong> </span>
                        <span className={styles.description}>{item.product.description}</span>
                    </section>
                ))}

                <button className={styles.buttonOrder} onClick={() => handleFinishOrder(order[0].order_id)}>
                    Concluir pedido
                </button>

            </div>

        </Modal>
    )
}

const customStyles = {
    content:{
        top: '50%',
        bottom: 'auto',
        left: '50%',
        right: 'auto',
        padding: "30px",
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#1D1D2E'
    }
}