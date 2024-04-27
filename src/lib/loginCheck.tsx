"use client";
import { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

let inactivityTime: ReturnType<typeof setTimeout> | null = null;

const LoginCheck = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const logout = () => {
    // Clear the timeout and logout the user
    if (inactivityTime) clearTimeout(inactivityTime);
    signOut();
  };

  const resetTimer = () => {
    if (inactivityTime) clearTimeout(inactivityTime);
    // Set the timeout for 30 minutes of inactivity
    inactivityTime = setTimeout(logout, 30 * 60 * 1000);
  };

  useEffect(() => {
    if (!session) {
      return;
    } else {
      // If the user is already logged in, redirect them to the /report page
      router.push("/report");
      // Reset the timer whenever there's a mouse movement, click, or key press
      window.addEventListener("mousemove", resetTimer);
      window.addEventListener("mousedown", resetTimer);
      window.addEventListener("keypress", resetTimer);
      window.addEventListener("touchmove", resetTimer);
      // Initialize the inactivity timer
      resetTimer();
    }

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("mousedown", resetTimer);
      window.removeEventListener("keypress", resetTimer);
      window.removeEventListener("touchmove", resetTimer);
    };
  }, [session, router]);

  return null;
};

export default LoginCheck;
