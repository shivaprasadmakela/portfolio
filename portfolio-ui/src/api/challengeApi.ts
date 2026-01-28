import { apiClient } from './apiClient';

export interface VerificationQuestion {
    id: number;
    question: string;
    placeholder: string;
}

export interface CheckInRequest {
    name: string;
    email: string;
    answer: string;
    questionId: number;
}

export interface CheckInResponse {
    success: boolean;
    message: string;
    currentStreak: number;
    longestStreak: number;
}

export interface LeaderboardEntry {
    name: string;
    email: string;
    currentStreak: number;
    longestStreak: number;
    lastCheckIn: string;
}

export const challengeApi = {
    getQuestion: () => apiClient<VerificationQuestion>('/api/challenges/question'),
    
    checkIn: (request: CheckInRequest) => 
        apiClient<CheckInResponse>('/api/challenges/checkin', {
            method: 'POST',
            body: JSON.stringify(request),
        }),
    
    getLeaderboard: () => apiClient<LeaderboardEntry[]>('/api/challenges/leaderboard'),
};
