import { Session } from "../types";

const STORAGE_KEY = "focusflow_sessions";

export const saveSession = (session: Session): void => {
  try {
    const sessions = getSessions();
    sessions.unshift(session);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  } catch (error) {
    console.error("Failed to save session:", error);
  }
};

export const getSessions = (): Session[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    const sessions = JSON.parse(data);
    return sessions.map((s: Session) => ({
      ...s,
      completedAt: new Date(s.completedAt)
    }));
  } catch (error) {
    console.error("Failed to get sessions:", error);
    return [];
  }
};

export const getLastSession = (): Session | null => {
  const sessions = getSessions();
  return sessions.length > 0 ? sessions[0] : null;
};

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

export const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  if (mins < 60) {
    return `${mins} min`;
  }
  const hours = Math.floor(mins / 60);
  const remainingMins = mins % 60;
  return `${hours}h ${remainingMins}m`;
};