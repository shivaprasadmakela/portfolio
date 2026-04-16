import { Modal, Button } from './';
import { useConfirmStore } from '../../store/useConfirmStore';

export default function ConfirmDialog() {
    const { isOpen, title, message, onConfirm, onCancel } = useConfirmStore();

    return (
        <Modal 
            isOpen={isOpen} 
            onClose={onCancel} 
            title={title}
            footer={
                <>
                    <Button variant="secondary" onClick={onCancel}>Cancel</Button>
                    <Button onClick={onConfirm}>Confirm Action</Button>
                </>
            }
        >
            <div style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                {message}
            </div>
        </Modal>
    );
}
