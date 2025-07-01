"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showBadge?: boolean;
  badgeText?: string;
}

const sizeClasses = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-16 w-16",
  xl: "h-64 w-64",
};

const badgeSizeClasses = {
  sm: "w-3 h-3 text-xs",
  md: "w-4 h-4 text-xs",
  lg: "w-6 h-6 text-sm",
  xl: "w-16 h-16 text-xl",
};

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      className,
      src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face&auto=format&q=80",
      alt = "Carlos Bicho",
      fallback = "CB",
      size = "md",
      showBadge = true,
      badgeText = "CB",
      ...props
    },
    ref
  ) => {
    const [imageError, setImageError] = React.useState(false);

    return (
      <div
        ref={ref}
        className={cn("relative", sizeClasses[size], className)}
        {...props}
      >
        {/* Avatar Image */}
        <div className="relative w-full h-full rounded-full overflow-hidden glass shadow-consistent-md border-2 border-primary/20">
          {!imageError ? (
            <Image
              src={src}
              alt={alt}
              fill
              sizes={`${size === "xl" ? "256px" : size === "lg" ? "64px" : size === "md" ? "40px" : "32px"}`}
              className="object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full gradient-primary flex items-center justify-center text-white font-bold">
              {fallback}
            </div>
          )}
        </div>

        {/* Badge */}
        {showBadge && (
          <div
            className={cn(
              "absolute bottom-0 right-0 gradient-primary rounded-full flex items-center justify-center text-white font-bold shadow-consistent-lg border-2 border-background",
              badgeSizeClasses[size]
            )}
          >
            {size === "xl" ? badgeText : badgeText.charAt(0)}
          </div>
        )}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";

export { Avatar };
