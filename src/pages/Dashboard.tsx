import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AvatarCard } from "@/components/AvatarCard";
import { Avatar } from "@/types/avatar";
import { Plus, MessageCircle, Sparkles, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data - replace with real data from your backend
const mockAvatars: Avatar[] = [
  {
    id: "1",
    name: "Luna",
    appearance: {
      gender: 'female',
      age: 'young adult',
      hair: 'silver',
      clothing: 'fantasy',
    },
    personalityTraits: ['mysterious', 'caring', 'intellectual'],
    createdAt: new Date('2024-01-15'),
    lastChatAt: new Date('2024-01-20'),
  },
  {
    id: "2", 
    name: "Rex",
    appearance: {
      gender: 'male',
      age: 'adult',
      hair: 'black',
      clothing: 'casual',
    },
    personalityTraits: ['adventurous', 'confident', 'playful'],
    createdAt: new Date('2024-01-10'),
    lastChatAt: new Date('2024-01-19'),
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState<Avatar[]>(mockAvatars);

  const handleCreateAvatar = () => {
    navigate('/create-avatar');
  };

  const handleChatWithAvatar = (avatarId: string) => {
    navigate(`/chat/${avatarId}`);
  };

  const handleEditAvatar = (avatarId: string) => {
    navigate(`/edit-avatar/${avatarId}`);
  };

  return (
    <Layout 
      avatars={avatars}
      onCreateAvatar={handleCreateAvatar}
      onSelectAvatar={handleChatWithAvatar}
    >
      {/* Main Dashboard Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome to AI Avatar Chat</h1>
            <p className="text-muted-foreground">Create unique AI companions and have engaging conversations</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  Total Avatars
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{avatars.length}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Conversations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Messages Today
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">47</div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Avatars */}
          {avatars.length > 0 ? (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Your Avatars</h2>
                <Button onClick={handleCreateAvatar} variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {avatars.map((avatar) => (
                  <AvatarCard
                    key={avatar.id}
                    avatar={avatar}
                    onChat={() => handleChatWithAvatar(avatar.id)}
                    onEdit={() => handleEditAvatar(avatar.id)}
                    onDelete={() => {
                      setAvatars(prev => prev.filter(a => a.id !== avatar.id));
                    }}
                  />
                ))}
              </div>
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Create Your First Avatar</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Design unique AI companions with distinct personalities and start having amazing conversations
              </p>
              <Button onClick={handleCreateAvatar} size="lg" variant="gradient">
                <Plus className="w-5 h-5 mr-2" />
                Create Avatar
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}