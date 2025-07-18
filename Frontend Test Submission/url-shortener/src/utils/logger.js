export const logEvent = (message) => {
  const log = `[${new Date().toISOString()}] ${message}`;
  localStorage.setItem(`log-${Date.now()}`, log);
};