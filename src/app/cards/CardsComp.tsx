import { Card, CardContent } from "~/components/ui/card";

export default function CardsPage() {
  const cardsData = [
    {
      number: "1234 5678 9101 1121",
      name: "Esteban Aleman",
      expiry: "12/25",
      transactions: [
        { id: 1, description: "Grocery Store", amount: "$50.00" },
        { id: 2, description: "Gas Station", amount: "$30.00" },
      ],
    },
    {
      number: "2345 6789 1011 1213",
      name: "Esteban Aleman",
      expiry: "11/24",
      transactions: [
        { id: 1, description: "Restaurant", amount: "$75.00" },
        { id: 2, description: "Online Shopping", amount: "$120.00" },
      ],
    },
    {
      number: "3456 7890 1121 3141",
      name: "Esteban Aleman",
      expiry: "10/23",
      transactions: [
        { id: 1, description: "Coffee Shop", amount: "$15.00" },
        { id: 2, description: "Book Store", amount: "$40.00" },
      ],
    },
    {
      number: "4567 8901 1213 4151",
      name: "Esteban Aleman",
      expiry: "09/22",
      transactions: [
        { id: 1, description: "Gym Membership", amount: "$60.00" },
        { id: 2, description: "Electronics", amount: "$200.00" },
      ],
    },
    {
      number: "5678 9012 1314 5161",
      name: "Esteban Aleman",
      expiry: "08/21",
      transactions: [
        { id: 1, description: "Clothing Store", amount: "$100.00" },
        { id: 2, description: "Pharmacy", amount: "$25.00" },
      ],
    },
    {
      number: "6789 0123 1415 6171",
      name: "Esteban Aleman",
      expiry: "07/20",
      transactions: [
        { id: 1, description: "Supermarket", amount: "$80.00" },
        { id: 2, description: "Movie Theater", amount: "$45.00" },
      ],
    },
  ];

  return (
    <div className="max-w-full p-20">
      <h1 className="mb-6 text-center text-2xl font-bold">Your Cards</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cardsData.map((card, index) => (
          <Card key={index}>
            <CardContent>
              <h2 className="text-lg font-semibold">{card.name}</h2>
              <p className="text-sm">{card.number}</p>
              <p className="text-sm">Expiry: {card.expiry}</p>
              <h3 className="mt-4 text-md font-semibold">Recent Transactions</h3>
              <ul className="mt-2">
                {card.transactions.map((transaction) => (
                  <li key={transaction.id} className="text-sm">
                    {transaction.description}: {transaction.amount}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
