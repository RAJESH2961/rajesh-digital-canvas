
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-poppins font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden group uppercase tracking-wide",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary-600 hover:text-black dark:hover:text-white shadow-lg hover:shadow-xl transform hover:scale-105",
        destructive: "bg-red-500 text-white hover:bg-red-600 hover:text-black dark:hover:text-white shadow-lg hover:shadow-xl transform hover:scale-105",
        outline: "border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-black dark:hover:text-white transform hover:scale-105 transition-all",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:text-black dark:hover:text-white shadow-sm transform hover:scale-105",
        ghost: "text-primary hover:bg-primary/10 hover:text-black dark:hover:text-white transform hover:scale-105",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary/80",
      },
      size: {
        default: "h-12 px-6 py-3 text-base",
        sm: "h-10 px-4 py-2 text-sm",
        lg: "h-14 px-8 py-4 text-lg",
        icon: "h-12 w-12",
        full: "h-12 px-6 py-3 w-full text-base"
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
