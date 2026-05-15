"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
        
              <Image 
                src="/logo.ico" 
                alt="Job Board Logo" 
                width={40} 
                height={40} 
                className="h-8 w-auto" 
                priority // Speeds up loading for core branding elements
              />
              <span className="ml-2 text-xl font-semibold text-gray-900">
                Job Board
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link 
              href="/jobs" 
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Browse Jobs
            </Link>
            
            {isLoading ? (
              <span className="text-gray-400 text-sm px-3 py-2">Loading...</span>
            ) : session ? (
              <>
                <Link 
                  href="/jobs/post" 
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Post a Job
                </Link>
                <Link 
                  href="/dashboard" 
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </Link>
                <button 
                  onClick={() => signOut({ redirectTo: "/auth/signin" })} 
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link 
                href="/auth/signin" 
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
