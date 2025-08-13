export interface Review {
    id: number | null;
    image: string | null;
    name: string;
    opinion: string;
    date: string;
    score: number;
    timestamp?: string;
}

export interface FormData extends Review {
    imagePreview: string | null;
}

export interface ReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (reviewData: Review) => void;
    initialData?: Review | null;
}