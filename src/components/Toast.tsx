import { ToastState } from '../types';

interface ToastProps extends ToastState {
    onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
    if (!message) return null;
    const bgColor = type === 'error' ? 'bg-red-500' : 'bg-green-500';
    return (
        <div
            className={`fixed bottom-4 right-4 ${bgColor} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-4 z-50 animate-bounce`}
        >
            <span className="text-sm font-medium">{message}</span>
            <button onClick={onClose} className="hover:text-gray-200 text-lg font-bold">
                &times;
            </button>
        </div>
    );
}
