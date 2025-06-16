
import DOMPurify from 'dompurify';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') return '';
  
  // Remove any HTML tags and sanitize
  const sanitized = DOMPurify.sanitize(input, { 
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: []
  });
  
  // Trim whitespace and normalize
  return sanitized.trim().replace(/\s+/g, ' ');
};

export const validateEmail = (email: string): ValidationResult => {
  const errors: string[] = [];
  const sanitizedEmail = sanitizeInput(email).toLowerCase();
  
  // Enhanced email validation
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  if (!sanitizedEmail) {
    errors.push('Email is required');
  } else if (!emailRegex.test(sanitizedEmail)) {
    errors.push('Please enter a valid email address');
  } else if (sanitizedEmail.length > 254) {
    errors.push('Email address is too long');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateName = (name: string): ValidationResult => {
  const errors: string[] = [];
  const sanitizedName = sanitizeInput(name);
  
  if (!sanitizedName) {
    errors.push('Name is required');
  } else if (sanitizedName.length < 2) {
    errors.push('Name must be at least 2 characters long');
  } else if (sanitizedName.length > 100) {
    errors.push('Name is too long');
  } else if (!/^[a-zA-Z\s'-]+$/.test(sanitizedName)) {
    errors.push('Name can only contain letters, spaces, hyphens, and apostrophes');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validatePhone = (phone: string): ValidationResult => {
  const errors: string[] = [];
  const sanitizedPhone = sanitizeInput(phone).replace(/\D/g, '');
  
  if (!sanitizedPhone) {
    errors.push('Phone number is required');
  } else if (sanitizedPhone.length < 10 || sanitizedPhone.length > 15) {
    errors.push('Please enter a valid phone number');
  } else if (!/^(\+?234|0)?[789]\d{9}$/.test(sanitizedPhone)) {
    errors.push('Please enter a valid Nigerian phone number');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateSchool = (school: string): ValidationResult => {
  const errors: string[] = [];
  const sanitizedSchool = sanitizeInput(school);
  
  if (!sanitizedSchool) {
    errors.push('School name is required');
  } else if (sanitizedSchool.length < 2) {
    errors.push('School name must be at least 2 characters long');
  } else if (sanitizedSchool.length > 200) {
    errors.push('School name is too long');
  } else if (!/^[a-zA-Z0-9\s.,'-]+$/.test(sanitizedSchool)) {
    errors.push('School name contains invalid characters');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateFormData = (formData: {
  name: string;
  email: string;
  phone: string;
  school: string;
  role: string;
  subject?: string;
}) => {
  const nameValidation = validateName(formData.name);
  const emailValidation = validateEmail(formData.email);
  const phoneValidation = validatePhone(formData.phone);
  const schoolValidation = validateSchool(formData.school);
  
  const allErrors = [
    ...nameValidation.errors,
    ...emailValidation.errors,
    ...phoneValidation.errors,
    ...schoolValidation.errors
  ];
  
  return {
    isValid: allErrors.length === 0,
    errors: allErrors,
    sanitizedData: {
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email).toLowerCase(),
      phone: sanitizeInput(formData.phone),
      school: sanitizeInput(formData.school),
      role: formData.role,
      subject: formData.subject ? sanitizeInput(formData.subject) : null
    }
  };
};
