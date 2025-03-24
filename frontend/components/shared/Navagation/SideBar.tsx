"use client";
import { Menu, Home, Upload, AlertCircle, Bot, Award } from "lucide-react";
import { ThemeToggle } from '@/components/theme-toggle';
import { useCallback, useState } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { LucideProps } from 'lucide-react';

type RouteInfo = {
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  name: string;
};

type RouteIconsType = {
  [key: string]: RouteInfo;
};

const RouteIcons: RouteIconsType = {
  '/': { icon: Home, name: 'Home' },
  '/upload': { icon: Upload, name: 'Upload Files' },
  '/panic-notes': { icon: AlertCircle, name: 'Panic Notes' },
  '/crambot': { icon: Bot, name: 'CramBot' },
  '/quizzard': { icon: Award, name: 'Quizzard' }
};

const SideBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const pathname = usePathname();

  const toggleMenue = useCallback(() => {
    setShowMenu((prev) => !prev);
  }, []);

  return showMenu ? (
    <nav className="w-64 flex flex-col justify-between items-start bg-background/50 p-2 space-y-4 h-screen">
      <div className="w-[100%]">
        <div className="flex justify-between items-center space-x-2 mb-8">
          <span className="font-bold text-lg">Menu</span>
          <span>
            <Menu className="w-6 h-6 cursor-pointer" onClick={toggleMenue} />
          </span>
        </div>
        <div className="space-y-2">
          <Link href="/" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-accent transition-colors">
            <Home className="w-6 h-6" />
            <span>Home</span>
          </Link>
          <Link href="/upload" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-accent transition-colors">
            <Upload className="w-6 h-6" />
            <span>Upload Files</span>
          </Link>
          <Link href="/panic-notes" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-accent transition-colors">
            <AlertCircle className="w-6 h-6" />
            <span>Panic Notes</span>
          </Link>
          <Link href="/crambot" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-accent transition-colors">
            <Bot className="w-6 h-6" />
            <span>CramBot</span>
          </Link>
          <Link href="/quizzard" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-accent transition-colors">
            <Award className="w-6 h-6" />
            <span>Quizzard</span>
          </Link>
        </div>
      </div>
      <ThemeToggle />
    </nav>
  ) : (
    <nav className="w-20 flex flex-col justify-between items-center bg-background/50 p-2 space-y-4 h-screen">
      <div className="w-full flex flex-col items-center">
        <div className="mb-8 w-full flex justify-center">
          <Menu className="w-6 h-6 cursor-pointer" onClick={toggleMenue} />
        </div>
        <div className="space-y-6 w-full flex flex-col items-center">
          {Object.entries(RouteIcons).map(([path, { icon: Icon }]) => (
            <Link 
              key={path} 
              href={path} 
              className={`flex flex-col items-center justify-center space-y-1 p-2 rounded-lg hover:bg-accent transition-colors w-full ${
                pathname === path ? 'bg-accent' : ''
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs text-center w-full">
                {RouteIcons[path].name}
              </span>
            </Link>
          ))}
        </div>
      </div>
      <ThemeToggle />
    </nav>
  );
};

export default SideBar;