export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validateUsername = (username) => {
  return username.length >= 3 && username.length <= 20;
};

export const validateTransactionHash = (hash) => {
  // Basic Solana transaction hash validation
  return hash.length === 88 && /^[A-Za-z0-9]+$/.test(hash);
};

export const validateAmount = (amount, min = 0, max = 1000000) => {
  const num = parseFloat(amount);
  return !isNaN(num) && num >= min && num <= max;
};

