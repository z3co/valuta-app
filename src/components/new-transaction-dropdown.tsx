"use client"

import { useState } from "react"
import { Button } from "~/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { ArrowDownUp, ChevronDown, Send } from "lucide-react"
import { mockContacts } from "~/lib/mock-data"

export function NewTransactionDropdown({ onNewTransaction }) {
  const [isTradeOpen, setIsTradeOpen] = useState(false)
  const [isSendOpen, setIsSendOpen] = useState(false)
  const [recipient, setRecipient] = useState("")
  const [amount, setAmount] = useState("")

  const handleTradeSubmit = (e) => {
    e.preventDefault()
    const selectedContact = mockContacts.find((c) => c.id === recipient)

    if (selectedContact && amount) {
      onNewTransaction({
        id: `tx-${Date.now()}`,
        type: "trade",
        amount: Number.parseFloat(amount),
        date: new Date(),
        sender: selectedContact,
        description: "Currency trade",
      })

      setIsTradeOpen(false)
      setRecipient("")
      setAmount("")
    }
  }

  const handleSendSubmit = (e) => {
    e.preventDefault()
    const selectedContact = mockContacts.find((c) => c.id === recipient)

    if (selectedContact && amount) {
      onNewTransaction({
        id: `tx-${Date.now()}`,
        type: "sent",
        amount: Number.parseFloat(amount),
        date: new Date(),
        sender: selectedContact,
        description: "Currency sent",
      })

      setIsSendOpen(false)
      setRecipient("")
      setAmount("")
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>
            New <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setIsTradeOpen(true)}>
            <ArrowDownUp className="mr-2 h-4 w-4" />
            Trade Currency
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsSendOpen(true)}>
            <Send className="mr-2 h-4 w-4" />
            Send Currency
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isTradeOpen} onOpenChange={setIsTradeOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Trade Currency</DialogTitle>
            <DialogDescription>Exchange currency with another user.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleTradeSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="trade-recipient">Trade with</Label>
                <Select value={recipient} onValueChange={setRecipient}>
                  <SelectTrigger id="trade-recipient">
                    <SelectValue placeholder="Select a contact" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockContacts.map((contact) => (
                      <SelectItem key={contact.id} value={contact.id}>
                        {contact.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="trade-amount">Amount</Label>
                <Input
                  id="trade-amount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Trade Currency</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isSendOpen} onOpenChange={setIsSendOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Currency</DialogTitle>
            <DialogDescription>Send currency to another user.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSendSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="send-recipient">Recipient</Label>
                <Select value={recipient} onValueChange={setRecipient}>
                  <SelectTrigger id="send-recipient">
                    <SelectValue placeholder="Select a contact" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockContacts.map((contact) => (
                      <SelectItem key={contact.id} value={contact.id}>
                        {contact.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="send-amount">Amount</Label>
                <Input
                  id="send-amount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Send Currency</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
