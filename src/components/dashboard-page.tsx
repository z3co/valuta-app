"use client"

import { useState } from "react"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "~/components/ui/sidebar"
import { TransactionList } from "~/components/transaction-list"
import { CurrencySummary } from "~/components/currency-summary"
import { NewTransactionDropdown } from "~/components/new-transaction-dropdown"
import { mockTransactions } from "~/lib/mock-data"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { DollarSign, Home } from "lucide-react"

export function DashboardPage() {
  const [transactions, setTransactions] = useState(mockTransactions)

  const handleNewTransaction = (newTransaction) => {
    setTransactions([newTransaction, ...transactions])
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50">
        <AppSidebar />
        <main className="flex-1 w-full overflow-auto">
          <div className="h-full w-full py-4 px-4 md:py-6 md:px-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
              <NewTransactionDropdown onNewTransaction={handleNewTransaction} />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6 h-[calc(100vh-8rem)]">
              <div className="xl:col-span-2 h-full">
                <TransactionList transactions={transactions} />
              </div>
              <div className="xl:col-span-1 h-full">
                <CurrencySummary transactions={transactions} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

function AppSidebar() {
  return (
    <Sidebar className="h-screen">
      <SidebarHeader className="p-4 border-b">
        <div className="flex items-center gap-2">
          <DollarSign className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">BankMock</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive>
                  <Home className="h-4 w-4" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-muted-foreground">john@example.com</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
