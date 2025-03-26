"use client";
import {
  Menu,
  Home,
  Upload,
  AlertCircle,
  Bot,
  Award,
  Power,
  X,
  BotMessageSquare,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useCallback, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { LucideProps } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useUpload } from "@/context/UploadContext";
import { toast } from "react-toastify";
import { logoutUser } from "@/lib/api";

type RouteInfo = {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  name: string;
};

type RouteIconsType = {
  [key: string]: RouteInfo;
};

const RouteIcons: RouteIconsType = {
  "/": { icon: Home, name: "Home" },
  "/upload": { icon: Upload, name: "Upload Files" },
  "/panic-notes": { icon: AlertCircle, name: "Panic Notes" },
  "/crambot": { icon: Bot, name: "CramBot" },
  "/quizzard": { icon: Award, name: "Quizzard" },
  "http://localhost:5000/": { icon: BotMessageSquare, name: "New Feature" },
};

const SideBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showEndSessionDialog, setShowEndSessionDialog] = useState(false);
  const pathname = usePathname();
  const { sessionId, setUploadData } = useUpload();

  const toggleMenue = useCallback(() => {
    setShowMenu((prev) => !prev);
  }, []);

  const handleEndSession = async () => {
    try {
      await logoutUser(sessionId);
      setUploadData([],'')
      toast.success("Session ended successfully");
      setShowEndSessionDialog(false);
    } catch (error) {
      console.error("Error ending session:", error);
      toast.error("Failed to end session");
    }
  };

  const renderCollapseButton = () => (
    <div className="mb-8 w-full flex justify-center">
      <Menu className="w-6 h-6 cursor-pointer" onClick={toggleMenue} />
    </div>
  );

  const renderSessionButton = () => (
    // <Button
    //   variant="destructive"
    //   size="sm"
    //   className="w-full flex items-center justify-center gap-2"
    //   onClick={() => setShowEndSessionDialog(true)}
    //   disabled={!sessionId}
    // >
    //   <Power className="w-4 h-4" />
    //   {showMenu ? "End Session" : "End Session"}
    // </Button>
    <button
      className={`all-unset cursor-pointer flex justify-center items-center space-x-2 p-2 rounded-lg hover:bg-red-500 transition-colors text-sm bg-red-400 text-primary-foreground`}
      disabled={!sessionId}
      onClick={() => setShowEndSessionDialog(true)}
      >
      <p>End Session</p>
    </button>
  );

  const EndSessionDialog = () => (
    <Dialog open={showEndSessionDialog} onOpenChange={setShowEndSessionDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>End Current Session</DialogTitle>
          <DialogDescription>
            Are you sure you want to end the current session? This will clear
            all your current progress and uploaded files.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setShowEndSessionDialog(false)}
          >
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleEndSession}>
            Confirm End Session
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return (
    <>
      {showMenu ? (
        <nav className="w-64 flex flex-col justify-between items-start bg-background/50 p-2 space-y-4 h-screen">
          <div className="w-[100%]">
            <div className="flex justify-between items-center space-x-2 mb-8">
              <span className="font-bold text-lg">Menu</span>
              <span>
                <Menu
                  className="w-6 h-6 cursor-pointer"
                  onClick={toggleMenue}
                />
              </span>
            </div>
            <div className="space-y-2">
              {Object.entries(RouteIcons).map(
                ([path, { icon: Icon, name }]) => (
                  <Link
                    key={path}
                    href={path}
                    className={`flex items-center space-x-2 p-2 rounded-lg hover:bg-accent transition-colors ${
                      pathname === path ? "bg-accent" : ""
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                    <span>{name}</span>
                  </Link>
                )
              )}
            </div>
          </div>
          <div className="w-full space-y-4">
            <ThemeToggle />
            {renderSessionButton()}
          </div>
        </nav>
      ) : (
        <nav className="w-20 flex flex-col justify-between items-center bg-background/50 p-2 space-y-4 h-screen">
          <div className="w-full flex flex-col items-center">
            {renderCollapseButton()}
            <div className="space-y-6 w-full flex flex-col items-center">
  {Object.entries(RouteIcons).map(([path, { icon: Icon }]) => {
    const isExternal = path.includes("http"); // Check if path is an external link

    return isExternal ? (
      <a
        key={path}
        href={path}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center space-y-1 p-2 rounded-lg hover:bg-accent transition-colors w-full"
      >
        <Icon className="w-6 h-6" />
        <span className="text-xs text-center w-full">
          {RouteIcons[path].name}
        </span>
      </a>
    ) : (
      <Link
        key={path}
        href={path}
        className={`flex flex-col items-center justify-center space-y-1 p-2 rounded-lg hover:bg-accent transition-colors w-full ${
          pathname === path ? "bg-accent" : ""
        }`}
      >
        <Icon className="w-6 h-6" />
        <span className="text-xs text-center w-full">
          {RouteIcons[path].name}
        </span>
      </Link>
    );
  })}
</div>

          </div>
          <div className="w-full flex flex-col items-center space-y-4">
            <ThemeToggle />
            {renderSessionButton()}
          </div>
        </nav>
      )}
      <EndSessionDialog />
    </>
  );
};

export default SideBar;
