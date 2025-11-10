import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CalculatorButtonProps {
  value: string;
  onClick: (value: string) => void;
  variant?: "default" | "operator" | "equals" | "clear" | "function";
  span?: number;
}

export const CalculatorButton = ({ 
  value, 
  onClick, 
  variant = "default",
  span = 1 
}: CalculatorButtonProps) => {
  const baseClasses = "h-16 text-xl font-black border-brutal transition-brutal";
  
  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground active:translate-x-[2px] active:translate-y-[2px]",
    operator: "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground active:translate-x-[2px] active:translate-y-[2px]",
    equals: "bg-accent text-accent-foreground hover:bg-muted active:translate-x-[2px] active:translate-y-[2px]",
    clear: "bg-destructive text-destructive-foreground hover:bg-muted active:translate-x-[2px] active:translate-y-[2px]",
    function: "bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground active:translate-x-[2px] active:translate-y-[2px] text-sm",
  };

  return (
    <Button
      onClick={() => onClick(value)}
      className={cn(
        baseClasses,
        variantClasses[variant],
        span === 2 && "col-span-2"
      )}
    >
      {value}
    </Button>
  );
};
