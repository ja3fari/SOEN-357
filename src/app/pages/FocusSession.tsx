
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import { SoftReminder } from "../components/SoftReminder";
import { formatTime } from "../utils/storage";
import { Pause, Play, Square } from "lucide-react";


const FOCUS_DURATION = 25 * 60;
const REMINDER_INTERVAL = 5;

const encouragingMessages = [
  "Stay focused, you're doing great",
  "Keep up the excellent work",
  "You're making great progress",
  "Almost there, stay on track",
  "Your focus is impressive"
];


export function FocusSession() {
  const navigate = useNavigate();
  const location = useLocation();
  const { task, goal } =
  (location.state as { task?: string; goal?: string }) || {};
const currentTask = task || "Study Session";

  const [timeRemaining, setTimeRemaining] = useState(FOCUS_DURATION);
  const [isPaused, setIsPaused] = useState(false);
  const [interruptions, setInterruptions] = useState(0);
  const [showReminder, setShowReminder] = useState(false);
  const [reminderMessage, setReminderMessage] = useState("");

  const intervalRef = useRef<number | null>(null);
  const reminderTimeoutRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());


  useEffect(() => {
    if (!isPaused && timeRemaining > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, timeRemaining]);

  useEffect(() => {
    if (timeRemaining === 0) {
      handleEndSession();
    }
  }, [timeRemaining]);

  useEffect(() => {
    if (isPaused || timeRemaining <= 0 || showReminder) return;
  
    reminderTimeoutRef.current = window.setTimeout(() => {
      const randomMessage =
        encouragingMessages[
          Math.floor(Math.random() * encouragingMessages.length)
        ];
      setReminderMessage(randomMessage);
      setShowReminder(true);
    }, REMINDER_INTERVAL * 1000);
  
    return () => {
      if (reminderTimeoutRef.current) {
        clearTimeout(reminderTimeoutRef.current);
      }
    };
  }, [isPaused, showReminder]);

  const handlePauseResume = () => {
    if (!isPaused) {
      setInterruptions((prev) => prev + 1);
    }
    setIsPaused((prev) => !prev);
  };
  <p className="text-sm text-gray-500">Goal: {goal}</p>

  const handleEndSession = () => {
    const actualDuration = Math.floor((Date.now() - startTimeRef.current) / 1000);
    navigate("/summary", {
      state: {
        task,
        goal,
        duration: actualDuration,
        interruptions,
        totalTime: FOCUS_DURATION
      }
    });
  };

  const handleDismissReminder = () => {
    setShowReminder(false);
    setInterruptions((prev) => prev + 1);
  };

  const progress = ((FOCUS_DURATION - timeRemaining) / FOCUS_DURATION) * 100;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 px-6">
      {showReminder && (
        <SoftReminder message={reminderMessage} onDismiss={handleDismissReminder} />
      )}

      <div className="w-full max-w-2xl">
      <div className="mb-12 text-center">
  <p className="mb-2 text-sm text-gray-500">Currently studying</p>
  <h2 className="text-2xl text-gray-900">{currentTask}</h2>
  {goal && (
    <p className="mt-3 text-sm text-gray-600">
      Goal: <span className="text-gray-800">{goal}</span>
    </p>
  )}
</div>

        <div className="rounded-3xl border border-gray-100 bg-white p-12 shadow-xl">
          <div className="relative mx-auto mb-8 h-64 w-64">
            <svg className="h-full w-full -rotate-90 transform">
              <circle cx="128" cy="128" r="120" stroke="#E5E7EB" strokeWidth="8" fill="none" />
              <circle
                cx="128"
                cy="128"
                r="120"
                stroke="url(#gradient)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 120}`}
                strokeDashoffset={`${2 * Math.PI * 120 * (1 - progress / 100)}`}
                className="transition-all duration-1000"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
              </defs>
            </svg>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="mb-2 text-6xl font-light tracking-wider text-gray-900">
                  {formatTime(timeRemaining)}
                </div>
                <p className="text-sm text-gray-500">
                  {isPaused ? "Paused" : "Time remaining"}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-8 text-center">
            <p className="text-sm text-gray-600">
              {isPaused ? "Take a breath, resume when ready" : "You're doing great!"}
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={handlePauseResume}
              className="flex items-center gap-2 rounded-2xl bg-gray-100 px-8 py-3 text-gray-700 transition-all hover:bg-gray-200"
            >
              {isPaused ? (
                <>
                  <Play className="h-4 w-4" />
                  Resume
                </>
              ) : (
                <>
                  <Pause className="h-4 w-4" />
                  Pause
                </>
              )}
            </button>

            <button
              onClick={handleEndSession}
              className="flex items-center gap-2 rounded-2xl bg-red-50 px-8 py-3 text-red-600 transition-all hover:bg-red-100"
            >
              <Square className="h-4 w-4" />
              End Session
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">Interruptions: {interruptions}</p>
        </div>
      </div>
    </div>
  );
}