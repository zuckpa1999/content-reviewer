'use client'
import { useState } from "react";
import ReviewModal from "./components/ReviewModal";
import { Review } from "./types";
import ReviewList from "./components/ReviewList";
import logo from "../../public/logo.jpg";
export default function Home() {

  const [showModal, setShowModal] = useState<boolean>(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [editingReview, setEditingReview] = useState<Review | null>(null);


  const handleEditReview = (review: Review) => {
    setEditingReview(review);
    setShowModal(true);
  };

  const handleAddReview = () => {
    setEditingReview(null);
    setShowModal(true);
  }

  const handleSaveReview = (reviewData: Review) => {
    if (editingReview)
      setReviews(prev => prev.map(r => r.id === reviewData.id ? reviewData : r));
    else
      setReviews(prev => [...prev, reviewData]);

    setShowModal(false);
    setEditingReview(null);
  }

  return (
    <div className="font-sans">
      <nav className="font-sans flex flex-col text-center py-4 px-6 bg-white shadow w-full">
        <div className="flex justify-center items-center">
          <img src="/film-icon.png" style={{ width: "60px" }} alt="logo" />
        </div>

      </nav>
      <div className=" flex flex-col items-center justify-items-center mt-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {reviews.length > 0 ?
            <ReviewList list={reviews} onEdit={handleEditReview} /> :
            <h1>No review yet</h1>
          }
        </div>
        <div className="fixed bottom-0 h-20 right-7">

          <button className=" inline-flex h-10 w-10 items-center 
        justify-center rounded-full bg-gray-50 text-black drop-shadow-sm transition-colors duration-150 hover:bg-gray-200"
            onClick={() => handleAddReview()}>
            <svg className="w-6 h-6 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5" />
            </svg>

          </button>

        </div>

        {showModal && <ReviewModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={handleSaveReview}
          initialData={editingReview}
        />}


      </div>
    </div>
  );
}
