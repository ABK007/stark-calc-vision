interface CalculatorDisplayProps {
  value: string;
  expression: string;
}

export const CalculatorDisplay = ({ value, expression }: CalculatorDisplayProps) => {
  return (
    <div className="bg-card border-brutal-thick border-foreground p-6 mb-6">
      <div className="text-muted-foreground text-sm font-bold mb-2 h-6 overflow-hidden text-right">
        {expression}
      </div>
      <div className="text-foreground text-4xl font-black text-right overflow-hidden">
        {value || "0"}
      </div>
    </div>
  );
};
