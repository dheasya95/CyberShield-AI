import { useState, useMemo } from "react";
import confetti from "canvas-confetti";
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Award, 
  Flame, 
  ArrowRight, 
  History, 
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Filter
} from "lucide-react";
import { QUIZ_QUESTIONS } from "../data/quizQuestions.js";
import { useUserProgress } from "../context/UserProgressContext.jsx";
import Badge from "../components/common/Badge.jsx";
import ProgressBar from "../components/common/ProgressBar.jsx";

export default function Quiz() {
  const { progress, saveQuizAttempt } = useUserProgress();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answersState, setAnswersState] = useState({}); // { [index]: { selected, isCorrect } }
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [expandedReviews, setExpandedReviews] = useState({});
  const [showHistory, setShowHistory] = useState(false);

  // Available categories
  const categories = useMemo(() => {
    const cats = new Set(QUIZ_QUESTIONS.map(q => q.category));
    return ["All", ...Array.from(cats)];
  }, []);

  // Filtered questions based on category
  const activeQuestions = useMemo(() => {
    if (selectedCategory === "All") return QUIZ_QUESTIONS;
    return QUIZ_QUESTIONS.filter(q => q.category === selectedCategory);
  }, [selectedCategory]);

  const currentQuestion = activeQuestions[currentIndex];
  const totalQuestions = activeQuestions.length;
  const progressPercent = Math.round(((currentIndex + (selectedAnswer !== null ? 1 : 0)) / totalQuestions) * 100);

  const handleSelectOption = (optionIndex) => {
    if (selectedAnswer !== null) return; // Already answered this question

    setSelectedAnswer(optionIndex);
    const isCorrect = optionIndex === currentQuestion.correctIndex;

    const newScore = isCorrect ? score + 1 : score;
    const newStreak = isCorrect ? streak + 1 : 0;
    const newMaxStreak = Math.max(maxStreak, newStreak);

    setScore(newScore);
    setStreak(newStreak);
    setMaxStreak(newMaxStreak);

    setAnswersState(prev => ({
      ...prev,
      [currentIndex]: {
        questionId: currentQuestion.id,
        selected: optionIndex,
        isCorrect,
        correctIndex: currentQuestion.correctIndex
      }
    }));
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setIsFinished(true);
    const finalScore = score + (selectedAnswer === currentQuestion.correctIndex && !answersState[currentIndex] ? 1 : 0);
    const percentage = Math.round((finalScore / totalQuestions) * 100);

    // Save locally to context
    saveQuizAttempt({
      score: finalScore,
      total: totalQuestions,
      percentage,
      category: selectedCategory,
      streak: maxStreak
    });

    // Fire celebration confetti if score is high
    if (percentage >= 70) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Fallback gracefully
      }
    }
  };

  const handleRestart = (category = selectedCategory) => {
    setSelectedCategory(category);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setAnswersState({});
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setIsFinished(false);
    setExpandedReviews({});
  };

  const toggleReviewExpand = (idx) => {
    setExpandedReviews(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  // Performance Evaluation
  const percentage = Math.round((score / totalQuestions) * 100);
  let resultTier = {
    title: "Needs More Training",
    badge: "Cyber Recruit",
    color: "rose",
    feedback: "Review the question explanations below and explore our Learning Hub to harden your cyber defenses!"
  };

  if (percentage >= 90) {
    resultTier = {
      title: "Master of Cyber Defense!",
      badge: "Cyber Shield Master",
      color: "emerald",
      feedback: "Outstanding score! You possess top-tier cyber awareness and can spot sophisticated threats with ease."
    };
  } else if (percentage >= 75) {
    resultTier = {
      title: "Strong Security Guardian",
      badge: "Security Sentinel",
      color: "cyan",
      feedback: "Great job! You have solid foundational knowledge. Brush up on a few edge-cases to reach perfection."
    };
  } else if (percentage >= 50) {
    resultTier = {
      title: "Promising Defender",
      badge: "Security Defender",
      color: "amber",
      feedback: "Good attempt! You understand the essentials, but some deceptive tactics still tricked you."
    };
  }

  return (
    <div className="page-container">
      {/* Header & Subtitle */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "26px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
            <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "rgba(6, 182, 212, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--neon-cyan)" }}>
              <HelpCircle size={22} />
            </div>
            <div>
              <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#fff" }}>
                Cybersecurity Knowledge Quiz
              </h1>
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                Test your instincts on real-world scams, password security, Wi-Fi safety, and social engineering.
              </p>
            </div>
          </div>
        </div>

        {/* History Toggle Button */}
        <button 
          className="btn-cyber-outline"
          onClick={() => setShowHistory(!showHistory)}
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <History size={16} />
          <span>{showHistory ? "Hide Attempt History" : "Past Quiz History"}</span>
          {progress.quizHistory.length > 0 && (
            <Badge variant="purple" style={{ marginLeft: "4px" }}>{progress.quizHistory.length}</Badge>
          )}
        </button>
      </div>

      {/* Past History Dropdown Modal/Card */}
      {showHistory && (
        <div className="glass-panel" style={{ padding: "24px", marginBottom: "30px", borderColor: "rgba(139, 92, 246, 0.3)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", gap: "8px" }}>
              <History size={18} color="var(--neon-purple)" />
              Saved Quiz Attempts ({progress.quizHistory.length})
            </h3>
            <span style={{ fontSize: "0.8rem", color: "var(--text-dim)" }}>Locally saved in your browser</span>
          </div>

          {progress.quizHistory.length === 0 ? (
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>No attempts recorded yet. Complete a quiz to see your progress history here!</p>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "14px" }}>
              {progress.quizHistory.map((hist, idx) => (
                <div 
                  key={hist.id || idx}
                  style={{ 
                    background: "rgba(255, 255, 255, 0.03)", 
                    border: "1px solid var(--border-subtle)", 
                    borderRadius: "var(--radius-md)", 
                    padding: "14px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, color: "#fff", fontSize: "0.95rem" }}>
                      {hist.category || "All Topics"}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-dim)", marginTop: "2px" }}>
                      {new Date(hist.date).toLocaleDateString()} at {new Date(hist.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ 
                      fontSize: "1.2rem", 
                      fontWeight: 800, 
                      color: hist.percentage >= 80 ? "var(--neon-emerald)" : hist.percentage >= 60 ? "var(--neon-cyan)" : "var(--neon-rose)" 
                    }}>
                      {hist.percentage}%
                    </div>
                    <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                      {hist.score}/{hist.total} Correct
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Category Selection Tabs (Only before finishing) */}
      {!isFinished && (
        <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "12px", marginBottom: "24px" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.82rem", color: "var(--text-dim)", marginRight: "8px" }}>
            <Filter size={14} /> Topic:
          </span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => handleRestart(cat)}
              className={selectedCategory === cat ? "btn-cyber-primary" : "btn-cyber-outline"}
              style={{ 
                padding: "6px 14px", 
                fontSize: "0.82rem", 
                borderRadius: "var(--radius-full)",
                whiteSpace: "nowrap"
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* QUIZ ACTIVE SCREEN */}
      {!isFinished ? (
        <div className="glass-panel" style={{ padding: "32px", position: "relative" }}>
          
          {/* Top Bar: Progress & Streaks */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Badge variant="cyan">{currentQuestion.category}</Badge>
              <Badge variant="purple">{currentQuestion.difficulty}</Badge>
              <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                Question <strong>{currentIndex + 1}</strong> of <strong>{totalQuestions}</strong>
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              {streak >= 2 && (
                <div style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "6px", 
                  background: "rgba(245, 158, 11, 0.15)", 
                  border: "1px solid rgba(245, 158, 11, 0.4)", 
                  padding: "4px 12px", 
                  borderRadius: "var(--radius-full)",
                  color: "var(--neon-amber)",
                  fontSize: "0.82rem",
                  fontWeight: 700
                }}>
                  <Flame size={16} fill="var(--neon-amber)" />
                  <span>{streak} Streak!</span>
                </div>
              )}

              <div style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
                Score: <strong style={{ color: "var(--neon-cyan)" }}>{score}</strong>/{currentIndex + (selectedAnswer !== null ? 1 : 0)}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <ProgressBar progress={progressPercent} variant="cyber" height={6} className="mb-6" />

          {/* Question Text */}
          <div style={{ margin: "24px 0" }}>
            <h2 style={{ fontSize: "1.28rem", fontWeight: 700, color: "#ffffff", lineHeight: 1.5 }}>
              {currentQuestion.question}
            </h2>
          </div>

          {/* Options Grid */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "28px" }}>
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedAnswer === idx;
              const isCorrectOption = idx === currentQuestion.correctIndex;
              
              let optionStyle = {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 20px",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-subtle)",
                background: "rgba(255, 255, 255, 0.03)",
                color: "var(--text-bright)",
                cursor: selectedAnswer === null ? "pointer" : "default",
                fontSize: "0.95rem",
                textAlign: "left",
                transition: "all 0.2s ease"
              };

              if (selectedAnswer !== null) {
                if (isCorrectOption) {
                  optionStyle.borderColor = "var(--neon-emerald)";
                  optionStyle.background = "rgba(16, 185, 129, 0.15)";
                  optionStyle.color = "#a7f3d0";
                  optionStyle.boxShadow = "0 0 15px rgba(16, 185, 129, 0.2)";
                } else if (isSelected && !isCorrectOption) {
                  optionStyle.borderColor = "var(--neon-rose)";
                  optionStyle.background = "rgba(244, 63, 94, 0.15)";
                  optionStyle.color = "#fecdd3";
                } else {
                  optionStyle.opacity = 0.5;
                }
              }

              return (
                <button
                  key={idx}
                  style={optionStyle}
                  onClick={() => handleSelectOption(idx)}
                  disabled={selectedAnswer !== null}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <span style={{ 
                      width: "28px", 
                      height: "28px", 
                      borderRadius: "50%", 
                      border: "1px solid rgba(255,255,255,0.2)", 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center", 
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      flexShrink: 0
                    }}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>

                  {selectedAnswer !== null && (
                    <div>
                      {isCorrectOption ? (
                        <CheckCircle2 size={20} color="var(--neon-emerald)" />
                      ) : isSelected ? (
                        <XCircle size={20} color="var(--neon-rose)" />
                      ) : null}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box (Visible immediately after selecting an answer) */}
          {selectedAnswer !== null && (
            <div 
              style={{ 
                background: selectedAnswer === currentQuestion.correctIndex ? "rgba(16, 185, 129, 0.08)" : "rgba(244, 63, 94, 0.08)",
                border: `1px solid ${selectedAnswer === currentQuestion.correctIndex ? "rgba(16, 185, 129, 0.3)" : "rgba(244, 63, 94, 0.3)"}`,
                borderRadius: "var(--radius-md)",
                padding: "20px",
                marginBottom: "24px",
                animation: "toast-in 0.3s ease"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", fontWeight: 700, color: selectedAnswer === currentQuestion.correctIndex ? "var(--neon-emerald)" : "var(--neon-rose)" }}>
                {selectedAnswer === currentQuestion.correctIndex ? (
                  <>
                    <CheckCircle2 size={18} /> Correct! Well Done.
                  </>
                ) : (
                  <>
                    <XCircle size={18} /> Incorrect! Don't worry, let's learn why.
                  </>
                )}
              </div>
              <p style={{ fontSize: "0.92rem", color: "var(--text-bright)", lineHeight: 1.6 }}>
                {currentQuestion.explanation}
              </p>
            </div>
          )}

          {/* Action Row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <button 
              className="btn-cyber-outline"
              onClick={() => handleRestart(selectedCategory)}
              style={{ fontSize: "0.85rem" }}
            >
              <RotateCcw size={15} /> Restart Quiz
            </button>

            {selectedAnswer !== null && (
              <button 
                className="btn-cyber-primary"
                onClick={handleNextQuestion}
                style={{ padding: "12px 28px", fontWeight: 700 }}
              >
                <span>{currentIndex + 1 < totalQuestions ? "Next Question" : "View Final Results"}</span>
                <ArrowRight size={18} />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* FINAL RESULTS SCREEN */
        <div className="glass-panel" style={{ padding: "40px" }}>
          <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 36px" }}>
            <div style={{ 
              width: "80px", 
              height: "80px", 
              borderRadius: "50%", 
              background: `var(--shadow-${resultTier.color})`, 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              margin: "0 auto 18px",
              color: "#fff",
              border: `2px solid var(--neon-${resultTier.color})`
            }}>
              <Award size={40} color={`var(--neon-${resultTier.color})`} />
            </div>

            <Badge variant={resultTier.color} className="mb-2">{resultTier.badge}</Badge>

            <h2 style={{ fontSize: "2.1rem", fontWeight: 800, color: "#fff", margin: "12px 0 8px" }}>
              {resultTier.title}
            </h2>

            <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.6, marginBottom: "24px" }}>
              {resultTier.feedback}
            </p>

            {/* Score Showcase */}
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "1fr 1fr 1fr", 
              gap: "16px", 
              background: "rgba(255, 255, 255, 0.03)", 
              border: "1px solid var(--border-subtle)", 
              borderRadius: "var(--radius-lg)", 
              padding: "20px" 
            }}>
              <div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-dim)", textTransform: "uppercase" }}>Final Score</div>
                <div style={{ fontSize: "1.7rem", fontWeight: 800, color: "#fff" }}>{score}/{totalQuestions}</div>
              </div>
              <div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-dim)", textTransform: "uppercase" }}>Percentage</div>
                <div style={{ fontSize: "1.7rem", fontWeight: 800, color: `var(--neon-${resultTier.color})` }}>{percentage}%</div>
              </div>
              <div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-dim)", textTransform: "uppercase" }}>Best Streak</div>
                <div style={{ fontSize: "1.7rem", fontWeight: 800, color: "var(--neon-amber)", display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
                  <Flame size={20} fill="var(--neon-amber)" /> {maxStreak}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginTop: "28px", flexWrap: "wrap" }}>
              <button 
                className="btn-cyber-primary"
                onClick={() => handleRestart(selectedCategory)}
              >
                <RotateCcw size={18} />
                <span>Try Again</span>
              </button>
              <button 
                className="btn-cyber-secondary"
                onClick={() => handleRestart("All")}
              >
                <span>Take Full 18-Question Quiz</span>
              </button>
            </div>
          </div>

          {/* Question Review Section */}
          <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "32px" }}>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#fff", marginBottom: "18px", display: "flex", alignItems: "center", gap: "10px" }}>
              <ShieldCheck size={22} color="var(--neon-cyan)" />
              Complete Question Review & Insights
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {activeQuestions.map((q, idx) => {
                const ans = answersState[idx];
                const isCorrect = ans ? ans.isCorrect : false;
                const isExpanded = !!expandedReviews[idx];

                return (
                  <div 
                    key={q.id}
                    style={{ 
                      background: "rgba(255, 255, 255, 0.02)", 
                      border: `1px solid ${isCorrect ? "rgba(16, 185, 129, 0.2)" : "rgba(244, 63, 94, 0.2)"}`, 
                      borderRadius: "var(--radius-md)", 
                      overflow: "hidden" 
                    }}
                  >
                    <div 
                      onClick={() => toggleReviewExpand(idx)}
                      style={{ 
                        padding: "16px 20px", 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "space-between", 
                        cursor: "pointer",
                        background: "rgba(255, 255, 255, 0.01)"
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        {isCorrect ? (
                          <CheckCircle2 size={20} color="var(--neon-emerald)" style={{ flexShrink: 0 }} />
                        ) : (
                          <XCircle size={20} color="var(--neon-rose)" style={{ flexShrink: 0 }} />
                        )}
                        <div>
                          <div style={{ fontSize: "0.92rem", fontWeight: 600, color: "#fff" }}>
                            {idx + 1}. {q.question.substring(0, 80)}...
                          </div>
                          <span style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}>
                            Category: {q.category}
                          </span>
                        </div>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--text-muted)" }}>
                        <span style={{ fontSize: "0.8rem" }}>{isExpanded ? "Hide" : "Details"}</span>
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </div>
                    </div>

                    {isExpanded && (
                      <div style={{ padding: "0 20px 20px 20px", borderTop: "1px solid var(--border-subtle)", marginTop: "8px" }}>
                        <div style={{ margin: "14px 0 10px", fontSize: "0.95rem", color: "#fff", fontWeight: 600 }}>
                          {q.question}
                        </div>

                        <div style={{ display: "grid", gap: "6px", marginBottom: "14px", fontSize: "0.88rem" }}>
                          <div style={{ color: "var(--neon-emerald)", padding: "6px 10px", background: "rgba(16, 185, 129, 0.1)", borderRadius: "6px" }}>
                            <strong>Correct Answer:</strong> {q.options[q.correctIndex]}
                          </div>
                          {!isCorrect && ans && (
                            <div style={{ color: "var(--neon-rose)", padding: "6px 10px", background: "rgba(244, 63, 94, 0.1)", borderRadius: "6px" }}>
                              <strong>Your Selection:</strong> {q.options[ans.selected]}
                            </div>
                          )}
                        </div>

                        <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.5, background: "rgba(255, 255, 255, 0.02)", padding: "12px", borderRadius: "8px" }}>
                          <strong style={{ color: "var(--neon-cyan)" }}>Why: </strong>
                          {q.explanation}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
