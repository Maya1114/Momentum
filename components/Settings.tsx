import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Button } from "./ui/button";
import { Settings as SettingsIcon, Target, Calendar } from "lucide-react";

interface SettingsProps {
  streakGoal: 'part-time' | 'full-time' | 'crazy-mode';
  onStreakGoalChange: (goal: 'part-time' | 'full-time' | 'crazy-mode') => void;
}

const streakGoalOptions = {
  'part-time': {
    label: 'Part-time',
    description: '3 days a week',
    days: 3,
    icon: '🎯'
  },
  'full-time': {
    label: 'Full-time', 
    description: '5 days a week',
    days: 5,
    icon: '💼'
  },
  'crazy-mode': {
    label: 'Crazy Mode',
    description: '7 days a week',
    days: 7,
    icon: '🚀'
  }
};

export function Settings({ streakGoal, onStreakGoalChange }: SettingsProps) {
  const [tempGoal, setTempGoal] = useState(streakGoal);

  const handleSave = () => {
    onStreakGoalChange(tempGoal);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <SettingsIcon className="h-6 w-6" />
        <h1 className="text-2xl font-semibold">Settings</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Streak Goal
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Set how many days per week you want to work on your projects
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup value={tempGoal} onValueChange={(value: any) => setTempGoal(value)}>
            {Object.entries(streakGoalOptions).map(([key, option]) => (
              <div key={key} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent/50 transition-colors">
                <RadioGroupItem value={key} id={key} />
                <div className="flex-1">
                  <Label htmlFor={key} className="flex items-center gap-3 cursor-pointer">
                    <span className="text-xl">{option.icon}</span>
                    <div>
                      <div className="font-medium">{option.label}</div>
                      <div className="text-sm text-muted-foreground">{option.description}</div>
                    </div>
                  </Label>
                </div>
                <div className="text-sm text-muted-foreground">
                  {option.days} days
                </div>
              </div>
            ))}
          </RadioGroup>

          {tempGoal !== streakGoal && (
            <Button onClick={handleSave} className="w-full">
              Save Changes
            </Button>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Current Goal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-accent/30 rounded-lg">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{streakGoalOptions[streakGoal].icon}</span>
              <div>
                <div className="font-medium">{streakGoalOptions[streakGoal].label}</div>
                <div className="text-sm text-muted-foreground">
                  {streakGoalOptions[streakGoal].description}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-medium">{streakGoalOptions[streakGoal].days}</div>
              <div className="text-xs text-muted-foreground">days/week</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}