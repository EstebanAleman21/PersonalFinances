"use client";
import { useState } from "react";

export default function MinimalistCardsPage() {
  

  const cardsData = [
    {
      number: "1234 5678 9101 1121",
      name: "Esteban Aleman",
      expiry: "12/25",
      type: "Visa",
      nickname: "BBVA" // Card type or logo
    },
    {
      number: "2345 6789 1011 1213",
      name: "Esteban Aleman",
      expiry: "11/24",
      type: "MasterCard",
      nickname: "Nu"
    },
    // Add more cards here...
  ];

  return (
    <div className="max-w-full p-10">
      <h1 className="mb-6 text-center text-2xl font-semibold">Your Cards</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        
        {cardsData.map((card, index) => (
          <div
            key={index}
            className="relative p-4 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">{card.name}</h2>
              <span className="text-sm font-light">{card.type}</span>
            </div>

            <div className="mt-2">
              <p className="text-md">
                {card.number}
              </p>
              <p className="text-sm text-gray-500">Expiry: {card.expiry}</p>
              <p className="font-semibold">{card.nickname}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
