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
import { api } from "~/trpc/react"

type Transaction = {
  id: number
  date: string
  description: string
  amount: number
  category: string
  type: "INCOME" | "EXPENSE" | "TRANSFER"  // Fixing the case of the transaction types
}

export default function Component() {
  // State management for new transaction input
  const [newTransaction, setNewTransaction] = useState<Omit<Transaction, "id">>({
    date: "",
    description: "",
    amount: 0,
    category: "",
    type: "EXPENSE",  // Ensure consistent case
  })

  const [filters, setFilters] = useState({
    category: "all",
    date: "",
    type: "all",
  })

  // Fetch transactions dynamically using tRPC
  const { data: transactions = [], refetch } = api.transactions.getAll.useQuery()

  // Mutation to add a new transaction
  const addTransactionMutation = api.transactions.create.useMutation({
    onSuccess: () => {
      refetch() // Refetch transactions after successful mutation
    },
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewTransaction(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setNewTransaction(prev => ({ ...prev, [name]: value }))
  }

  const handleFilterChange = (name: string, value: string) => {
    setFilters(prev => ({ ...prev, [name]: value }))
  }

  const handleAddTransaction = () => {
    const transactionToAdd = {
      ...newTransaction,
      amount: newTransaction.type === "EXPENSE" ? -Math.abs(newTransaction.amount) : Math.abs(newTransaction.amount),
    }
    addTransactionMutation.mutate(transactionToAdd)
    setNewTransaction({
      date: "",
      description: "",
      amount: 0,
      category: "",
      type: "EXPENSE", // Resetting the default case
    })
  }

  // Extract unique categories from transactions
  const categories: string[] = Array.from(new Set(transactions.map((transaction: { category: any }) => transaction.category)))

  // Apply filters to transactions
  const filteredTransactions = transactions.filter((transaction: { id: number; date: Date; description: string; amount: number; category: string; type: "INCOME" | "EXPENSE" | "TRANSFER"; createdAt: Date; updatedAt: Date; userId: string }) => {
    return (
      (filters.category !== "all" ? transaction.category === filters.category : true) &&
      (filters.date ? new Date(transaction.date).toISOString().split('T')[0] === filters.date : true) &&
      (filters.type !== "all" ? transaction.type === filters.type : true)
    )
  })

  const sortedTransactions = [...filteredTransactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

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
              <SelectItem value="INCOME">Income</SelectItem>  {/* Case sensitive */}
              <SelectItem value="EXPENSE">Expense</SelectItem>
              <SelectItem value="TRANSFER">Transfer</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleAddTransaction}>
            <Plus className="mr-2 h-4 w-4" /> Add Transaction
          </Button>
        </div>
      </div>
      <div className="mb-4 p-4 border rounded-lg bg-background">
        <h2 className="text-lg font-semibold mb-2">Filter Transactions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            type="date"
            name="date"
            value={filters.date}
            onChange={(e) => handleFilterChange("date", e.target.value)}
            placeholder="Filter by Date"
          />
          <Select name="category" onValueChange={(value) => handleFilterChange("category", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem> {/* Option for all categories */}
              {categories.map((category: string) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select name="type" onValueChange={(value) => handleFilterChange("type", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="INCOME">Income</SelectItem>
              <SelectItem value="EXPENSE">Expense</SelectItem>
              <SelectItem value="TRANSFER">Transfer</SelectItem>
            </SelectContent>
          </Select>
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
                <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
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
