import { Card, CardContent } from "./ui/card";
import { Flame, Calendar } from "lucide-react";

interface StreakCounterProps {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
}

export function StreakCounter({ currentStreak, longestStreak, lastActiveDate }: StreakCounterProps) {
  const isActiveToday = () => {
    const today = new Date().toDateString();
    const lastActive = new Date(lastActiveDate).toDateString();
    return today === lastActive;
  };

  return (
    <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${isActiveToday() ? 'bg-orange-500' : 'bg-gray-400'}`}>
              <Flame className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Current Streak</p>
              <p className="text-2xl font-bold text-foreground">{currentStreak}</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
              <Calendar className="h-3 w-3" />
              <span>Best: {longestStreak} days</span>
            </div>
            <p className="text-xs text-muted-foreground">
              {isActiveToday() ? 'Active today!' : 'Start coding to continue streak'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}