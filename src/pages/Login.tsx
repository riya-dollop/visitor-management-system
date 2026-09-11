// src/pages/Login.tsx
import { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';

const STATIC_EMAIL = 'riya@gmail.com';
const STATIC_PASSWORD = 'riya123';

interface LoginProps {
    onLogin: () => void;
}

interface FormState {
    email: string;
    password: string;
}


interface FormErrors {
    email?: string;
    password?: string;
    auth?: string;
}

export default function Login({ onLogin }: LoginProps) {
    const [form, setForm] = useState<FormState>({ email: '', password: '' });
    const [errors, setErrors] = useState<FormErrors>({});
    const [loading, setLoading] = useState(false);

    const validate = (): boolean => {
        const errs: FormErrors = {};
        if (!form.email.includes('@')) errs.email = 'Valid email is required';
        if (form.password.length < 6) errs.password = 'Password must be at least 6 characters';
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            if (form.email === STATIC_EMAIL && form.password === STATIC_PASSWORD) {
                localStorage.setItem('isLogin', 'true');
                onLogin();
            } else {
                setErrors({ auth: 'Invalid email or password' });
            }
        }, 800);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Admin Login</h2>
                <form onSubmit={handleSubmit}>
                    <Input
                        label="Email"
                        type="email"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        error={errors.email}
                    />
                    <Input
                        label="Password"
                        type="password"
                        value={form.password}
                        onChange={e => setForm({ ...form, password: e.target.value })}
                        error={errors.password}
                    />
                    {errors.auth && (
                        <p className="text-red-500 text-sm mb-3 text-center cursor-pointer">{errors.auth}</p>
                    )}
                    <Button type="submit" loading={loading}>
               <p className='cursor-pointer'>  Sign In</p>
                    </Button>
                </form>
            </div>
        </div>
    );
}
