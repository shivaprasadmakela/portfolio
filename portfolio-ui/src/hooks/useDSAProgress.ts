import { useState, useCallback, useEffect } from 'react';

const NOTES_KEY = 'dsa_notes';

function loadNotes(): Record<string, string> {
  try {
    const raw = localStorage.getItem(NOTES_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function useDSAProgress() {
  const [notes, setNotes] = useState<Record<string, string>>(loadNotes);

  useEffect(() => {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  }, [notes]);

  const updateNotes = useCallback((id: string, note: string) => {
    setNotes(prev => ({ ...prev, [id]: note }));
  }, []);

  const getNote = (id: string) => notes[id] ?? '';

  return { notes, updateNotes, getNote };
}
