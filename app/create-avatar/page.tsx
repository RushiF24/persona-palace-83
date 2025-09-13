'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Layout } from "@/components/Layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar } from "@/types/avatar"
import { ArrowLeft, Sparkles, Save } from "lucide-react"

const personalityOptions = [
  "Friendly", "Sarcastic", "Wise", "Playful", "Mysterious", 
  "Caring", "Adventurous", "Shy", "Confident", "Humorous",
  "Analytical", "Creative", "Empathetic", "Philosophical", "Energetic"
]

const genderOptions = ["Male", "Female", "Non-binary", "Other"]
const ageOptions = ["18-25", "26-35", "36-45", "46-55", "55+"]
const hairOptions = [
  "Short black", "Long black", "Short brown", "Long brown",
  "Short blonde", "Long blonde", "Short red", "Long red",
  "Short silver", "Long silver", "Curly", "Straight", "Wavy"
]

export default function CreateAvatar() {
  const router = useRouter()
  const [avatar, setAvatar] = useState<Partial<Avatar>>({
    name: "",
    appearance: {
      gender: "",
      age: "", 
      hair: "",
      clothing: ""
    },
    personalityTraits: []
  })

  const handlePersonalityToggle = (trait: string) => {
    const currentTraits = avatar.personalityTraits || []
    const newTraits = currentTraits.includes(trait)
      ? currentTraits.filter(t => t !== trait)
      : [...currentTraits, trait]
    
    setAvatar(prev => ({
      ...prev,
      personalityTraits: newTraits
    }))
  }

  const handleSave = () => {
    if (!avatar.name || !avatar.appearance?.gender || avatar.personalityTraits?.length === 0) {
      alert("Please fill in all required fields")
      return
    }

    // TODO: Save to database
    console.log("Saving avatar:", avatar)
    router.push("/")
  }

  return (
    <Layout showSidebar={false}>
      <div className="flex-1 p-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <h1 className="text-2xl font-semibold">Create New Avatar</h1>
            </div>
          </div>

          <div className="space-y-6">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Avatar Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter avatar name"
                    value={avatar.name}
                    onChange={(e) => setAvatar(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Appearance */}
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Gender *</Label>
                    <Select 
                      value={avatar.appearance?.gender} 
                      onValueChange={(value) => 
                        setAvatar(prev => ({
                          ...prev,
                          appearance: { ...prev.appearance!, gender: value }
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        {genderOptions.map(option => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Age Range</Label>
                    <Select 
                      value={avatar.appearance?.age} 
                      onValueChange={(value) => 
                        setAvatar(prev => ({
                          ...prev,
                          appearance: { ...prev.appearance!, age: value }
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select age" />
                      </SelectTrigger>
                      <SelectContent>
                        {ageOptions.map(option => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Hair</Label>
                    <Select 
                      value={avatar.appearance?.hair} 
                      onValueChange={(value) => 
                        setAvatar(prev => ({
                          ...prev,
                          appearance: { ...prev.appearance!, hair: value }
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select hair" />
                      </SelectTrigger>
                      <SelectContent>
                        {hairOptions.map(option => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Clothing Style</Label>
                    <Input
                      placeholder="e.g., Casual hoodie, Elegant dress"
                      value={avatar.appearance?.clothing}
                      onChange={(e) => 
                        setAvatar(prev => ({
                          ...prev,
                          appearance: { ...prev.appearance!, clothing: e.target.value }
                        }))
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Personality Traits */}
            <Card>
              <CardHeader>
                <CardTitle>Personality Traits *</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Select traits that define your avatar's personality (choose at least 1)
                </p>
                <div className="flex flex-wrap gap-2">
                  {personalityOptions.map(trait => {
                    const isSelected = avatar.personalityTraits?.includes(trait)
                    return (
                      <Badge
                        key={trait}
                        variant={isSelected ? "default" : "outline"}
                        className="cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => handlePersonalityToggle(trait)}
                      >
                        {trait}
                      </Badge>
                    )
                  })}
                </div>
                {avatar.personalityTraits && avatar.personalityTraits.length > 0 && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Selected: {avatar.personalityTraits.join(", ")}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button onClick={handleSave} size="lg" variant="gradient">
                <Save className="w-4 h-4 mr-2" />
                Create Avatar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}