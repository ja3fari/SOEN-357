import { Session } from "../types";
import { formatDuration } from "../utils/storage";
import { Star, Clock } from "lucide-react";
import React from "react";

interface HistoryProps {
  sessions: Session[];
}

export function History({ sessions }: HistoryProps) {
  if (sessions.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-6">
        <h3 className="mb-4 text-gray-900">Recent Sessions</h3>
        <p className="py-8 text-center text-sm text-gray-400">No sessions yet</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6">
      <h3 className="mb-4 text-gray-900">Recent Sessions</h3>
      <div className="space-y-3">
        {sessions.slice(0, 5).map((session) => (
          <div
            key={session.id}
            className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3 transition-colors hover:bg-gray-100"
          >
            <div className="min-w-0 flex-1">
  <p className="truncate text-sm text-gray-900">{session.task}</p>

  {session.goal && (
    <p className="mt-1 truncate text-xs text-gray-500">
      Goal: {session.goal}
    </p>
  )}

  {session.goalResult && (
    <p className="mt-1 text-xs text-blue-600">
      Goal achieved: {session.goalResult}
    </p>
  )}

  <div className="mt-2 flex items-center gap-3">
    <span className="flex items-center gap-1 text-xs text-gray-500">
      <Clock className="h-3 w-3" />
      {formatDuration(session.duration)}
    </span>
    {session.focusRating !== undefined && (
  <div className="flex items-center gap-1">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < session.focusRating!
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
        ))}
      </div>
    </div>
  );
}
