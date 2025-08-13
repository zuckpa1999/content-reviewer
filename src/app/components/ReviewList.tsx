import React from 'react'
import { Review } from '../types'


export default function ReviewList({ list }: { list: Review[] }) {
    return (

        list.map((review) => (
            <div key={review.id}>
                <div className="relative max-w-md overflow-hidden rounded-2xl font-sans text-white shadow-2xl">
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
                                <h2 className="text-xs font-medium uppercase tracking-wider text-gray-300">{review.score}</h2>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex max-w-2xl overflow-hidden rounded-lg bg-white font-sans shadow-md mt-3">
                    <div className="w-1/2">
                        <img
                            src={review.image}
                            alt=""
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="flex w-1/2 flex-col justify-center p-6">
                        <p className="text-2xl font-bold text-gray-900">{review.name}</p>
                        <p className="text-sm text-gray-500">{review.date}</p>
                        <div className="my-3 flex">
                            <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="..." /></svg>
                            <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="..." /></svg>
                            <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="..." /></svg>
                            <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="..." /></svg>
                            <svg className="h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20"><path d="..." /></svg>
                        </div>
                        <div className='flex justify-between'>
                            <p className="text-gray-700">
                                {review.opinion}
                            </p>
                            <h1>{review.score}</h1>
                        </div>
                    </div>
                </div>

            </div>
        ))


    )
}
