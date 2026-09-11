// src/pages/Dashboard.tsx
import { useState } from 'react';
import { useVisitors } from '../context/visitorContex';
import Modal from '../components/Modal';

interface DashboardProps {
    navigateTo: (page: string) => void;
    onLogout: () => void;
}

export default function Dashboard({ navigateTo, onLogout }: DashboardProps) {
    const { visitors, updateStatus, deleteVisitor } = useVisitors();
    const [deleteId, setDeleteId] = useState<number | null>(null);

    return (
        <div className="relative">
            {/* Main content — blurs when modal is open */}
            <div
                className={`p-6 max-w-6xl mx-auto transition-all duration-200 ${deleteId ? 'blur-sm pointer-events-none select-none' : ''
                    }`}
            >
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
                    <div className="flex gap-3">
                        <button
                            onClick={() => navigateTo('add')}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 cursor-pointer"
                        >
                            Add Visitor
                        </button>
                        <button
                            onClick={onLogout}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 cursor-pointer"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* Visitor Table */}
                <div className="bg-white shadow rounded-lg overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                {['Name', 'Phone', 'Unit', 'Visit Date', 'Status', 'Actions'].map(h => (
                                    <th
                                        key={h}
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                                    >
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {visitors.map(v => (
                                <tr key={v.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{v.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{v.phone}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{v.unit}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{v.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`px-2 py-1 text-xs font-semibold rounded-full ${v.status === 'Approved'
                                                    ? 'bg-green-100 text-green-800'
                                                    : v.status === 'Rejected'
                                                        ? 'bg-red-100 text-red-800'
                                                        : 'bg-yellow-100 text-yellow-800'
                                                }`}
                                        >
                                            {v.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-2">
                                        <button
                                            onClick={() => updateStatus(v.id, 'Approved')}
                                            className="text-green-600 hover:text-green-900 cursor-pointer"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => updateStatus(v.id, 'Rejected')}
                                            className="text-amber-600 hover:text-amber-900 cursor-pointer"
                                        >
                                            Reject
                                        </button>
                                        <button
                                            onClick={() => setDeleteId(v.id)}
                                            className="text-red-600 hover:text-red-900 cursor-pointer"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Delete Modal — outside blurred area */}
            <Modal
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={() => {
                    if (deleteId !== null) deleteVisitor(deleteId);
                    setDeleteId(null);
                }}
                title="Confirm Deletion"
            >
                Are you sure you want to remove this visitor record? This action cannot be undone.
            </Modal>
        </div>
    );
}
