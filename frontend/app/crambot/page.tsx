// "use client";

// import { Send, Trash2 } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { cn } from "@/lib/utils";
// import { useChat } from "@/context/ChatContext";
// import { useUpload } from "@/context/UploadContext";
// import EmptyState from "@/components/shared/EmptyState";

// export default function ChatPage() {
//   const { sessionId } = useUpload(); // Retrieve sessionId
//   const { messages, input, setInput, sendMessage, loading } = useChat();

//   if (!sessionId) {
//     return <EmptyState message="Solve doubts with the bot" />;
//   }

//   return (
//     <div className="flex h-full pt-2 max-h-screen bg-background">
//       <Card className="flex flex-col h-full w-full max-w-3xl mx-auto rounded-xl shadow-lg">
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
//           <CardTitle className="text-2xl font-bold">CramBot</CardTitle>
//           <div className="flex items-center gap-2">
//             <Button variant="ghost" size="icon" className="rounded-full">
//               <Trash2 className="h-5 w-5" />
//               <span className="sr-only">Clear chat</span>
//             </Button>
//           </div>
//         </CardHeader>
//         <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
//           {messages.map((message) => (
//             <div
//               key={message.id}
//               className={cn(
//                 "flex w-max max-w-[80%] flex-col gap-2 rounded-lg px-4 py-2 text-sm",
//                 message.type === "user"
//                   ? "ml-auto bg-primary text-primary-foreground"
//                   : "bg-muted"
//               )}
//             >
//               {message.message}
//             </div>
//           ))}
//           {loading && (
//             <div className="flex w-max max-w-[80%] flex-col gap-2 rounded-lg px-4 py-2 text-sm bg-muted">
//               <div className="flex space-x-2">
//                 <div className="w-2 h-2 rounded-full bg-foreground/30 animate-bounce" />
//                 <div className="w-2 h-2 rounded-full bg-foreground/30 animate-bounce [animation-delay:0.2s]" />
//                 <div className="w-2 h-2 rounded-full bg-foreground/30 animate-bounce [animation-delay:0.4s]" />
//               </div>
//             </div>
//           )}
//         </CardContent>
//         <CardFooter className="p-4 pt-2">
//           <form
//             onSubmit={(e) => {
//               e.preventDefault();
//               sendMessage(sessionId);
//             }}
//             className="flex w-full gap-2"
//           >
//             <Input
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="Ask CramBot anything..."
//               className="flex-1"
//             />
//             <Button type="submit" size="icon" disabled={!input || loading}>
//               <Send className="h-5 w-5" />
//               <span className="sr-only">Send message</span>
//             </Button>
//           </form>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// }

"use client";

import { useRef, useEffect } from "react";
import { Send, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useChat } from "@/context/ChatContext";
import { useUpload } from "@/context/UploadContext";
import EmptyState from "@/components/shared/EmptyState";
import ChatLoadingIndicator  from "@/components/shared/ChatLoadingIndicator";

export default function ChatPage() {
  const { sessionId } = useUpload(); // Retrieve sessionId
  const { messages, input, setInput, sendMessage, loading, clearChat } = useChat();
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  function extractMiddle(str: string) {
    if (str.length <= 8) return ""; // If string is too short, return empty
    return str.slice(7, -3); // Remove first 7 and last 3 characters
}

  // Auto-scroll to bottom when messages or loading state changes
  useEffect(() => {
    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      container.scrollTop = container.scrollHeight;
    }
  }, [messages, loading]);

  if (!sessionId) {
    return <EmptyState message="Solve doubts with the bot" />;
  }

  return (
    <div className="flex h-full pt-2 max-h-screen bg-background">
      <Card className="flex flex-col h-full w-full max-w-3xl mx-auto rounded-xl shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
          <CardTitle className="text-2xl font-bold">CramBot</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full" onClick={clearChat}>
              <Trash2 className="h-5 w-5" />
              <span className="sr-only">Clear chat</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent 
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-4"
        >
          {messages.length === 0 ? (
            <div className="h-full w-full flex justify-center items-center">
              <p className="text-gray-500 text-center text-lg">
              "CramBot answers based on the documents provided. Ask anything!"
            </p>
            </div>
          ):(<>
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex w-max max-w-[80%] flex-col gap-2 rounded-lg px-4 py-2 text-sm",
                message.type === "user"
                  ? "ml-auto bg-primary text-primary-foreground"
                  : "bg-muted"
              )}
            >
            {message.type === "bot" ? (<div dangerouslySetInnerHTML={{ __html: extractMiddle(message.message) }} />):(<div dangerouslySetInnerHTML={{ __html: message.message }} />)}
            </div>
          ))}
          {loading && (
            <ChatLoadingIndicator />
          )}</>)}
        </CardContent>
        <CardFooter className="p-4 pt-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(sessionId);
              setInput("")
            }}
            className="flex w-full gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask CramBot anything..."
              className="flex-1"
            />
            <Button type="submit" size="icon" disabled={!input || loading}>
              <Send className="h-5 w-5" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}

