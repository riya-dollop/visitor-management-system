// src/pages/AddVisitor.tsx
import { useState } from 'react';
import { useVisitors } from '../context/visitorContex';
import Input from '../components/Input';
import Button from '../components/Button';

interface AddVisitorProps {
    navigateTo: (page: string) => void;
}

interface FormState {
    name: string;
    phone: string;
    unit: string;
    date: string;
}

interface FormErrors {
    name?: string;
    phone?: string;
    unit?: string;
    date?: string;
}

export default function AddVisitor({ navigateTo }: AddVisitorProps) {
    const { addVisitor, loading } = useVisitors();
    const [form, setForm] = useState<FormState>({ name: '', phone: '', unit: '', date: '' });
    const [errors, setErrors] = useState<FormErrors>({});

    const validate = (): boolean => {
        const errs: FormErrors = {};
        if (!form.name.trim()) errs.name = 'Name is required';
        if (!/^\d{10}$/.test(form.phone)) errs.phone = 'Phone must be exactly 10 digits';
        if (!form.unit.trim()) errs.unit = 'Unit number is required';
        if (!form.date) errs.date = 'Visit date is required';
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validate()) return;
        addVisitor(form);
        navigateTo('dashboard');
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Add New Visitor</h2>
                <button
                    onClick={() => navigateTo('dashboard')}
                    className="text-sm text-blue-600 hover:underline"
                >
                    Back
                </button>
            </div>
            <form onSubmit={handleSubmit}>
                <Input
                    label="Full Name"
                    type="text"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    error={errors.name}
                />
                <Input
                    label="Phone Number"
                    type="text"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    error={errors.phone}
                />
                <Input
                    label="Unit Number"
                    type="text"
                    value={form.unit}
                    onChange={e => setForm({ ...form, unit: e.target.value })}
                    error={errors.unit}
                />
                <Input
                    label="Visit Date"
                    type="date"
                    value={form.date}
                    onChange={e => setForm({ ...form, date: e.target.value })}
                    error={errors.date}
                />
                <Button type="submit" loading={loading}>
                    Submit Record
                </Button>
            </form>
        </div>
    );
}
