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
    <div className="font-sans flex flex-col items-center justify-items-center min-h-screen">
      <h1 className="mb-5 font-bold font-size text-3xl">NavBar</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {reviews.length > 0 ?
          <ReviewList list={reviews} /> :
          <h1>No review yet</h1>
        }
      </div>
      <div className="fixed bottom-0 h-20 right-7">

        <button className=" inline-flex h-10 w-10 items-center 
        justify-center rounded-full bg-gray-50 text-black drop-shadow-sm transition-colors duration-150 hover:bg-gray-200"
          onClick={() => setShowModal(true)}>
          <svg className="w-6 h-6 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5" />
          </svg>

        </button>

      </div>

      {showModal && <ReviewModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSaveReview}
        initialData={null} // or pass existing review for editing
      />}


    </div>
  );
}
