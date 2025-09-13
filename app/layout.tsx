import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryProvider } from '@/components/providers/ReactQueryProvider'

export const metadata: Metadata = {
  title: 'AI Avatar Chat',
  description: 'Create and chat with your personalized AI avatars',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            {children}
          </TooltipProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}