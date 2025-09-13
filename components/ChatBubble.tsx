import { cn } from "@/lib/utils";

interface Message {
  id: string;
  sender: "user" | "avatar";
  text: string;
  timestamp: Date;
}

interface ChatBubbleProps {
  message: Message;
  isTyping?: boolean;
}

export function ChatBubble({ message, isTyping = false }: ChatBubbleProps) {
  const isUser = message.sender === "user";
  
  return (
    <div className={cn(
      "flex animate-fade-in",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "max-w-[70%] rounded-2xl px-4 py-3 shadow-sm",
        isUser 
          ? "chat-bubble-user ml-auto"
          : "chat-bubble-avatar mr-auto",
        isTyping && "animate-pulse"
      )}>
        <p className="text-sm leading-relaxed">
          {isTyping ? (
            <span className="flex gap-1">
              <span className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </span>
          ) : (
            message.text
          )}
        </p>
        
        {!isTyping && (
          <p className="text-xs opacity-70 mt-1">
            {message.timestamp.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </p>
        )}
      </div>
    </div>
  );
}