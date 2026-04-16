import React from "react";
import { Session } from "../types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

interface ProgressChartProps {
  sessions: Session[];
}

function calculateScore(session: Session): number {
  const focusPoints = (session.focusRating ?? 0) * 10;
  const interruptionPenalty = session.interruptions * 10;

  let goalBonus = 0;
  if (session.goalResult === "Yes") goalBonus = 10;
  else if (session.goalResult === "Partially") goalBonus = 5;

  const score = 50 + focusPoints + goalBonus - interruptionPenalty;
  return Math.max(0, Math.min(100, score));
}

export function ProgressChart({ sessions }: ProgressChartProps) {
  const chartData = sessions
    .slice(0, 7)
    .reverse()
    .map((session, index) => ({
      name: `S${index + 1}`,
      score: calculateScore(session)
    }));

  if (sessions.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-6">
        <h3 className="mb-4 text-gray-900">Progress Overview</h3>
        <p className="py-8 text-center text-sm text-gray-400">
          Complete a few sessions to see your progress
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6">
      <h3 className="mb-4 text-gray-900">Progress Overview</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-3 text-sm text-gray-500">
        Score is based on focus rating, interruptions, and goal completion.
      </p>
    </div>
  );
}