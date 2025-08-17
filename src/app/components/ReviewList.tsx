import React from 'react'
import { Review } from '../types'


export default function ReviewList({ list }: { list: Review[] }) {
    return (

        list.map((review) => (
            <div key={review.id}>
                <div className="relative max-w-sm min-w-sm overflow-hidden rounded-2xl font-sans text-white shadow-2xl mt-2">
                    <img
                        src={review.image}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                    <div className="relative flex h-full flex-col justify-end p-6">
                        <div className="mb-1 flex">
                            <svg className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"><path d="..." /></svg>
                            <svg className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"><path d="..." /></svg>
                            <svg className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"><path d="..." /></svg>
                            <svg className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"><path d="..." /></svg>
                            <svg className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"><path d="..." /></svg>
                        </div>
                        <p className="mb-2 text-lg font-light italic">
                            {review.opinion}
                        </p>
                        <div>
                            <p className="text-xl font-bold">{review.name}</p>
                            <div className="flex justify-between">
                                <p className="text-xs font-medium uppercase tracking-wider text-gray-300">{review.date}</p>
                                <h1 className="text-2xl uppercase tracking-wider text-gray-300 font-bold">{review.score}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ))

    )
}
