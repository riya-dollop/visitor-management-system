import { useState } from 'react';
import { VisitorProvider, useVisitors } from './context/visitorContex';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddVisitor from './pages/AddVisitor';
import Toast from './components/Toast';

function AppContent() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
        () => localStorage.getItem('isLogin') === 'true'
    );
    const [page, setPage] = useState('dashboard');
    const { toast, setToast } = useVisitors();

    const handleLogin = () => setIsAuthenticated(true);

    const handleLogout = () => {
        localStorage.removeItem('isLogin');
        setIsAuthenticated(false);
    };

    if (!isAuthenticated) {
        return <Login onLogin={handleLogin} />;
    }

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            {page === 'dashboard' && <Dashboard navigateTo={setPage} onLogout={handleLogout} />}
            {page === 'add' && <AddVisitor navigateTo={setPage} />}
            <Toast
                message={toast.message}
                type={toast.type}
                onClose={() => setToast({ message: '', type: '' })}
            />
        </div>
    );
}

export default function App() {
    return (
        <VisitorProvider>
            <AppContent />
        </VisitorProvider>
    );
}
