import { useState } from "react";
import { 
  BookOpen, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Terminal, 
  Network, 
  ShieldAlert, 
  Bug, 
  KeyRound, 
  AlertTriangle, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  ShieldCheck, 
  Lightbulb, 
  Check
} from "lucide-react";
import { LESSONS_DATA } from "../data/lessonsData.js";
import { useUserProgress } from "../context/UserProgressContext.jsx";
import Badge from "../components/common/Badge.jsx";
import ProgressBar from "../components/common/ProgressBar.jsx";

const ICON_MAP = {
  Terminal: Terminal,
  Network: Network,
  Fish: AlertTriangle,
  Bug: Bug,
  KeyRound: KeyRound,
  ShieldAlert: ShieldAlert
};

export default function LearningHub() {
  const { progress, toggleLessonComplete, completedLessonsCount, totalLessons, lessonsPercentage } = useUserProgress();

  const [activeLessonId, setActiveLessonId] = useState(null);
  const [filterCategory, setFilterCategory] = useState("All");

  const categories = ["All", "Fundamentals", "Infrastructure", "Human Defense", "Software Safety", "Identity Defense", "Privacy Defense"];

  const filteredLessons = filterCategory === "All" 
    ? LESSONS_DATA 
    : LESSONS_DATA.filter(l => l.category === filterCategory);

  const activeLesson = LESSONS_DATA.find(l => l.id === activeLessonId);
  const activeLessonIndex = LESSONS_DATA.findIndex(l => l.id === activeLessonId);

  const handleNextLesson = () => {
    if (activeLessonIndex < LESSONS_DATA.length - 1) {
      setActiveLessonId(LESSONS_DATA[activeLessonIndex + 1].id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevLesson = () => {
    if (activeLessonIndex > 0) {
      setActiveLessonId(LESSONS_DATA[activeLessonIndex - 1].id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="page-container">
      {/* If No Lesson is Active, show the Lesson Catalog */}
      {!activeLesson ? (
        <>
          {/* Header */}
          <div style={{ marginBottom: "28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
              <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "rgba(139, 92, 246, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--neon-purple)" }}>
                <BookOpen size={22} />
              </div>
              <div>
                <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#fff" }}>
                  Cybersecurity Learning Hub
                </h1>
                <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                  Bite-sized, jargon-free lessons designed to turn students and beginners into confident digital guardians.
                </p>
              </div>
            </div>
          </div>

          {/* Overall Progress Banner */}
          <div className="glass-panel" style={{ padding: "24px 28px", marginBottom: "32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "20px" }}>
            <div style={{ flex: 1, minWidth: "240px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                <Sparkles size={18} color="var(--neon-purple)" />
                <span style={{ fontSize: "0.85rem", textTransform: "uppercase", fontWeight: 700, color: "var(--neon-purple)", letterSpacing: "0.5px" }}>
                  Your Curriculum Progress
                </span>
              </div>
              <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "#fff", marginBottom: "8px" }}>
                {completedLessonsCount} of {totalLessons} Modules Completed ({lessonsPercentage}%)
              </div>
              <ProgressBar progress={lessonsPercentage} variant="purple" height={8} />
            </div>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <Badge variant={lessonsPercentage === 100 ? "emerald" : "purple"}>
                {lessonsPercentage === 100 ? "All Lessons Mastered!" : `${totalLessons - completedLessonsCount} Remaining`}
              </Badge>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "10px", marginBottom: "24px" }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={filterCategory === cat ? "btn-cyber-secondary" : "btn-cyber-outline"}
                style={{ padding: "6px 14px", fontSize: "0.82rem", borderRadius: "var(--radius-full)", whiteSpace: "nowrap" }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Lessons Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "24px" }}>
            {filteredLessons.map((lesson) => {
              const Icon = ICON_MAP[lesson.iconName] || BookOpen;
              const isCompleted = progress.completedLessons.includes(lesson.id);

              return (
                <div 
                  key={lesson.id}
                  className="glass-panel"
                  style={{ 
                    padding: "26px", 
                    display: "flex", 
                    flexDirection: "column", 
                    justifyContent: "space-between",
                    transition: "all 0.25s ease",
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden"
                  }}
                  onClick={() => {
                    setActiveLessonId(lesson.id);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  {/* Top Bar with Icon & Badges */}
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                      <div style={{ 
                        width: "50px", 
                        height: "50px", 
                        borderRadius: "var(--radius-md)", 
                        background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(6, 182, 212, 0.2))", 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center",
                        color: "var(--neon-cyan)"
                      }}>
                        <Icon size={24} />
                      </div>

                      <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                        <span style={{ fontSize: "0.75rem", color: "var(--text-dim)", display: "flex", alignItems: "center", gap: "4px" }}>
                          <Clock size={12} /> {lesson.readTime}
                        </span>
                        {isCompleted ? (
                          <Badge variant="emerald">Completed</Badge>
                        ) : (
                          <Badge variant="blue">{lesson.category}</Badge>
                        )}
                      </div>
                    </div>

                    <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#fff", marginBottom: "8px" }}>
                      {lesson.title}
                    </h3>

                    <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.55, marginBottom: "20px" }}>
                      {lesson.summary}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div style={{ 
                    paddingTop: "16px", 
                    borderTop: "1px solid var(--border-subtle)", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "space-between" 
                  }}>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLessonComplete(lesson.id);
                      }}
                      style={{ 
                        background: "transparent", 
                        border: "none", 
                        cursor: "pointer", 
                        display: "flex", 
                        alignItems: "center", 
                        gap: "8px", 
                        color: isCompleted ? "var(--neon-emerald)" : "var(--text-dim)",
                        fontSize: "0.82rem",
                        fontWeight: 600
                      }}
                    >
                      {isCompleted ? (
                        <>
                          <CheckCircle2 size={16} /> Completed
                        </>
                      ) : (
                        <>
                          <Circle size={16} /> Mark as Done
                        </>
                      )}
                    </button>

                    <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--neon-cyan)", fontSize: "0.85rem", fontWeight: 600 }}>
                      <span>Read Lesson</span>
                      <ArrowRight size={15} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        /* DETAILED LESSON READER VIEW */
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          
          {/* Top navigation row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <button 
              className="btn-cyber-outline"
              onClick={() => setActiveLessonId(null)}
              style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem" }}
            >
              <ArrowLeft size={16} />
              <span>Back to All Lessons</span>
            </button>

            <button 
              className={progress.completedLessons.includes(activeLesson.id) ? "btn-cyber-primary" : "btn-cyber-secondary"}
              onClick={() => toggleLessonComplete(activeLesson.id)}
              style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem" }}
            >
              {progress.completedLessons.includes(activeLesson.id) ? (
                <>
                  <Check size={16} /> Completed! Click to Undo
                </>
              ) : (
                <>
                  <CheckCircle2 size={16} /> Mark Lesson as Completed
                </>
              )}
            </button>
          </div>

          {/* Main Lesson Content Card */}
          <article className="glass-panel" style={{ padding: "40px", marginBottom: "32px" }}>
            
            {/* Lesson Title & Header Metadata */}
            <div style={{ borderBottom: "1px solid var(--border-subtle)", paddingBottom: "24px", marginBottom: "28px" }}>
              <div style={{ display: "flex", gap: "8px", marginBottom: "12px", alignItems: "center" }}>
                <Badge variant="purple">{activeLesson.category}</Badge>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px" }}>
                  <Clock size={14} /> {activeLesson.readTime}
                </span>
                {progress.completedLessons.includes(activeLesson.id) && (
                  <Badge variant="emerald">Completed</Badge>
                )}
              </div>

              <h1 style={{ fontSize: "2.3rem", fontWeight: 800, color: "#fff", lineHeight: 1.25, marginBottom: "12px" }}>
                {activeLesson.title}
              </h1>

              <p style={{ fontSize: "1.05rem", color: "var(--neon-cyan)", lineHeight: 1.5 }}>
                {activeLesson.summary}
              </p>
            </div>

            {/* 1. Definition Callout Box */}
            <div style={{ 
              background: "rgba(6, 182, 212, 0.08)", 
              borderLeft: "4px solid var(--neon-cyan)", 
              padding: "20px 24px", 
              borderRadius: "0 var(--radius-md) var(--radius-md) 0",
              marginBottom: "30px"
            }}>
              <div style={{ fontSize: "0.8rem", textTransform: "uppercase", color: "var(--neon-cyan)", fontWeight: 700, letterSpacing: "1px", marginBottom: "6px" }}>
                Core Definition
              </div>
              <p style={{ fontSize: "1rem", color: "#fff", lineHeight: 1.6, fontWeight: 500 }}>
                {activeLesson.definition}
              </p>
            </div>

            {/* 2. Simple Explanation / Analogy */}
            <section style={{ marginBottom: "36px" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#fff", marginBottom: "12px", display: "flex", alignItems: "center", gap: "10px" }}>
                <Lightbulb size={20} color="var(--neon-amber)" />
                Understanding the Concept
              </h2>
              <p style={{ fontSize: "1rem", color: "var(--text-bright)", lineHeight: 1.7 }}>
                {activeLesson.explanation}
              </p>
            </section>

            {/* 3. Hacker Types / Conceptual Roles */}
            {activeLesson.hackerTypes && (
              <section style={{ marginBottom: "36px" }}>
                <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#fff", marginBottom: "16px" }}>
                  Key Categories & Terminology
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
                  {activeLesson.hackerTypes.map((item, idx) => (
                    <div 
                      key={idx}
                      style={{ 
                        background: "rgba(255, 255, 255, 0.03)", 
                        border: "1px solid var(--border-subtle)", 
                        borderRadius: "var(--radius-md)", 
                        padding: "18px" 
                      }}
                    >
                      <Badge variant={item.color} className="mb-2">{item.name}</Badge>
                      <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.5, marginTop: "8px" }}>
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 4. Real-World Case Study */}
            {activeLesson.realWorldExample && (
              <section style={{ 
                background: "rgba(139, 92, 246, 0.08)", 
                border: "1px solid rgba(139, 92, 246, 0.25)", 
                borderRadius: "var(--radius-lg)", 
                padding: "24px", 
                marginBottom: "36px" 
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--neon-purple)", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>
                  <ShieldCheck size={18} /> Real-World Scenario
                </div>
                <p style={{ fontSize: "0.95rem", color: "var(--text-bright)", lineHeight: 1.6 }}>
                  {activeLesson.realWorldExample}
                </p>
              </section>
            )}

            {/* 5. Attack Vectors */}
            {activeLesson.attackVectors && (
              <section style={{ marginBottom: "36px" }}>
                <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#fff", marginBottom: "14px", display: "flex", alignItems: "center", gap: "10px" }}>
                  <AlertTriangle size={18} color="var(--neon-rose)" />
                  Common Attack Vectors & Techniques
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {activeLesson.attackVectors.map((vec, idx) => (
                    <div 
                      key={idx}
                      style={{ 
                        background: "rgba(255, 255, 255, 0.02)", 
                        borderLeft: "3px solid var(--neon-rose)", 
                        padding: "12px 16px", 
                        borderRadius: "0 var(--radius-sm) var(--radius-sm) 0",
                        color: "var(--text-bright)",
                        fontSize: "0.92rem"
                      }}
                    >
                      {vec}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 6. Essential Safety Tips */}
            {activeLesson.safetyTips && (
              <section style={{ marginBottom: "36px" }}>
                <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#fff", marginBottom: "14px", display: "flex", alignItems: "center", gap: "10px" }}>
                  <CheckCircle2 size={20} color="var(--neon-emerald)" />
                  Defense & Safety Tips for Beginners
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {activeLesson.safetyTips.map((tip, idx) => (
                    <div 
                      key={idx}
                      style={{ 
                        background: "rgba(16, 185, 129, 0.05)", 
                        border: "1px solid rgba(16, 185, 129, 0.2)", 
                        padding: "14px 18px", 
                        borderRadius: "var(--radius-md)",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "12px"
                      }}
                    >
                      <CheckCircle2 size={18} color="var(--neon-emerald)" style={{ flexShrink: 0, marginTop: "2px" }} />
                      <span style={{ fontSize: "0.92rem", color: "var(--text-bright)", lineHeight: 1.5 }}>
                        {tip}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 7. Key Takeaways */}
            {activeLesson.keyTakeaways && (
              <section style={{ 
                background: "rgba(255, 255, 255, 0.02)", 
                border: "1px solid var(--border-subtle)", 
                borderRadius: "var(--radius-lg)", 
                padding: "24px" 
              }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff", marginBottom: "12px" }}>
                  Key Takeaways
                </h3>
                <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px", color: "var(--text-muted)", fontSize: "0.92rem", lineHeight: 1.6 }}>
                  {activeLesson.keyTakeaways.map((takeaway, idx) => (
                    <li key={idx}>{takeaway}</li>
                  ))}
                </ul>
              </section>
            )}
          </article>

          {/* Lesson Navigation Footer */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", flexWrap: "wrap", marginBottom: "40px" }}>
            <button 
              className="btn-cyber-outline"
              onClick={handlePrevLesson}
              disabled={activeLessonIndex === 0}
              style={{ opacity: activeLessonIndex === 0 ? 0.4 : 1, cursor: activeLessonIndex === 0 ? "not-allowed" : "pointer" }}
            >
              <ArrowLeft size={16} />
              <span>Previous Lesson</span>
            </button>

            <button 
              className={progress.completedLessons.includes(activeLesson.id) ? "btn-cyber-outline" : "btn-cyber-primary"}
              onClick={() => toggleLessonComplete(activeLesson.id)}
            >
              <CheckCircle2 size={16} />
              <span>{progress.completedLessons.includes(activeLesson.id) ? "Mark Incomplete" : "Mark as Completed"}</span>
            </button>

            <button 
              className="btn-cyber-secondary"
              onClick={handleNextLesson}
              disabled={activeLessonIndex === LESSONS_DATA.length - 1}
              style={{ opacity: activeLessonIndex === LESSONS_DATA.length - 1 ? 0.4 : 1, cursor: activeLessonIndex === LESSONS_DATA.length - 1 ? "not-allowed" : "pointer" }}
            >
              <span>Next Lesson</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
