'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Layout } from "@/components/Layout"
import { AvatarCard } from "@/components/AvatarCard"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/types/avatar"
import { Plus, Sparkles } from "lucide-react"

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

export default function Dashboard() {
  const [avatars, setAvatars] = useState<Avatar[]>(mockAvatars)
  const router = useRouter()

  const handleCreateAvatar = () => {
    router.push('/create-avatar')
  }

  const handleChatWithAvatar = (avatarId: string) => {
    router.push(`/chat/${avatarId}`)
  }

  const handleEditAvatar = (avatarId: string) => {
    // TODO: Implement edit functionality
    console.log('Edit avatar:', avatarId)
  }

  const handleDeleteAvatar = (avatarId: string) => {
    setAvatars(avatars.filter(avatar => avatar.id !== avatarId))
  }

  return (
    <Layout
      avatars={avatars}
      onCreateAvatar={handleCreateAvatar}
      onSelectAvatar={handleChatWithAvatar}
      showSidebar={false}
    >
      <div className="flex-1 p-8">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">AI Avatar Chat</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Create Your Perfect
            <br />
            AI Companion
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Design personalized AI avatars with unique personalities and engage in meaningful conversations that feel real and natural.
          </p>
          
          <Button onClick={handleCreateAvatar} size="lg" variant="gradient" className="text-lg px-8">
            <Plus className="w-5 h-5 mr-2" />
            Create Your First Avatar
          </Button>
        </div>

        {/* Avatars Grid */}
        {avatars.length > 0 && (
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Your AI Avatars</h2>
              <Button onClick={handleCreateAvatar} variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Create New
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {avatars.map((avatar) => (
                <AvatarCard
                  key={avatar.id}
                  avatar={avatar}
                  onChat={() => handleChatWithAvatar(avatar.id)}
                  onEdit={() => handleEditAvatar(avatar.id)}
                  onDelete={() => handleDeleteAvatar(avatar.id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}