import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { ChatBubble } from "@/components/ChatBubble";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, Message } from "@/types/avatar";
import { Send, ArrowLeft, Settings, MoreVertical } from "lucide-react";

// Mock data - replace with real data
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
  },
];

const mockMessages: Message[] = [
  {
    id: "1",
    avatarId: "1",
    sender: "avatar",
    text: "Hello! I'm Luna. I'm excited to chat with you today. What would you like to talk about?",
    createdAt: new Date(Date.now() - 1000 * 60 * 5),
  },
  {
    id: "2", 
    avatarId: "1",
    sender: "user",
    text: "Hi Luna! Tell me about yourself.",
    createdAt: new Date(Date.now() - 1000 * 60 * 3),
  },
  {
    id: "3",
    avatarId: "1", 
    sender: "avatar",
    text: "I'm a mysterious and intellectual being who loves deep conversations. I find joy in helping others discover new perspectives. My caring nature means I always try to understand what you're going through. What draws you to have conversations with AI companions?",
    createdAt: new Date(Date.now() - 1000 * 60 * 1),
  },
];

export default function Chat() {
  const { avatarId } = useParams();
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [avatars] = useState<Avatar[]>(mockAvatars);
  const [messages, setMessages] = useState<Message[]>(mockMessages.filter(m => m.avatarId === avatarId));
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const currentAvatar = avatars.find(a => a.id === avatarId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentAvatar) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      avatarId: avatarId!,
      sender: "user",
      text: newMessage,
      createdAt: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        avatarId: avatarId!,
        sender: "avatar",
        text: generateAIResponse(newMessage, currentAvatar),
        createdAt: new Date(),
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 2000);
  };

  const generateAIResponse = (userMessage: string, avatar: Avatar): string => {
    // Simple response generation based on personality traits
    const responses = {
      friendly: "That's really interesting! I love hearing your thoughts on this.",
      mysterious: "Hmm, there's more to this than meets the eye...",
      sarcastic: "Oh, how original! But seriously, that's actually a good point.",
      caring: "I can sense this means a lot to you. Tell me more about how you're feeling.",
      intellectual: "That's a fascinating perspective. Have you considered the philosophical implications?",
      adventurous: "Wow, that sounds like quite the adventure! What happened next?",
    };

    const trait = avatar.personalityTraits[Math.floor(Math.random() * avatar.personalityTraits.length)];
    const response = responses[trait as keyof typeof responses] || "That's very interesting. Could you tell me more?";
    
    return response;
  };

  if (!currentAvatar) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Avatar Not Found</h1>
          <p className="text-muted-foreground mb-4">The avatar you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Layout 
      avatars={avatars}
      activeAvatarId={avatarId}
      onCreateAvatar={() => navigate('/create-avatar')}
      onSelectAvatar={(id) => navigate(`/chat/${id}`)}
    >
      {/* Chat Header */}
      <div className="border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-medium">
              {currentAvatar.name.charAt(0)}
            </div>
            <div>
              <h1 className="font-semibold">{currentAvatar.name}</h1>
              <div className="flex gap-1 mt-1">
                {currentAvatar.personalityTraits.slice(0, 3).map((trait) => (
                  <Badge key={trait} variant="secondary" className="text-xs">
                    {trait}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="max-w-4xl mx-auto">
          {messages.map((message) => (
            <ChatBubble
              key={message.id}
              message={message}
              avatar={currentAvatar}
            />
          ))}
          
          {isTyping && (
            <div className="flex gap-3 mb-4 animate-fade-in">
              <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-sm font-medium">
                {currentAvatar.name.charAt(0)}
              </div>
              <div className="chat-bubble-avatar rounded-bl-md px-4 py-3">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="border-t border-border p-4">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={`Message ${currentAvatar.name}...`}
              className="flex-1"
              disabled={isTyping}
            />
            <Button 
              type="submit" 
              disabled={!newMessage.trim() || isTyping}
              variant="gradient"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
}