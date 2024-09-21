import { ModeToggle } from "@/components/mode-toggle";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

export default function HomeScreen() {
  const { toast } = useToast();

  const handleClick = () => {
    toast({
      title: "Welcome to ActFour-Fitness",
      description: "This is a fitness app that will help you track your progress and achieve your fitness goals.",
      variant: "default",
      duration: 2000,
    });
  };
  return (
    <div className="min-w-screen min-h-screen flex flex-col items-center justify-center">
      <h1 className="font-bold"> Welcome To ActFour-Fitness </h1>
      <ModeToggle />
      <Button variant="outline" onClick={handleClick}>ShowToast</Button>
    </div>
  );
};