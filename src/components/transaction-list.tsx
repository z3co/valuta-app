import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Avatar, AvatarFallback } from "~/components/ui/avatar"
import { Badge } from "~/components/ui/badge"
import { formatCurrency, formatDate } from "~/lib/utils"

export function TransactionList({ transactions }) {
  const getBadgeVariant = (type) => {
    switch (type) {
      case "received":
        return "success"
      case "trade":
        return "secondary"
      case "sent":
        return "destructive"
      default:
        return "default"
    }
  }

  const getBadgeText = (type) => {
    switch (type) {
      case "received":
        return "Received"
      case "trade":
        return "Trade"
      case "sent":
        return "Sent"
      default:
        return type
    }
  }

  const getAmountColor = (type) => {
    switch (type) {
      case "received":
        return "text-green-600"
      case "trade":
        return "text-blue-600"
      case "sent":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getAmountPrefix = (type) => {
    switch (type) {
      case "received":
        return "+"
      case "trade":
        return "↔"
      case "sent":
        return "-"
      default:
        return ""
    }
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>You have {transactions.length} transactions this month</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto">
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-lg gap-3"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <Avatar className="flex-shrink-0">
                  <AvatarFallback>
                    {transaction.sender.name
                      .split(" ")
                      .map((n) => n.charAt(0))
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="font-medium truncate">{transaction.sender.name}</p>
                  <p className="text-sm text-muted-foreground truncate">{transaction.description}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(transaction.date)}</p>
                </div>
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-3 flex-shrink-0">
                <Badge variant={getBadgeVariant(transaction.type)}>{getBadgeText(transaction.type)}</Badge>
                <p className={`font-semibold text-right ${getAmountColor(transaction.type)}`}>
                  {getAmountPrefix(transaction.type)}
                  {formatCurrency(transaction.amount)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
