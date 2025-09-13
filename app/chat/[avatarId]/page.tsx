'use client'

import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { Layout } from "@/components/Layout"
import { ChatBubble } from "@/components/ChatBubble"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/types/avatar"
import { Send, ArrowLeft } from "lucide-react"

interface Message {
  id: string
  sender: "user" | "avatar"
  text: string
  timestamp: Date
}

// Mock data - In real app, this would come from your database
const mockAvatars: Avatar[] = [
  {
    id: "1",
    name: "Luna",
    appearance: {
      gender: "Female",
      age: "25", 
      hair: "Long silver",
      clothing: "Elegant dress"
    },
    personalityTraits: ["Wise", "Mysterious", "Caring", "Philosophical"],
    createdAt: new Date()
  },
  {
    id: "2",
    name: "Alex", 
    appearance: {
      gender: "Male",
      age: "30",
      hair: "Short brown", 
      clothing: "Casual hoodie"
    },
    personalityTraits: ["Friendly", "Humorous", "Adventurous"],
    createdAt: new Date()
  }
]

const mockMessages: Record<string, Message[]> = {
  "1": [
    {
      id: "1",
      sender: "avatar",
      text: "Hello! I'm Luna. I sense you have something on your mind. What would you like to explore together?",
      timestamp: new Date(Date.now() - 300000)
    },
    {
      id: "2", 
      sender: "user",
      text: "Hi Luna! I've been thinking about making some big changes in my life but I'm not sure where to start.",
      timestamp: new Date(Date.now() - 240000)
    },
    {
      id: "3",
      sender: "avatar", 
      text: "Change can feel overwhelming, but it often begins with a single step toward what calls to your heart. What aspect of your life feels most ready for transformation?",
      timestamp: new Date(Date.now() - 180000)
    }
  ],
  "2": [
    {
      id: "1",
      sender: "avatar",
      text: "Hey there! Alex here, ready for another adventure! What's going on in your world today?",
      timestamp: new Date(Date.now() - 180000)
    }
  ]
}

export default function Chat() {
  const params = useParams()
  const router = useRouter()
  const avatarId = params?.avatarId as string
  
  const [messages, setMessages] = useState<Message[]>(mockMessages[avatarId] || [])
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const avatar = mockAvatars.find(a => a.id === avatarId)
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  if (!avatar) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-2">Avatar not found</h1>
          <Button onClick={() => router.push("/")} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    )
  }

  const generateAvatarResponse = (userMessage: string): string => {
    // Mock AI response based on personality traits
    const responses = {
      "1": [ // Luna - Wise, Mysterious, Caring, Philosophical
        "I sense there's deeper wisdom in your question. Let me reflect on this...",
        "Your words carry weight. In my experience, the answers often lie within us.",
        "That's a profound observation. What does your intuition tell you about this?",
      ],
      "2": [ // Alex - Friendly, Humorous, Adventurous  
        "Ha! That's a great question! You know what I think?",
        "Awesome! That reminds me of this crazy adventure I had once...",
        "That's so cool! I love how you think about things differently!",
      ]
    }
    
    const avatarResponses = responses[avatarId as keyof typeof responses] || responses["1"]
    return avatarResponses[Math.floor(Math.random() * avatarResponses.length)]
  }

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user", 
      text: newMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setNewMessage("")
    setIsTyping(true)

    // Simulate AI response delay
    setTimeout(() => {
      const avatarResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: "avatar",
        text: generateAvatarResponse(newMessage),
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, avatarResponse])
      setIsTyping(false)
    }, 1500 + Math.random() * 1000) // 1.5-2.5 second delay
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleChatWithAvatar = (id: string) => {
    router.push(`/chat/${id}`)
  }

  return (
    <Layout
      avatars={mockAvatars}
      activeAvatarId={avatarId}
      onCreateAvatar={() => router.push("/create-avatar")}
      onSelectAvatar={handleChatWithAvatar}
    >
      {/* Chat Header */}
      <div className="bg-card border-b border-border p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-medium">
          {avatar.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 className="font-semibold">{avatar.name}</h2>
          <p className="text-sm text-muted-foreground">
            {avatar.personalityTraits.slice(0, 3).join(" • ")}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-center">
            <div>
              <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                {avatar.name.charAt(0).toUpperCase()}
              </div>
              <h3 className="text-lg font-semibold mb-2">Start chatting with {avatar.name}</h3>
              <p className="text-muted-foreground">
                {avatar.name} is {avatar.personalityTraits.slice(0, 2).join(" and ").toLowerCase()}
              </p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <ChatBubble key={message.id} message={message} />
            ))}
            {isTyping && (
              <ChatBubble
                message={{
                  id: "typing",
                  sender: "avatar",
                  text: "...",
                  timestamp: new Date()
                }}
                isTyping
              />
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Message Input */}
      <div className="bg-card border-t border-border p-4">
        <div className="flex gap-3 max-w-4xl mx-auto">
          <Input
            placeholder={`Message ${avatar.name}...`}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} disabled={!newMessage.trim() || isTyping}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Layout>
  )
}