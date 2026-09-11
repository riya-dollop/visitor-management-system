// src/context/visitorContex.tsx
import { createContext, useContext, useState, ReactNode } from 'react';
import { Visitor, VisitorStatus, ToastState } from '../types';

interface VisitorContextType {
    visitors: Visitor[];
    loading: boolean;
    toast: ToastState;
    setToast: (toast: ToastState) => void;
    showToast: (message: string, type?: 'success' | 'error') => void;
    addVisitor: (visitor: Omit<Visitor, 'id' | 'status'>) => void;
    updateStatus: (id: number, status: VisitorStatus) => void;
    deleteVisitor: (id: number) => void;
}

const VisitorContext = createContext<VisitorContextType | null>(null);

export function VisitorProvider({ children }: { children: ReactNode }) {
    const [visitors, setVisitors] = useState<Visitor[]>([]);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState<ToastState>({ message: '', type: '' });

    const showToast = (message: string, type: 'success' | 'error' = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast({ message: '', type: '' }), 3000);
    };

    const addVisitor = (visitor: Omit<Visitor, 'id' | 'status'>) => {
        setLoading(true);
        setTimeout(() => {
            setVisitors(prev => [...prev, { ...visitor, id: Date.now(), status: 'Pending' }]);
            setLoading(false);
            showToast('Visitor added successfully!');
        }, 800);
    };

    const updateStatus = (id: number, status: VisitorStatus) => {
        setVisitors(prev => prev.map(v => (v.id === id ? { ...v, status } : v)));
        showToast(`Visitor status updated to ${status}`);
    };

    const deleteVisitor = (id: number) => {
        setVisitors(prev => prev.filter(v => v.id !== id));
        showToast('Visitor profile deleted', 'error');
    };

    return (
        <VisitorContext.Provider
            value={{ visitors, loading, toast, setToast, showToast, addVisitor, updateStatus, deleteVisitor }}
        >
            {children}
        </VisitorContext.Provider>
    );
}

export function useVisitors(): VisitorContextType {
    const ctx = useContext(VisitorContext);
    if (!ctx) throw new Error('useVisitors must be used within VisitorProvider');
    return ctx;
}
