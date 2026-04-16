# FocusFlow 

## Overview
FocusFlow is a web-based study support prototype designed to help undergraduate students improve focus during study sessions. The system provides a minimal, distraction-free interface and uses gentle feedback instead of restrictive controls to support productivity.
The goal of this project is to explore how Human-Computer Interaction (HCI) principles can improve perceived focus and task efficiency.
## Features

- Dashboard
  - Simple interface to start a study session
  - Task and goal input
  - Displays recent sessions

- Focus Session
  - Countdown timer
  - Pause and resume functionality
  - Manual interruption tracking
  - Gentle reminder prompts

- Session Summary
  - Time spent
  - Number of interruptions
  - Focus rating from 1 to 5
  - Goal reflection: Yes / Partially / No

- Progress Tracking
  - Visual chart showing session quality
  - Based on focus rating, interruptions, and goal completion

- Local Storage
  - Sessions are saved in the browser
  - No backend required

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- Recharts

## How to Run the Project

### 1. Clone the repository

git clone https://github.com/ja3fari/SOEN-357.git
cd SOEN-357

### 2. Install dependencies
npm install 

### 3. Run the development server 
npm run dev 
npm run build 


## HCI Design Approach 
-This prototype follows key HCI principles:
Minimalism
-The interface is kept simple to reduce cognitive load and distractions.
Non-intrusive feedback
-The system uses soft reminders instead of strict blocking mechanisms.
Self-awareness
-Users reflect on their session through focus ratings, interruptions, and goal completion.
Behavioral support
-The design encourages better study habits without forcing the user.

## Limitations
-No backend or user accounts
-Data is stored only in browser local storage
-Progress score is a simplified metric for prototype purposes

## Future Improvements 
-User accounts and persistent cloud storage
-More advanced analytics
-Custom focus session durations
-Categorized interruption tracking








