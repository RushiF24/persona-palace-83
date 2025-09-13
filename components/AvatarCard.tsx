import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar as AvatarType } from "@/types/avatar";
import { MessageCircle, Edit, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AvatarCardProps {
  avatar: AvatarType;
  onChat?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  isActive?: boolean;
  compact?: boolean;
}

export function AvatarCard({ 
  avatar, 
  onChat, 
  onEdit, 
  onDelete, 
  isActive = false,
  compact = false 
}: AvatarCardProps) {
  return (
    <Card className={cn(
      "p-4 transition-all duration-200 hover:shadow-card cursor-pointer group",
      isActive && "ring-2 ring-primary shadow-glow",
      compact && "p-3"
    )}>
      <div className="flex items-start gap-3">
        <div className={cn(
          "rounded-full bg-gradient-primary flex items-center justify-center text-white font-medium shrink-0",
          compact ? "w-8 h-8 text-sm" : "w-12 h-12"
        )}>
          {avatar.name.charAt(0).toUpperCase()}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className={cn("font-medium truncate", compact ? "text-sm" : "text-base")}>
            {avatar.name}
          </h3>
          
          {!compact && (
            <>
              <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                {avatar.appearance.gender} • {avatar.appearance.age} • {avatar.appearance.hair} hair
              </p>
              
              <div className="flex flex-wrap gap-1 mb-3">
                {avatar.personalityTraits.slice(0, 3).map((trait) => (
                  <Badge key={trait} variant="secondary" className="text-xs">
                    {trait}
                  </Badge>
                ))}
                {avatar.personalityTraits.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{avatar.personalityTraits.length - 3}
                  </Badge>
                )}
              </div>
            </>
          )}
          
          {compact && (
            <div className="flex gap-1 mt-1">
              {avatar.personalityTraits.slice(0, 2).map((trait) => (
                <Badge key={trait} variant="secondary" className="text-xs px-1 py-0">
                  {trait}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {!compact && (
        <div className="flex gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button size="sm" onClick={onChat} className="flex-1">
            <MessageCircle className="w-4 h-4 mr-1" />
            Chat
          </Button>
          <Button size="sm" variant="outline" onClick={onEdit}>
            <Edit className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="outline" onClick={onDelete}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      )}
    </Card>
  );
}