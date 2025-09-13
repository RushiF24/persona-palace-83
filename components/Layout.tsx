import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, MessageCircle, Settings, User, LogOut } from "lucide-react";
import { AvatarCard } from "./AvatarCard";
import { Avatar } from "@/types/avatar";

interface LayoutProps {
  children: ReactNode;
  avatars?: Avatar[];
  activeAvatarId?: string;
  onCreateAvatar?: () => void;
  onSelectAvatar?: (avatarId: string) => void;
  showSidebar?: boolean;
}

export function Layout({ 
  children, 
  avatars = [], 
  activeAvatarId, 
  onCreateAvatar, 
  onSelectAvatar,
  showSidebar = true 
}: LayoutProps) {
  return (
    <div className="h-screen bg-gradient-chat flex">
      {showSidebar && (
        <div className="w-80 bg-card border-r border-border flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-lg font-semibold">AI Avatar Chat</h1>
            </div>
            
            <Button onClick={onCreateAvatar} className="w-full" variant="gradient">
              <Plus className="w-4 h-4 mr-2" />
              Create Avatar
            </Button>
          </div>
          
          {/* Avatars List */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Your Avatars
              </h2>
              <Badge variant="secondary">{avatars.length}</Badge>
            </div>
            
            <div className="space-y-3">
              {avatars.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No avatars yet</p>
                  <p className="text-xs">Create your first AI companion</p>
                </div>
              ) : (
                avatars.map((avatar) => (
                  <AvatarCard
                    key={avatar.id}
                    avatar={avatar}
                    isActive={avatar.id === activeAvatarId}
                    compact
                    onChat={() => onSelectAvatar?.(avatar.id)}
                  />
                ))
              )}
            </div>
          </div>
          
          {/* Footer */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <User className="w-4 h-4 mr-1" />
                Profile
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <Settings className="w-4 h-4 mr-1" />
                Settings
              </Button>
              <Button variant="outline" size="sm">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {children}
      </div>
    </div>
  );
}