/**
 * Utility functions for handling IST (India Standard Time)
 * IST is UTC+5:30
 */

export const getCurrentIST = (): Date => {
  const now = new Date();
  // We use Intl to get the current time in IST regardless of user's local system time
  const istString = now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
  return new Date(istString);
};

export const getISTDateString = (date: Date = getCurrentIST()): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const isSubmissionWindowActive = (): { active: boolean; reason?: string } => {
 
  if (import.meta.env.VITE_TEST_MODE === 'true') {
    return { active: true };
  }

  const ist = getCurrentIST();
  const hours = ist.getHours();
  // window is 5:00:00 to 5:59:59
  if (hours === 5) {
    return { active: true };
  }
  
  if (hours < 5) {
    return { active: false, reason: "It's too early! Submissions open at 5:00 AM IST." };
  }
  
  return { active: false, reason: "Submission window closed at 6:00 AM IST. Come back tomorrow!" };
};

export const getISTTimeDisplay = (): string => {
  return getCurrentIST().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  }) + " IST";
};

export const getCountdown = (): { label: string; time: string } => {
  const now = getCurrentIST();
  const hours = now.getHours();
  
  const target = new Date(now);
  target.setMinutes(0);
  target.setSeconds(0);
  target.setMilliseconds(0);

  let label = "";
  if (hours < 5) {
    label = "Opens in";
    target.setHours(5);
  } else if (hours === 5) {
    label = "Closes in";
    target.setHours(6);
  } else {
    label = "Opens in";
    target.setDate(target.getDate() + 1);
    target.setHours(5);
  }

  const diff = target.getTime() - now.getTime();
  const h = Math.floor(diff / (1000 * 60 * 60));
  const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((diff % (1000 * 60)) / 1000);

  const time = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  
  return { label, time };
};
export const formatDateTime = (dateStr: string): string => {
  if (!dateStr) return 'N/A';
  const date = new Date(dateStr);
  
 
  const datePart = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  
  const timePart = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
  
  return `${datePart} ${timePart}`;
};
