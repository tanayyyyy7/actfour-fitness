import { Progress } from "@/components/ui/progress";

export default function ProgressCard({ title, current, goal, unit, reverse = false }) {
    const percentage = reverse
      ? ((goal - current) / (goal - Math.min(current, goal))) * 100
      : (current / goal) * 100;
  
    return (
      <div className="h-fit border p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <div className="text-3xl font-bold mb-2">
          {current.toFixed(1)} <span className="text-sm font-normal">/ {goal} {unit}</span>
        </div>
        <Progress value={percentage} className="h-2" />
      </div>
    );
  }