"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"

type Transaction = {
  id: number
  date: string
  description: string
  amount: number
  category: string
  type: "income" | "expense"
}

export default function Component() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, date: "2023-05-01", description: "Salary", amount: 3000, category: "Income", type: "income" },
    { id: 2, date: "2023-05-02", description: "Groceries", amount: -100, category: "Food", type: "expense" },
    { id: 3, date: "2023-05-03", description: "Electric Bill", amount: -80, category: "Utilities", type: "expense" },
    { id: 4, date: "2023-05-04", description: "Freelance Work", amount: 500, category: "Income", type: "income" },
    { id: 5, date: "2023-05-05", description: "Restaurant", amount: -50, category: "Food", type: "expense" },
  ])

  const [newTransaction, setNewTransaction] = useState<Omit<Transaction, "id">>({
    date: "",
    description: "",
    amount: 0,
    category: "",
    type: "expense",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewTransaction(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setNewTransaction(prev => ({ ...prev, [name]: value }))
  }

  const handleAddTransaction = () => {
    const transactionToAdd = {
      ...newTransaction,
      id: transactions.length + 1,
      amount: newTransaction.type === "expense" ? -Math.abs(newTransaction.amount) : Math.abs(newTransaction.amount),
    }
    setTransactions(prev => [...prev, transactionToAdd])
    setNewTransaction({
      date: "",
      description: "",
      amount: 0,
      category: "",
      type: "expense",
    })
  }

  const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="container mx-auto my-24 bg-white shadow-2xl p-10 rounded-2xl">
      <h1 className="text-2xl font-bold mb-4">Transactions</h1>
      <div className="mb-4 p-4 border rounded-lg bg-background">
        <h2 className="text-lg font-semibold mb-2">Add New Transaction</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            type="date"
            name="date"
            value={newTransaction.date}
            onChange={handleInputChange}
            placeholder="Date"
          />
          <Input
            type="text"
            name="description"
            value={newTransaction.description}
            onChange={handleInputChange}
            placeholder="Description"
          />
          <Input
            type="number"
            name="amount"
            value={newTransaction.amount}
            onChange={handleInputChange}
            placeholder="Amount"
          />
          <Input
            type="text"
            name="category"
            value={newTransaction.category}
            onChange={handleInputChange}
            placeholder="Category"
          />
          <Select name="type" onValueChange={(value) => handleSelectChange("type", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleAddTransaction}>
            <Plus className="mr-2 h-4 w-4" /> Add Transaction
          </Button>
        </div>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell className={transaction.amount >= 0 ? "text-green-600" : "text-red-600"}>
                  ${Math.abs(transaction.amount).toFixed(2)}
                </TableCell>
                <TableCell>{transaction.category}</TableCell>
                <TableCell>{transaction.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}