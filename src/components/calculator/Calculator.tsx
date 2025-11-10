import { useState } from "react";
import { CalculatorDisplay } from "./CalculatorDisplay";
import { CalculatorButton } from "./CalculatorButton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

type CalculatorMode = "simple" | "scientific";

export const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [mode, setMode] = useState<CalculatorMode>("simple");
  const [lastResult, setLastResult] = useState(false);

  const handleNumber = (num: string) => {
    if (lastResult) {
      setDisplay(num);
      setExpression("");
      setLastResult(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const handleOperator = (op: string) => {
    setExpression(display + " " + op + " ");
    setDisplay("0");
    setLastResult(false);
  };

  const handleClear = () => {
    setDisplay("0");
    setExpression("");
    setLastResult(false);
  };

  const handleEquals = () => {
    try {
      const fullExpression = expression + display;
      // Safe evaluation using Function constructor
      const result = Function('"use strict"; return (' + fullExpression.replace(/×/g, '*').replace(/÷/g, '/') + ')')();
      setDisplay(String(result));
      setExpression(fullExpression + " =");
      setLastResult(true);
    } catch {
      setDisplay("ERROR");
      setExpression("");
    }
  };

  const handleDecimal = () => {
    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const handleFunction = (func: string) => {
    try {
      const num = parseFloat(display);
      let result: number;

      switch (func) {
        case "sin":
          result = Math.sin(num * Math.PI / 180);
          break;
        case "cos":
          result = Math.cos(num * Math.PI / 180);
          break;
        case "tan":
          result = Math.tan(num * Math.PI / 180);
          break;
        case "log":
          result = Math.log10(num);
          break;
        case "ln":
          result = Math.log(num);
          break;
        case "sqrt":
          result = Math.sqrt(num);
          break;
        case "x²":
          result = num * num;
          break;
        case "x³":
          result = num * num * num;
          break;
        case "1/x":
          result = 1 / num;
          break;
        case "π":
          setDisplay(String(Math.PI));
          return;
        case "e":
          setDisplay(String(Math.E));
          return;
        default:
          return;
      }

      setDisplay(String(result));
      setExpression(func + "(" + num + ") =");
      setLastResult(true);
    } catch {
      setDisplay("ERROR");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-5xl font-black mb-8 text-center border-brutal-thick border-foreground bg-primary text-primary-foreground p-4">
          CALCULATOR
        </h1>

        <Tabs value={mode} onValueChange={(v) => setMode(v as CalculatorMode)} className="mb-6">
          <TabsList className="grid w-full grid-cols-2 border-brutal border-foreground bg-card p-1 gap-1">
            <TabsTrigger 
              value="simple" 
              className="border-brutal border-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-black"
            >
              SIMPLE
            </TabsTrigger>
            <TabsTrigger 
              value="scientific"
              className="border-brutal border-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-black"
            >
              SCIENTIFIC
            </TabsTrigger>
          </TabsList>

          <TabsContent value="simple" className="mt-6">
            <CalculatorDisplay value={display} expression={expression} />
            
            <div className="grid grid-cols-4 gap-2">
              <CalculatorButton value="C" onClick={handleClear} variant="clear" />
              <CalculatorButton value="÷" onClick={handleOperator} variant="operator" />
              <CalculatorButton value="×" onClick={handleOperator} variant="operator" />
              <CalculatorButton value="⌫" onClick={() => setDisplay(display.slice(0, -1) || "0")} variant="operator" />
              
              <CalculatorButton value="7" onClick={handleNumber} />
              <CalculatorButton value="8" onClick={handleNumber} />
              <CalculatorButton value="9" onClick={handleNumber} />
              <CalculatorButton value="-" onClick={handleOperator} variant="operator" />
              
              <CalculatorButton value="4" onClick={handleNumber} />
              <CalculatorButton value="5" onClick={handleNumber} />
              <CalculatorButton value="6" onClick={handleNumber} />
              <CalculatorButton value="+" onClick={handleOperator} variant="operator" />
              
              <CalculatorButton value="1" onClick={handleNumber} />
              <CalculatorButton value="2" onClick={handleNumber} />
              <CalculatorButton value="3" onClick={handleNumber} />
              <CalculatorButton value="=" onClick={handleEquals} variant="equals" />
              
              <CalculatorButton value="0" onClick={handleNumber} span={2} />
              <CalculatorButton value="." onClick={handleDecimal} />
            </div>
          </TabsContent>

          <TabsContent value="scientific" className="mt-6">
            <CalculatorDisplay value={display} expression={expression} />
            
            <div className="grid grid-cols-5 gap-2 mb-4">
              <CalculatorButton value="sin" onClick={handleFunction} variant="function" />
              <CalculatorButton value="cos" onClick={handleFunction} variant="function" />
              <CalculatorButton value="tan" onClick={handleFunction} variant="function" />
              <CalculatorButton value="log" onClick={handleFunction} variant="function" />
              <CalculatorButton value="ln" onClick={handleFunction} variant="function" />
              
              <CalculatorButton value="x²" onClick={handleFunction} variant="function" />
              <CalculatorButton value="x³" onClick={handleFunction} variant="function" />
              <CalculatorButton value="sqrt" onClick={handleFunction} variant="function" />
              <CalculatorButton value="1/x" onClick={handleFunction} variant="function" />
              <CalculatorButton value="π" onClick={handleFunction} variant="function" />
            </div>

            <div className="grid grid-cols-4 gap-2">
              <CalculatorButton value="C" onClick={handleClear} variant="clear" />
              <CalculatorButton value="÷" onClick={handleOperator} variant="operator" />
              <CalculatorButton value="×" onClick={handleOperator} variant="operator" />
              <CalculatorButton value="⌫" onClick={() => setDisplay(display.slice(0, -1) || "0")} variant="operator" />
              
              <CalculatorButton value="7" onClick={handleNumber} />
              <CalculatorButton value="8" onClick={handleNumber} />
              <CalculatorButton value="9" onClick={handleNumber} />
              <CalculatorButton value="-" onClick={handleOperator} variant="operator" />
              
              <CalculatorButton value="4" onClick={handleNumber} />
              <CalculatorButton value="5" onClick={handleNumber} />
              <CalculatorButton value="6" onClick={handleNumber} />
              <CalculatorButton value="+" onClick={handleOperator} variant="operator" />
              
              <CalculatorButton value="1" onClick={handleNumber} />
              <CalculatorButton value="2" onClick={handleNumber} />
              <CalculatorButton value="3" onClick={handleNumber} />
              <CalculatorButton value="=" onClick={handleEquals} variant="equals" />
              
              <CalculatorButton value="0" onClick={handleNumber} span={2} />
              <CalculatorButton value="." onClick={handleDecimal} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
