"use client";
import { useState } from "react";

export default function MinimalistCardsPage() {
  

  const cardsData = [
    {
      number: "1234 5678 9101 1121",
      name: "Esteban Aleman",
      expiry: "12/25",
      Provider: "Visa",
      type: "Credit",
      nickname: "BBVA" // Card type or logo
    },
    {
      number: "2345 6789 1011 1213",
      name: "Esteban Aleman",
      expiry: "11/24",
      Provider: "MasterCard",
      type: "Credit",
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
            className=" bg-white relative p-4 border border-gray-300 rounded-lg hover:bg-white transition-all duration-300 cursor-pointer hover:shadow-xl"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">{card.nickname}</h2>
              <h3>{card.Provider}</h3>
            </div>

            <div className="my-2">
              <p className="text-md">
                {card.number}
              </p>
              <p className="text-sm text-gray-500 my-4">Expiry: {card.expiry}</p>
              <p className="font-semibold text-lg my-3">{card.name}</p>
              <span className="text-sm font-light">{card.type}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
