"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { ArrowDownIcon, ArrowUpIcon, DollarSignIcon } from "lucide-react";
import { Montserrat } from "next/font/google";

const MontserratStyle = Montserrat({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function Component() {
  const [balance, setBalance] = useState(15750.2);
  const [income, setIncome] = useState(3200);
  const [expenses, setExpenses] = useState(1850.75);
  const [savings, setSavings] = useState(1349.25);

  const transactions = [
    { id: 1, description: "Salary", amount: 3200, type: "income" },
    { id: 2, description: "Rent", amount: -1200, type: "expense" },
    { id: 3, description: "Groceries", amount: -250.75, type: "expense" },
    { id: 4, description: "Utilities", amount: -150, type: "expense" },
    { id: 5, description: "Savings", amount: -250, type: "savings" },
  ];

  const expenseData = [
    { name: "Housing", value: 1200 },
    { name: "Food", value: 400 },
    { name: "Transportation", value: 150 },
    { name: "Utilities", value: 100 },
  ];

  const COLORS = ["#7692FF", "#ABD2FA", "#3D518C", "#1B2CC1"];

  return (
    <div className="bg-custom-dark text-custom-light flex max-h-fit p-4 max-w-full flex-col overflow-hidden">
      <main className="m-10 flex-1 p-4">
        {/* Total Balance Card */}
        <Card className="text-custom-dark mb-6 shadow-lg hover:shadow-xl">
          <CardHeader className="bg-custom-blue rounded-t-lg p-6">
            <CardTitle className="font-semibold lg:text-3xl">
              Total Balance
            </CardTitle>
          </CardHeader>
          <CardContent className="rounded-b-lg bg-white p-6">
            <p className="text-5xl font-bold">${balance.toFixed(2)}</p>
          </CardContent>
        </Card>

        {/* Income, Expenses, Savings */}
        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="bg-custom-medium shadow-lg transition duration-300 hover:shadow-xl">
            <CardHeader className="p-6">
              <CardTitle className="flex items-center text-3xl font-semibold">
                <ArrowUpIcon className="mr-2 text-green-500" />
                Income
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-3xl font-bold">${income.toFixed(2)}</p>
            </CardContent>
          </Card>

          <Card className="bg-custom-medium shadow-lg transition duration-300 hover:shadow-xl">
            <CardHeader className="p-6">
              <CardTitle className="flex items-center text-3xl font-semibold">
                <ArrowDownIcon className="mr-2 text-red-500" />
                Expenses
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-3xl font-bold">${expenses.toFixed(2)}</p>
            </CardContent>
          </Card>

          <Card className="bg-custom-medium shadow-lg transition duration-300 hover:shadow-xl">
            <CardHeader className="p-6">
              <CardTitle className="flex items-center text-3xl font-semibold">
                <DollarSignIcon className="mr-2 text-blue-500" />
                Savings
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-3xl font-bold">${savings.toFixed(2)}</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions & Expense Breakdown */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card className="bg-custom-medium shadow-lg transition duration-300 hover:shadow-xl">
            <CardHeader className="p-6">
              <CardTitle className="text-3xl font-semibold">
                Recent Transactions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="space-y-2">
                {transactions.map((transaction) => (
                  <li
                    key={transaction.id}
                    className="flex items-center justify-between text-2xl" // Increased text size
                  >
                    <span>{transaction.description}</span>
                    <span
                      className={
                        transaction.amount > 0
                          ? "font-semibold text-green-400"
                          : "font-semibold text-red-400"
                      }
                    >
                      ${Math.abs(transaction.amount).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-custom-medium shadow-lg transition duration-300 hover:shadow-xl">
            <CardHeader className="p-6">
              <CardTitle className="text-3xl font-semibold">
                Expense Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={expenseData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {expenseData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {expenseData.map((entry, index) => (
                  <div
                    key={`legend-${index}`}
                    className="flex items-center text-xl"
                  >
                    <div
                      className="mr-2 h-4 w-4"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span>{entry.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
