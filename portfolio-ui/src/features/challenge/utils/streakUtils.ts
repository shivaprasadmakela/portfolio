import { getISTDateString, getCurrentIST } from './timeUtils';

export interface UserChallengeData {
  email: string;
  name: string;
  checkIns: string[]; // Array of date strings "YYYY-MM-DD"
  currentStreak: number;
  longestStreak: number;
  lastCheckIn: string; // "YYYY-MM-DD"
}

const STORAGE_KEY = 'wake_up_challenge_v1';

export const getGlobalChallengeData = (): UserChallengeData[] => {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
};

export const saveGlobalChallengeData = (data: UserChallengeData[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const getUserData = (email: string): UserChallengeData | null => {
  const allData = getGlobalChallengeData();
  return allData.find(u => u.email === email) || null;
};

export const processCheckIn = (email: string, name: string): { success: boolean; message: string; userData: UserChallengeData } => {
  const allData = getGlobalChallengeData();
  const today = getISTDateString();
  
  let user = allData.find(u => u.email === email);
  
  if (!user) {
    // New user
    user = {
      email,
      name,
      checkIns: [today],
      currentStreak: 1,
      longestStreak: 1,
      lastCheckIn: today
    };
    allData.push(user);
    saveGlobalChallengeData(allData);
    return { success: true, message: "Welcome to the challenge! Day 1 locked in. 🔥", userData: user };
  }

  // Check if already checked in today
  if (user.lastCheckIn === today) {
    return { success: false, message: "You've already checked in for today! See you tomorrow. 👋", userData: user };
  }

  // Calculate if it's a streak continuation
  const yesterday = new Date(getCurrentIST());
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = getISTDateString(yesterday);

  if (user.lastCheckIn === yesterdayStr) {
    user.currentStreak += 1;
  } else {
    user.currentStreak = 1; // Streak reset
  }

  if (user.currentStreak > user.longestStreak) {
    user.longestStreak = user.currentStreak;
  }

  user.lastCheckIn = today;
  user.checkIns.push(today);
  user.name = name; // Update name just in case

  saveGlobalChallengeData(allData);
  
  const streakMsg = user.currentStreak > 1 
    ? `Streak continued! Day ${user.currentStreak} locked in. 🔥` 
    : "Streak reset, but you're back on track! Day 1 locked in. ⚡";

  return { success: true, message: streakMsg, userData: user };
};

export const getLeaderboard = (): UserChallengeData[] => {
  const allData = getGlobalChallengeData();
  return [...allData].sort((a, b) => b.currentStreak - a.currentStreak);
};
