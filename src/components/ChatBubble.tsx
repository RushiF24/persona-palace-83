import { cn } from "@/lib/utils";
import { Avatar } from "@/types/avatar";

interface ChatBubbleProps {
  message: {
    id: string;
    sender: 'user' | 'avatar';
    text: string;
    createdAt: Date;
  };
  avatar?: Avatar;
}

export function ChatBubble({ message, avatar }: ChatBubbleProps) {
  const isUser = message.sender === 'user';
  
  return (
    <div className={cn("flex gap-3 mb-4 animate-fade-in", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-sm font-medium shrink-0">
          {avatar?.name.charAt(0) || 'A'}
        </div>
      )}
      
      <div className={cn("max-w-xs lg:max-w-md px-4 py-3 rounded-2xl", 
        isUser 
          ? "chat-bubble-user rounded-br-md" 
          : "chat-bubble-avatar rounded-bl-md"
      )}>
        <p className="text-sm leading-relaxed">{message.text}</p>
        <div className={cn("text-xs mt-2 opacity-70", 
          isUser ? "text-primary-foreground" : "text-muted-foreground"
        )}>
          {message.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
      
      {isUser && (
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-medium shrink-0">
          You
        </div>
      )}
    </div>
  );
}