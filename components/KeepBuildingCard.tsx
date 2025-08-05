import { motion } from "motion/react";
import { Rocket, Flame, Target, Calendar, X } from "lucide-react";
import { Button } from "./ui/button";

interface KeepBuildingCardProps {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
  streakGoal: 'part-time' | 'full-time' | 'crazy-mode';
  onClose?: () => void;
}

const streakGoalDays = {
  'part-time': 3,
  'full-time': 5,
  'crazy-mode': 7
};

const goalLabels = {
  'part-time': 'Part-time',
  'full-time': 'Full-time', 
  'crazy-mode': 'Crazy Mode'
};

export function KeepBuildingCard({ 
  currentStreak, 
  longestStreak, 
  lastActiveDate, 
  streakGoal,
  onClose
}: KeepBuildingCardProps) {
  const isActiveToday = () => {
    const today = new Date().toDateString();
    const lastActive = new Date(lastActiveDate).toDateString();
    return today === lastActive;
  };

  const getWeekProgress = () => {
    const goalDays = streakGoalDays[streakGoal];
    const weekProgress = Math.min(currentStreak % 7, goalDays);
    return { current: weekProgress, target: goalDays };
  };

  const weekProgress = getWeekProgress();
  const progressPercentage = (weekProgress.current / weekProgress.target) * 100;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-6"
    >
      {/* Close Button */}
      {onClose && (
        <motion.div
          className="absolute top-4 right-4 z-20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 text-white/80 hover:text-white hover:bg-white/10 rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        </motion.div>
      )}

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div 
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"
        />
        <motion.div 
          animate={{ 
            x: [0, -80, 0],
            y: [0, 60, 0],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-10 left-10 w-24 h-24 bg-white/5 rounded-full blur-lg"
        />
      </div>

      <div className="relative z-10">
        {/* Compact Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <motion.div 
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-lg"
            >
              <Rocket className="h-5 w-5 text-white" />
            </motion.div>
            <div>
              <h2 className="text-xl font-medium text-white">Keep Building</h2>
              <p className="text-white/80 text-sm">
                {isActiveToday() ? "🔥 On fire today!" : "Ready to code?"}
              </p>
            </div>
          </div>
        </div>

        {/* Streamlined Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* Current Streak */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-2">
              <Flame className={`h-4 w-4 ${isActiveToday() ? 'text-orange-400' : 'text-white/60'}`} />
            </div>
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", bounce: 0.4 }}
              className="text-2xl font-semibold text-white mb-1"
            >
              {currentStreak}
            </motion.div>
            <div className="text-white/70 text-xs">Current</div>
          </div>

          {/* Best Streak */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-2">
              <Target className="h-4 w-4 text-yellow-400" />
            </div>
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", bounce: 0.4 }}
              className="text-2xl font-semibold text-white mb-1"
            >
              {longestStreak}
            </motion.div>
            <div className="text-white/70 text-xs">Best</div>
          </div>

          {/* Weekly Goal */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-2">
              <Calendar className="h-4 w-4 text-blue-300" />
            </div>
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring", bounce: 0.4 }}
              className="text-2xl font-semibold text-white mb-1"
            >
              {weekProgress.current}/{weekProgress.target}
            </motion.div>
            <div className="text-white/70 text-xs">This week</div>
          </div>
        </div>

        {/* Compact Progress Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-white/90 text-sm font-medium">
              Weekly Goal ({goalLabels[streakGoal]})
            </span>
            <span className="text-white/70 text-xs">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          
          <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ delay: 0.7, duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-white to-white/90 rounded-full"
            />
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-white/80 text-xs text-center mt-3"
          >
            {weekProgress.current >= weekProgress.target 
              ? "🎉 Weekly goal achieved!" 
              : `${weekProgress.target - weekProgress.current} more day${weekProgress.target - weekProgress.current !== 1 ? 's' : ''} to go`
            }
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
}