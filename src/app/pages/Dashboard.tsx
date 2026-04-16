
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { History } from "../components/History";
import { getSessions, getLastSession, formatDuration } from "../utils/storage";
import { Session } from "../types";
import { Play, Star } from "lucide-react";


export function Dashboard() {
  const navigate = useNavigate();
  const [task, setTask] = useState("");
  const [sessions, setSessions] = useState<Session[]>([]);
  const [lastSession, setLastSession] = useState<Session | null>(null);
  const [goal, setGoal] = useState("");

  <input
  type="text"
  placeholder="What is your goal for this session?"
  value={goal}
  onChange={(e) => setGoal(e.target.value)}
/>

  useEffect(() => {
    setSessions(getSessions());
    setLastSession(getLastSession());
  }, []);

  const handleStartSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (task.trim()) {
      navigate("/focus", { state: { task: task.trim(), goal: goal.trim() } });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="mb-12 text-center">
          <h1 className="mb-2 text-5xl text-gray-900">FocusFlow</h1>
          <p className="text-gray-500">Study with intention, achieve with focus</p>
        </div>

        <div className="mb-8 rounded-3xl border border-gray-100 bg-white p-10 shadow-lg">
        {lastSession && (
  <div className="mb-8 rounded-2xl bg-gradient-to-r from-blue-50 to-green-50 p-6">
    <p className="mb-2 text-sm text-gray-600">Last Session</p>
    <div className="flex items-center justify-between">
      <div>
        <p className="mb-1 text-gray-900">{lastSession.task}</p>

        {lastSession.goal && (
          <p className="mb-1 text-sm text-gray-600">
            Goal: {lastSession.goal}
          </p>
        )}

        {lastSession.goalResult && (
          <p className="mb-1 text-sm text-blue-600">
            Goal achieved: {lastSession.goalResult}
          </p>
        )}

        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>{formatDuration(lastSession.duration)}</span>
          {lastSession.focusRating !== undefined && (
  <div className="flex items-center gap-1">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-3.5 w-3.5 ${
          i < lastSession.focusRating!
            ? "fill-amber-400 text-amber-400"
            : "text-gray-300"
        }`}
      />
    ))}
  </div>
)}
        </div>
      </div>
    </div>
  </div>
)}

          <form onSubmit={handleStartSession} className="space-y-6">
            <div>
              <label
                htmlFor="task-input"
                className="mb-3 block text-center text-gray-700"
              >
                What are you studying today?
              </label>
              <input
                id="task-input"
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="e.g., Calculus Chapter 5"
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-6 py-4 text-center text-gray-900 placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-400"
                autoFocus
              />
            </div>
            <div>
  <label
    htmlFor="goal-input"
    className="mb-3 block text-center text-gray-700"
  >
    What is your goal for this session?
  </label>
  <input
    id="goal-input"
    type="text"
    value={goal}
    onChange={(e) => setGoal(e.target.value)}
    placeholder="e.g., Finish section 3 summary"
    className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-6 py-4 text-center text-gray-900 placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-400"
  />
</div>
            <button
              type="submit"
              disabled={!task.trim()}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 py-4 text-white shadow-md transition-all hover:from-blue-600 hover:to-blue-700 hover:shadow-lg disabled:cursor-not-allowed disabled:from-gray-300 disabled:to-gray-300 disabled:shadow-none"
            >
              <Play className="h-5 w-5" />
              Start Focus Session
            </button>
          </form>
        </div>

        <History sessions={sessions} />
      </div>
    </div>
  );
}