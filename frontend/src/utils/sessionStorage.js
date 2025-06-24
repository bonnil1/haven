export const saveToSession = (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
};
  
export const loadFromSession = (key, fallback = '') => {
    const stored = sessionStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
};