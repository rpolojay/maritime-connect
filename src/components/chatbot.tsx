'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MessageSquare, X, Send, Loader2 } from 'lucide-react';
import { chat } from '@/ai/flows/chat-flow';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';


type Message = {
  text: string;
  sender: 'user' | 'ai';
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = { text: inputValue, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
        const result = await chat({ message: inputValue });
        const aiMessage: Message = { text: result.response, sender: 'ai' };
        setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
        console.error('Chatbot error:', error);
        const errorMessage: Message = {
            text: "Sorry, I'm having trouble connecting. Please try again later.",
            sender: 'ai',
        };
        setMessages((prev) => [...prev, errorMessage]);
    } finally {
        setIsLoading(false);
    }
  };
  
    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({
                top: scrollAreaRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }
    }, [messages]);


  return (
    <>
      <div className={cn("fixed bottom-4 right-4 z-50 transition-transform duration-300", 
        isOpen ? 'translate-x-[500px]' : 'translate-x-0'
      )}>
        <Button onClick={toggleChat} size="lg" className="rounded-full shadow-lg">
            <MessageSquare className="mr-2 h-6 w-6" />
            Chat with Assistant
        </Button>
      </div>

      <div
        className={cn(
          'fixed bottom-4 right-4 z-50 w-full max-w-sm transition-all duration-300 ease-in-out',
          isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
        )}
      >
        <Card className="flex flex-col h-[60vh] shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>AI Assistant</CardTitle>
            <Button variant="ghost" size="icon" onClick={toggleChat}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="flex-grow p-0">
             <ScrollArea className="h-full px-6 py-4" ref={scrollAreaRef}>
                 <div className="space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={cn('flex items-end gap-2', msg.sender === 'user' ? 'justify-end' : 'justify-start')}>
                             {msg.sender === 'ai' && (
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback>AI</AvatarFallback>
                                </Avatar>
                            )}
                            <div
                                className={cn(
                                'max-w-[75%] rounded-lg p-3 text-sm',
                                msg.sender === 'user'
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-muted'
                                )}
                            >
                                {msg.text}
                            </div>
                            {msg.sender === 'user' && (
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                            )}
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex items-center gap-2">
                             <Avatar className="h-8 w-8">
                                <AvatarFallback>AI</AvatarFallback>
                            </Avatar>
                            <div className="bg-muted rounded-lg p-3">
                                <Loader2 className="h-5 w-5 animate-spin" />
                            </div>
                        </div>
                    )}
                 </div>
             </ScrollArea>
          </CardContent>
          <CardFooter className="pt-4">
            <div className="flex w-full items-center space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
                placeholder="Ask a question..."
                disabled={isLoading}
              />
              <Button onClick={handleSendMessage} disabled={isLoading}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
