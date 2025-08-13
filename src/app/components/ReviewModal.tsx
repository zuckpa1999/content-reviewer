import { useState, useRef, useEffect } from 'react';
import { ReviewModalProps, FormData, Review } from '../types';



const ReviewModal: React.FC<ReviewModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    initialData = null
}) => {
    const [formData, setFormData] = useState<FormData>({
        id: null,
        image: null,
        imagePreview: null,
        name: '',
        opinion: '',
        date: new Date().toISOString().split('T')[0],
        score: 5
    });

    const fileInputRef = useRef<HTMLInputElement>(null);

    // Reset form when modal opens/closes or when initialData changes
    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                // Editing existing review
                setFormData({
                    ...initialData,
                    imagePreview: initialData.image
                });
            } else {
                // Creating new review
                setFormData({
                    id: null,
                    image: null,
                    imagePreview: null,
                    name: '',
                    opinion: '',
                    date: new Date().toISOString().split('T')[0],
                    score: 5
                });
            }
        }
    }, [isOpen, initialData]);

    const handleImagePick = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        const validFileTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (file) {
            // Validate file size (optional - 5MB limit)
            if (file.size > 5 * 1024 * 1024) {
                alert('File size should be less than 5MB');
                return;
            }

            if (!validFileTypes.includes(file.type)) {
                alert('Only JPG, PNG, and GIF formats are allowed');
                return;
            }

            const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
                const result = e.target?.result as string;
                setFormData(prev => ({
                    ...prev,
                    image: result,
                    imagePreview: result
                }));
            };

            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (field: keyof FormData, value: string | number) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validation
        if (!formData.name.trim()) {
            alert('Please enter the name of the content');
            return;
        }

        if (!formData.opinion.trim()) {
            alert('Please enter your opinion');
            return;
        }

        // Prepare data for submission
        const reviewData: Review = {
            id: formData.id || Date.now(),
            image: formData.image,
            name: formData.name,
            opinion: formData.opinion,
            date: formData.date,
            score: formData.score,
            timestamp: new Date().toISOString()
        };

        // Call the parent's onSubmit function
        onSubmit(reviewData);

        // Close modal
        onClose();
    };

    const handleRemoveImage = () => {
        setFormData(prev => ({
            ...prev,
            image: null,
            imagePreview: null
        }));
    };

    const getScoreColor = (score: number): string => {
        if (score >= 8) return 'text-green-500';
        if (score >= 6) return 'text-yellow-500';
        if (score >= 4) return 'text-orange-500';
        return 'text-red-500';
    };

    // Don't render if modal is not open
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {formData.id ? 'Edit Review' : 'Add New Review'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-2xl transition-colors"
                        type="button"
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Image Upload Section */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Cover Image
                        </label>
                        <div className="flex flex-col items-center">
                            {formData.imagePreview ? (
                                <div className="relative mb-4">
                                    <img
                                        src={formData.imagePreview}
                                        alt="Preview"
                                        className="w-48 h-48 object-cover rounded-lg border-2 border-gray-300 shadow-md"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleRemoveImage}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                                    >
                                        ×
                                    </button>
                                </div>
                            ) : (
                                <div className="w-48 h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-4 bg-gray-50">
                                    <div className="text-center">
                                        <div className="text-4xl text-gray-400 mb-2">📸</div>
                                        <p className="text-gray-500 text-sm">No image selected</p>
                                    </div>
                                </div>
                            )}

                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium"
                            >
                                Choose Image
                            </button>

                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImagePick}
                                accept="image/*"
                                className="hidden"
                            />

                            <p className="text-xs text-gray-500 mt-2">
                                Supports: JPG, PNG, GIF (Max 5MB)
                            </p>
                        </div>
                    </div>

                    {/* Content Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Content Name *
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="e.g., Breaking Bad, The Matrix, Stranger Things"
                            required
                        />
                    </div>

                    {/* Date Watched */}
                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                            Date Watched
                        </label>
                        <input
                            type="date"
                            id="date"
                            value={formData.date}
                            onChange={(e) => handleInputChange('date', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                    </div>

                    {/* Score Slider */}
                    <div>
                        <label htmlFor="score" className="block text-sm font-medium text-gray-700 mb-2">
                            Your Score
                        </label>
                        <div className="flex items-center space-x-4">
                            <input
                                type="range"
                                id="score"
                                min="1"
                                max="10"
                                step="1"
                                value={formData.score}
                                onChange={(e) => handleInputChange('score', parseInt(e.target.value))}
                                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                            />
                            <div className="flex flex-col items-center">
                                <span className={`text-3xl font-bold ${getScoreColor(formData.score)}`}>
                                    {formData.score}
                                </span>
                                <span className="text-xs text-gray-500">out of 10</span>
                            </div>
                        </div>

                        {/* Score indicators */}
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>😢 Poor</span>
                            <span>😐 Average</span>
                            <span>😊 Good</span>
                            <span>🤩 Excellent</span>
                        </div>
                    </div>

                    {/* Opinion Text Area */}
                    <div>
                        <label htmlFor="opinion" className="block text-sm font-medium text-gray-700 mb-2">
                            Your Review *
                        </label>
                        <textarea
                            id="opinion"
                            rows={5}
                            value={formData.opinion}
                            onChange={(e) => handleInputChange('opinion', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-colors"
                            placeholder="Share your thoughts about this movie or TV series... What did you like? What didn't work for you? Would you recommend it?"
                            required
                        />
                        <div className="text-right text-xs text-gray-500 mt-1">
                            {formData.opinion.length} characters
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-6 border-t border-gray-200">
                        <button
                            type="submit"
                            className="flex-1 bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {formData.id ? 'Update Review' : 'Save Review'}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReviewModal;