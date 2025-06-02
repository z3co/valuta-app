"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Avatar, AvatarFallback } from "~/components/ui/avatar"
import { formatCurrency } from "~/lib/utils"

export function CurrencySummary({ transactions }) {
  const currencyByPerson = useMemo(() => {
    const summary = {}

    transactions
      .filter((t) => t.type === "received")
      .forEach((transaction) => {
        const { sender, amount } = transaction
        if (!summary[sender.id]) {
          summary[sender.id] = {
            sender,
            total: 0,
          }
        }
        summary[sender.id].total += amount
      })

    return Object.values(summary).sort((a, b) => b.total - a.total)
  }, [transactions])

  const totalReceived = useMemo(() => {
    return transactions.filter((t) => t.type === "received").reduce((sum, t) => sum + t.amount, 0)
  }, [transactions])

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle>Currency Summary</CardTitle>
        <CardDescription>Total received: {formatCurrency(totalReceived)}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto">
        <div className="space-y-4">
          {currencyByPerson.map((item) => (
            <div key={item.sender.id} className="flex items-center gap-3 min-w-0">
              <Avatar className="flex-shrink-0">
                <AvatarFallback>
                  {item.sender.name
                    .split(" ")
                    .map((n) => n.charAt(0))
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="font-medium truncate">{item.sender.name}</p>
                <p className="text-sm text-muted-foreground">{formatCurrency(item.total)}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
