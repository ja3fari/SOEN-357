import { motion } from "motion/react";
import { X } from "lucide-react";
import React from "react";

interface SoftReminderProps {
  message: string;
  onDismiss: () => void;
}

export function SoftReminder({ message, onDismiss }: SoftReminderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed top-8 left-1/2 z-50 -translate-x-1/2"
    >
      <div className="flex max-w-md items-center gap-4 rounded-2xl border border-blue-100 bg-white px-6 py-4 shadow-lg">
        <div className="h-2 w-2 animate-pulse rounded-full bg-blue-400" />
        <p className="flex-1 text-gray-700">{message}</p>
        <button
          onClick={onDismiss}
          className="text-gray-400 transition-colors hover:text-gray-600"
          aria-label="Dismiss reminder"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
}