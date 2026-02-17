export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export const validateEmail = (email: string): ValidationResult => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email) {
    return { isValid: false, message: 'Email é obrigatório' };
  }
  
  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'Email inválido' };
  }
  
  return { isValid: true };
};

export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return { isValid: false, message: 'Senha é obrigatória' };
  }
  
  if (password.length < 8) {
    return { isValid: false, message: 'Senha deve ter no mínimo 8 caracteres' };
  }
  
  const hasNumber = /\d/.test(password);
  const hasLetter = /[a-zA-Z]/.test(password);
  
  if (!hasNumber || !hasLetter) {
    return { isValid: false, message: 'Senha deve conter pelo menos 1 número e 1 letra' };
  }
  
  return { isValid: true };
};

export const validatePhone = (phone: string): ValidationResult => {
  if (!phone) {
    return { isValid: false, message: 'Telefone é obrigatório' };
  }
  
  const digitsOnly = phone.replace(/\D/g, '');
  
  if (digitsOnly.length < 10 || digitsOnly.length > 11) {
    return { isValid: false, message: 'Telefone inválido' };
  }
  
  return { isValid: true };
};

export const validateRequired = (value: string, fieldName = 'Campo'): ValidationResult => {
  if (!value || value.trim() === '') {
    return { isValid: false, message: `${fieldName} é obrigatório` };
  }
  
  return { isValid: true };
};

export const validateMinLength = (value: string, minLength: number, fieldName = 'Campo'): ValidationResult => {
  if (value.length < minLength) {
    return { isValid: false, message: `${fieldName} deve ter no mínimo ${minLength} caracteres` };
  }
  
  return { isValid: true };
};

export const validatePasswordMatch = (password: string, confirmPassword: string): ValidationResult => {
  if (password !== confirmPassword) {
    return { isValid: false, message: 'As senhas não coincidem' };
  }
  
  return { isValid: true };
};

export const getPasswordStrength = (password: string): { strength: 'weak' | 'medium' | 'strong'; score: number } => {
  let score = 0;
  
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;
  
  if (score <= 2) return { strength: 'weak', score };
  if (score <= 4) return { strength: 'medium', score };
  return { strength: 'strong', score };
};
