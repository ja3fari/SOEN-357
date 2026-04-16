
import { useNavigate, useLocation } from "react-router-dom";
import { saveSession, formatDuration } from "../utils/storage";
import { Session } from "../types";
import { Star, Clock, AlertCircle, CheckCircle2 } from "lucide-react";
import React, { useState } from "react";

interface LocationState {
  task: string;
  goal?: string;
  duration: number;
  interruptions: number;
  totalTime: number;
}

export function SessionSummary() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  const [focusRating, setFocusRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [goalResult, setGoalResult] = useState<string>("");

  if (!state) {
    navigate("/");
    return null;
  }

  const { task, goal,duration, interruptions, totalTime } = state;
  const completionPercentage = Math.round((duration / totalTime) * 100);

  const handleFinish = () => {
    const session: Session = {
      id: Date.now().toString(),
      task,
      goal,
      duration,
      interruptions,
      focusRating: focusRating || undefined,
      completedAt: new Date()
    };

    saveSession(session);
    navigate("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 px-6">
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="mb-2 text-4xl text-gray-900">Session Complete</h1>
          <p className="text-gray-600">Great work on your study session!</p>
        </div>

        <div className="mb-6 rounded-3xl border border-gray-100 bg-white p-10 shadow-xl">
        <div className="mb-8 border-b border-gray-100 pb-8 text-center">
  <p className="mb-1 text-sm text-gray-500">You studied</p>
  <h2 className="text-2xl text-gray-900">{task}</h2>
  {goal && <p className="mt-2 text-sm text-gray-600">Goal: {goal}</p>}
</div>

          <div className="mb-8 grid grid-cols-2 gap-6">
            <div className="rounded-2xl bg-blue-50 p-6 text-center">
              <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <p className="mb-1 text-sm text-gray-600">Time Spent</p>
              <p className="text-2xl text-gray-900">{formatDuration(duration)}</p>
              <p className="mt-1 text-xs text-gray-500">{completionPercentage}% of goal</p>
            </div>

            <div className="rounded-2xl bg-amber-50 p-6 text-center">
              <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                <AlertCircle className="h-6 w-6 text-amber-600" />
              </div>
              <p className="mb-1 text-sm text-gray-600">Interruptions</p>
              <p className="text-2xl text-gray-900">{interruptions}</p>
              <p className="mt-1 text-xs text-gray-500">
                {interruptions === 0
                  ? "Perfect focus!"
                  : interruptions <= 2
                  ? "Well done!"
                  : "Try to minimize next time"}
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 p-6">
            <p className="mb-4 text-center text-gray-700">
              How focused were you during this session?
            </p>
            <div className="flex justify-center gap-3">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setFocusRating(rating)}
                  onMouseEnter={() => setHoveredRating(rating)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110"
                  aria-label={`Rate ${rating} stars`}
                >
                  <Star
                    className={`h-10 w-10 transition-colors ${
                      rating <= (hoveredRating || focusRating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}

            </div>
            {goal && (
  <div className="mt-6 rounded-2xl bg-gradient-to-r from-blue-50 to-green-50 p-6">
    <p className="mb-4 text-center text-gray-700">
      Did you achieve your goal for this session?
    </p>
    <div className="flex justify-center gap-3">
      {["Yes", "Partially", "No"].map((option) => (
        <button
          key={option}
          onClick={() => setGoalResult(option)}
          className={`rounded-2xl px-5 py-2 transition-all ${
            goalResult === option
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  </div>
)}
            {focusRating > 0 && (
              <p className="mt-3 text-center text-sm text-gray-600">
                {focusRating === 5
                  ? "Excellent focus!"
                  : focusRating >= 3
                  ? "Good job!"
                  : "Every session is progress!"}
              </p>
            )}
          </div>
        </div>

        <button
          onClick={handleFinish}
          className="w-full rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 py-4 text-white shadow-md transition-all hover:from-blue-600 hover:to-blue-700 hover:shadow-lg"
        >
          Start New Session
        </button>
      </div>
    </div>
  );
}