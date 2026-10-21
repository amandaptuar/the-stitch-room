// The Stitch Room - Local Persistence & Business Service Layer
import { INITIAL_INQUIRIES, INITIAL_SCHOOLS } from '../data/mockData';

const STORAGE_KEYS = {
  INQUIRIES: 'tsr_inquiries_v2',
  SCHOOLS: 'tsr_schools_v2',
  ADMIN_AUTH: 'tsr_admin_session_v2',
};

// Initialize LocalStorage with seed data if empty
export const initStorage = () => {
  if (typeof window === 'undefined') return;

  if (!localStorage.getItem(STORAGE_KEYS.INQUIRIES)) {
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(INITIAL_INQUIRIES));
  }

  if (!localStorage.getItem(STORAGE_KEYS.SCHOOLS)) {
    localStorage.setItem(STORAGE_KEYS.SCHOOLS, JSON.stringify(INITIAL_SCHOOLS));
  }
};

// Inquiries CRUD
export const getInquiries = () => {
  initStorage();
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
    return raw ? JSON.parse(raw) : INITIAL_INQUIRIES;
  } catch (e) {
    console.error('Failed to parse inquiries', e);
    return INITIAL_INQUIRIES;
  }
};

export const saveInquiry = (newInquiry) => {
  const current = getInquiries();
  const entry = {
    id: `INQ-${new Date().getFullYear()}-${String(current.length + 1).padStart(3, '0')}`,
    date: new Date().toISOString().split('T')[0],
    status: 'New',
    ...newInquiry,
  };
  const updated = [entry, ...current];
  localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
  return entry;
};

export const updateInquiryStatus = (id, newStatus) => {
  const current = getInquiries();
  const updated = current.map((item) => (item.id === id ? { ...item, status: newStatus } : item));
  localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
  return updated;
};

export const deleteInquiry = (id) => {
  const current = getInquiries();
  const updated = current.filter((item) => item.id !== id);
  localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
  return updated;
};

// Schools CRUD
export const getSchools = () => {
  initStorage();
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SCHOOLS);
    return raw ? JSON.parse(raw) : INITIAL_SCHOOLS;
  } catch (e) {
    console.error('Failed to parse schools', e);
    return INITIAL_SCHOOLS;
  }
};

export const addSchool = (school) => {
  const current = getSchools();
  const newSchool = {
    id: Date.now(),
    status: 'Active Partner',
    colors: ['#c97550', '#0f172a', '#ffffff'],
    ...school,
  };
  const updated = [newSchool, ...current];
  localStorage.setItem(STORAGE_KEYS.SCHOOLS, JSON.stringify(updated));
  return updated;
};

export const updateSchool = (id, fields) => {
  const current = getSchools();
  const updated = current.map((s) => (s.id === id ? { ...s, ...fields } : s));
  localStorage.setItem(STORAGE_KEYS.SCHOOLS, JSON.stringify(updated));
  return updated;
};

export const deleteSchool = (id) => {
  const current = getSchools();
  const updated = current.filter((s) => s.id !== id);
  localStorage.setItem(STORAGE_KEYS.SCHOOLS, JSON.stringify(updated));
  return updated;
};

// Admin Auth State
export const getAdminAuth = () => {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) || localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
};

export const setAdminAuth = (user, remember = false) => {
  const data = JSON.stringify({
    username: user.username || 'admin',
    role: 'Super Administrator',
    loginTime: new Date().toISOString(),
  });
  if (remember) {
    localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, data);
  }
  sessionStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, data);
};

export const clearAdminAuth = () => {
  sessionStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
  localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
};
