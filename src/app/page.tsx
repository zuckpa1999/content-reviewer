'use client'
import { useState } from "react";
import ReviewModal from "./components/ReviewModal";
import { Review } from "./types";
import ReviewList from "./components/ReviewList";

export default function Home() {

  const [showModal, setShowModal] = useState<boolean>(false);
  const [reviews, setReviews] = useState<Review[]>([]);

  const handleSaveReview = (reviewData: Review) => {
    setReviews(prev => [reviewData, ...prev]);
  };

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <>
        <button onClick={() => setShowModal(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add a review
        </button>


        {reviews.length > 0 &&
          <ReviewList list={reviews} />
        }

        {showModal && <ReviewModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={handleSaveReview}
          initialData={null} // or pass existing review for editing
        />}

      </>
    </div>
  );
}
