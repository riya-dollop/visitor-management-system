export type VisitorStatus = 'Pending' | 'Approved' | 'Rejected';

export interface Visitor {
    id: number;
    name: string;
    phone: string;
    unit: string;
    date: string;
    status: VisitorStatus;
}

export type ToastType = 'success' | 'error' | '';

export interface ToastState {
    message: string;
    type: ToastType;
}
