import { createContext, useContext, useState, useEffect } from "react";
import { CHECKLIST_ITEMS } from "../data/checklistData.js";
import { LESSONS_DATA } from "../data/lessonsData.js";

const UserProgressContext = createContext(null);

const STORAGE_KEY = "cybershield_user_progress_v1";

const DEFAULT_STATE = {
  userName: "Cyber Guardian",
  completedLessons: ["ethical-hacking"], // Pre-seed one for demo vitality
  checklistCompleted: {
    "check-passwords": true,
    "check-updates": true
  },
  quizHistory: [
    {
      id: "seed-quiz-1",
      date: new Date().toISOString(),
      score: 13,
      total: 15,
      percentage: 87,
      category: "All Topics"
    }
  ],
  bookmarkedTips: ["tip-pw-1", "tip-wf-2"],
  customApiKey: "",
  streakDays: 3
};

export function UserProgressProvider({ children }) {
  const [progress, setProgress] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...DEFAULT_STATE, ...JSON.parse(stored) };
      }
    } catch (e) {
      console.error("Failed to load progress from localStorage:", e);
    }
    return DEFAULT_STATE;
  });

  // Save to localStorage on state change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error("Failed to save progress to localStorage:", e);
    }
  }, [progress]);

  // Calculations
  const completedLessonsCount = progress.completedLessons.length;
  const totalLessons = LESSONS_DATA.length;
  const lessonsPercentage = Math.round((completedLessonsCount / totalLessons) * 100);

  const totalChecklistItems = CHECKLIST_ITEMS.length;
  const completedChecklistCount = Object.values(progress.checklistCompleted).filter(Boolean).length;
  const checklistPercentage = Math.round((completedChecklistCount / totalChecklistItems) * 100);

  const bestQuizScore = progress.quizHistory.length > 0
    ? Math.max(...progress.quizHistory.map(q => q.percentage))
    : 0;

  // Composite Security Score (0-100)
  // Checklist: 45% weight, Lessons: 30% weight, Quiz: 25% weight
  const securityScore = Math.min(
    100,
    Math.round(
      (checklistPercentage * 0.45) +
      (lessonsPercentage * 0.30) +
      (bestQuizScore * 0.25)
    )
  );

  // Security Shield Tier / Grade
  let shieldTier = {
    title: "Cyber Recruit",
    color: "rose",
    badge: "Level 1 - Vulnerable",
    description: "Complete your security checklist and take the quiz to harden your defenses!"
  };

  if (securityScore >= 85) {
    shieldTier = {
      title: "Cyber Shield Master",
      color: "emerald",
      badge: "Level 4 - Fortified",
      description: "Exceptional security posture! Your digital perimeter is hardened against modern cyber threats."
    };
  } else if (securityScore >= 65) {
    shieldTier = {
      title: "Shield Sentinel",
      color: "cyan",
      badge: "Level 3 - Protected",
      description: "Strong security awareness! Keep practicing and finish remaining checklist items."
    };
  } else if (securityScore >= 40) {
    shieldTier = {
      title: "Security Defender",
      color: "amber",
      badge: "Level 2 - Guarded",
      description: "Good start! You have basic security measures enabled, but some vulnerabilities remain."
    };
  }

  // Action methods
  const toggleLessonComplete = (lessonId) => {
    setProgress(prev => {
      const exists = prev.completedLessons.includes(lessonId);
      const updated = exists
        ? prev.completedLessons.filter(id => id !== lessonId)
        : [...prev.completedLessons, lessonId];
      return { ...prev, completedLessons: updated };
    });
  };

  const toggleChecklistItem = (itemId) => {
    setProgress(prev => {
      const current = !!prev.checklistCompleted[itemId];
      return {
        ...prev,
        checklistCompleted: {
          ...prev.checklistCompleted,
          [itemId]: !current
        }
      };
    });
  };

  const saveQuizAttempt = (attempt) => {
    setProgress(prev => ({
      ...prev,
      quizHistory: [
        {
          id: "quiz-" + Date.now(),
          date: new Date().toISOString(),
          ...attempt
        },
        ...prev.quizHistory
      ].slice(0, 20) // Keep last 20
    }));
  };

  const toggleBookmarkTip = (tipId) => {
    setProgress(prev => {
      const exists = prev.bookmarkedTips.includes(tipId);
      const updated = exists
        ? prev.bookmarkedTips.filter(id => id !== tipId)
        : [...prev.bookmarkedTips, tipId];
      return { ...prev, bookmarkedTips: updated };
    });
  };

  const setCustomApiKey = (key) => {
    setProgress(prev => ({ ...prev, customApiKey: key }));
  };

  const setUserName = (name) => {
    setProgress(prev => ({ ...prev, userName: name }));
  };

  const resetAllProgress = () => {
    const fresh = {
      ...DEFAULT_STATE,
      completedLessons: [],
      checklistCompleted: {},
      quizHistory: [],
      bookmarkedTips: []
    };
    setProgress(fresh);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
    } catch {
      // Ignored
    }
  };

  return (
    <UserProgressContext.Provider
      value={{
        progress,
        securityScore,
        shieldTier,
        completedLessonsCount,
        totalLessons,
        lessonsPercentage,
        completedChecklistCount,
        totalChecklistItems,
        checklistPercentage,
        bestQuizScore,
        toggleLessonComplete,
        toggleChecklistItem,
        saveQuizAttempt,
        toggleBookmarkTip,
        setCustomApiKey,
        setUserName,
        resetAllProgress
      }}
    >
      {children}
    </UserProgressContext.Provider>
  );
}

export function useUserProgress() {
  const context = useContext(UserProgressContext);
  if (!context) {
    throw new Error("useUserProgress must be used within a UserProgressProvider");
  }
  return context;
}
