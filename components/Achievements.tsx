import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Trophy, Target, Flame, Code, Calendar, Star } from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  unlockedDate?: string;
  progress?: number;
  target?: number;
}

interface AchievementsProps {
  currentStreak: number;
  longestStreak: number;
  completedProjects: number;
  totalProjects: number;
}

export function Achievements({
  currentStreak,
  longestStreak,
  completedProjects,
  totalProjects,
}: AchievementsProps) {
  const achievements: Achievement[] = [
    {
      id: "1",
      title: "First Steps",
      description: "Create your first project",
      icon: <Star className="h-5 w-5" />,
      unlocked: totalProjects > 0,
      unlockedDate: totalProjects > 0 ? "2024-01-15" : undefined,
    },
    {
      id: "2",
      title: "Getting Started",
      description: "Maintain a 3-day streak",
      icon: <Flame className="h-5 w-5" />,
      unlocked: longestStreak >= 3,
      unlockedDate: longestStreak >= 3 ? "2024-01-18" : undefined,
      progress: Math.min(currentStreak, 3),
      target: 3,
    },
    {
      id: "3",
      title: "Momentum Builder",
      description: "Maintain a 7-day streak",
      icon: <Flame className="h-5 w-5" />,
      unlocked: longestStreak >= 7,
      unlockedDate: longestStreak >= 7 ? "2024-01-22" : undefined,
      progress: Math.min(Math.max(currentStreak, longestStreak), 7),
      target: 7,
    },
    {
      id: "4",
      title: "Streak Master",
      description: "Maintain a 30-day streak",
      icon: <Trophy className="h-5 w-5" />,
      unlocked: longestStreak >= 30,
      progress: Math.min(Math.max(currentStreak, longestStreak), 30),
      target: 30,
    },
    {
      id: "5",
      title: "Project Finisher",
      description: "Complete your first project",
      icon: <Target className="h-5 w-5" />,
      unlocked: completedProjects > 0,
      unlockedDate: completedProjects > 0 ? "2023-12-01" : undefined,
    },
    {
      id: "6",
      title: "Multi-tasker",
      description: "Have 3 active projects",
      icon: <Code className="h-5 w-5" />,
      unlocked: false,
      progress: 2,
      target: 3,
    },
    {
      id: "7",
      title: "Consistent Coder",
      description: "Complete 5 projects",
      icon: <Trophy className="h-5 w-5" />,
      unlocked: completedProjects >= 5,
      progress: completedProjects,
      target: 5,
    },
  ];

  const unlockedAchievements = achievements.filter((a) => a.unlocked);
  const lockedAchievements = achievements.filter((a) => !a.unlocked);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Trophy className="h-6 w-6" />
        <h1 className="text-2xl font-semibold">Achievements</h1>
        <Badge variant="secondary" className="ml-auto">
          {unlockedAchievements.length}/{achievements.length}
        </Badge>
      </div>

      {/* Unlocked Achievements */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium text-foreground">Unlocked</h2>
        {unlockedAchievements.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No achievements unlocked yet</p>
              <p className="text-sm">
                Keep working on your projects to earn your first achievement!
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-3">
            {unlockedAchievements.map((achievement) => (
              <Card
                key={achievement.id}
                className="border-green-200 bg-green-50/200 dark:border-green-800 dark:bg-green-950/20"
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-green-300/40 dark:bg-green-900 rounded-lg text-green-300 dark:text-green-200">
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{achievement.title}</h3>
                        <Badge
                          variant="secondary"
                          className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        >
                          Unlocked
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {achievement.description}
                      </p>
                      {achievement.unlockedDate && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>
                            Unlocked{" "}
                            {new Date(
                              achievement.unlockedDate
                            ).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Locked Achievements */}
      {lockedAchievements.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-foreground">Locked</h2>
          <div className="grid gap-3">
            {lockedAchievements.map((achievement) => (
              <Card key={achievement.id} className="opacity-60">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-muted rounded-lg text-muted-foreground">
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{achievement.title}</h3>
                        <Badge variant="outline" className="text-xs">
                          Locked
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {achievement.description}
                      </p>
                      {achievement.progress !== undefined &&
                        achievement.target && (
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>Progress</span>
                              <span>
                                {achievement.progress}/{achievement.target}
                              </span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-1.5">
                              <div
                                className="bg-primary rounded-full h-1.5 transition-all duration-300"
                                style={{
                                  width: `${
                                    (achievement.progress /
                                      achievement.target) *
                                    100
                                  }%`,
                                }}
                              />
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
