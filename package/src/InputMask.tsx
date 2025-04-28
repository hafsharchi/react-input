import React, { 
  useState, 
  useRef, 
  forwardRef, 
  useImperativeHandle, 
  useEffect,
  ChangeEvent,
  FocusEvent,
  KeyboardEvent
} from 'react';
import { cn } from '../lib/utils/cn';

export type MaskPattern = {
  /** The actual mask pattern (e.g. "999-999-9999" for phone numbers) */
  pattern: string;
  /** The character used in the pattern to represent user input (default: 9 for digits) */
  placeholder?: string;
  /** Mapping of pattern characters to regex validators */
  tokens?: Record<string, RegExp>;
};

// Common mask patterns
export const MASK_PATTERNS = {
  PHONE_US: { pattern: '(999) 999-9999', placeholder: '9', tokens: { '9': /\d/ } },
  PHONE_INTL: { pattern: '+9 (999) 999-9999', placeholder: '9', tokens: { '9': /\d/ } },
  DATE_US: { pattern: '99/99/9999', placeholder: '9', tokens: { '9': /\d/ } },
  DATE_ISO: { pattern: '9999-99-99', placeholder: '9', tokens: { '9': /\d/ } },
  TIME_24H: { pattern: '99:99', placeholder: '9', tokens: { '9': /\d/ } },
  TIME_12H: { pattern: '99:99 aa', placeholder: '9', tokens: { '9': /\d/, 'a': /[aApP]/ } },
  CREDIT_CARD: { pattern: '9999 9999 9999 9999', placeholder: '9', tokens: { '9': /\d/ } },
  SSN: { pattern: '999-99-9999', placeholder: '9', tokens: { '9': /\d/ } },
  ZIP_CODE: { pattern: '99999-9999', placeholder: '9', tokens: { '9': /\d/ } },
  IP_ADDRESS: { pattern: '999.999.999.999', placeholder: '9', tokens: { '9': /\d/ } },
  CURRENCY: { pattern: '$9,999,999.99', placeholder: '9', tokens: { '9': /\d/ } },
}

export type InputMaskProps = {
  /** The mask pattern or predefined mask pattern object */
  mask: string | MaskPattern;
  /** Default value for the input */
  defaultValue?: string;
  /** Placeholder text shown when input is empty */
  placeholder?: string;
  /** Input name attribute */
  name: string;
  /** CSS class for the input element */
  className?: string;
  /** CSS class for the wrapper div */
  wrapperClassName?: string;
  /** Label text for the input */
  label?: string;
  /** CSS class for the label element */
  labelClassName?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Whether the field is disabled */
  disabled?: boolean;
  /** Regular expression for validation */
  pattern?: RegExp;
  /** Error message to display when validation fails */
  errorMessage?: string;
  /** Whether to guide the user with mask characters as they type */
  guide?: boolean;
  /** Callback function when value changes */
  onChange?: (value: string, maskedValue: string) => void;
  /** Callback function when input loses focus */
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  /** Callback function when input gets focus */
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  /** Callback function for key down events */
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  /** Character to display for unfilled mask positions */
  placeholderChar?: string;
  /** Custom CSS class to apply when input has an error */
  errorClassName?: string;
  /** Custom character to separate input sections */
  separator?: string;
  /** Prefix to add before the input value */
  prefix?: string;
  /** Suffix to add after the input value */
  suffix?: string;
  /** Whether to keep literals during user input */
  keepCharPositions?: boolean;
  /** Whether to apply numeric-only input */
  numeric?: boolean;
  /** Custom validator function */
  validator?: (value: string) => boolean;
  /** Custom tokens to use for mask validation */
  tokens?: Record<string, RegExp>;
};

export type InputMaskRef = {
  /** Get the current raw (unmasked) value */
  getRawValue: () => string;
  /** Get the current masked value */
  getMaskedValue: () => string;
  /** Set the input to a new value */
  setValue: (value: string) => void;
  /** Focus the input element */
  focus: () => void;
  /** Blur (unfocus) the input element */
  blur: () => void;
  /** Validate the current input value */
  validate: () => boolean;
  /** Select all text in the input */
  selectAll: () => void;
  /** Set selection range in the input */
  setSelectionRange: (start: number, end: number) => void;
};

const InputMask = forwardRef<InputMaskRef, InputMaskProps>((props, ref) => {
  const {
    mask,
    defaultValue = '',
    placeholder = '',
    name,
    className = '',
    wrapperClassName = '',
    label,
    labelClassName = '',
    required = false,
    disabled = false,
    pattern,
    errorMessage,
    guide = true,
    onChange,
    onBlur,
    onFocus,
    onKeyDown,
    placeholderChar = '_',
    errorClassName = '',
    prefix = '',
    suffix = '',
    keepCharPositions = false,
    numeric = false,
    validator,
    tokens: customTokens,
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(defaultValue);
  const [maskedValue, setMaskedValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [caretPosition, setCaretPosition] = useState(0);
  
  // Determine the actual mask pattern and tokens
  const maskPattern = typeof mask === 'string' 
    ? { pattern: mask, placeholder: '9', tokens: customTokens || { '9': /\d/ } } 
    : mask;
     
  const { pattern: maskText, tokens = { '9': /\d/ } } = maskPattern;

  // Process mask into an array of expected character types
  const maskArray = maskText.split('');
  
  // Function to convert raw value to masked value
  const formatValue = (rawValue: string): string => {
    if (!rawValue) return '';
    
    const valueChars = rawValue.split('');
    let maskedResult = '';
    let valueIndex = 0;
    
    // Apply the mask pattern
    for (let i = 0; i < maskArray.length && valueIndex < valueChars.length; i++) {
      const maskChar = maskArray[i];
      const token = tokens[maskChar];
      
      if (token) {
        // This is a placeholder position that should be filled with user input
        if (valueIndex < valueChars.length) {
          const char = valueChars[valueIndex];
          if (token.test(char)) {
            maskedResult += char;
            valueIndex++;
          } else {
            // Skip invalid character
            valueIndex++;
            i--; // Try again with the next character from input
          }
        } else {
          // No more input characters
          if (guide) {
            maskedResult += placeholderChar;
          }
        }
      } else {
        // This is a literal in the mask pattern (like '-' or '/')
        maskedResult += maskChar;
        // Skip input character if it matches the literal
        if (valueIndex < valueChars.length && valueChars[valueIndex] === maskChar) {
          valueIndex++;
        }
      }
    }
    
    return maskedResult;
  };
  
  // Function to extract raw value from masked input
  const extractRawValue = (maskedValue: string): string => {
    if (!maskedValue) return '';
    
    let rawValue = '';
    const valueChars = maskedValue.split('');
    
    for (let i = 0; i < valueChars.length; i++) {
      const char = valueChars[i];
      if (char !== placeholderChar) {
        // Check if this is not a mask literal
        let isLiteral = false;
        for (const key in tokens) {
          if (maskArray[i] === key) {
            isLiteral = false;
            break;
          }
          isLiteral = true;
        }
        if (!isLiteral) {
          rawValue += char;
        }
      }
    }
    
    return rawValue;
  };
  
  // Validate the current value
  const validateValue = (valueToValidate: string): boolean => {
    if (required && !valueToValidate) {
      setError('This field is required');
      return false;
    }
    
    if (pattern && valueToValidate && !pattern.test(valueToValidate)) {
      setError(errorMessage || 'Invalid format');
      return false;
    }
    
    if (validator && !validator(valueToValidate)) {
      setError(errorMessage || 'Invalid value');
      return false;
    }
    
    setError(null);
    return true;
  };
  
  // Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    let processedValue = inputValue;
    
    // Handle numeric-only input
    if (numeric) {
      processedValue = processedValue.replace(/[^\d]/g, '');
    }
    
    // Apply masking
    const newMaskedValue = formatValue(processedValue);
    const newRawValue = extractRawValue(newMaskedValue);
    
    setValue(newRawValue);
    setMaskedValue(newMaskedValue);
    
    // Update the input's value directly for better control
    if (inputRef.current) {
      inputRef.current.value = newMaskedValue;
    }
    
    // Validate
    validateValue(newRawValue);
    
    // Call the onChange handler
    if (onChange) {
      onChange(newRawValue, newMaskedValue);
    }
  
  };
  
  // Handle blur event
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    validateValue(value);
    
    if (onBlur) {
      onBlur(e);
    }
  };
  
  // Handle focus event
  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    
    if (onFocus) {
      onFocus(e);
    }
  };
  
  // Handle keydown event
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Special key handling can be added here
    
    if (onKeyDown) {
      onKeyDown(e);
    }
  };
  
  // Set caret position after value changes
  useEffect(() => {
    if (inputRef.current && isFocused) {
      // inputRef.current.setSelectionRange(caretPosition, caretPosition);
    }
  }, [maskedValue, caretPosition, isFocused]);
  
  // Initialize masked value on component mount
  useEffect(() => {
    if (defaultValue) {
      const initialMaskedValue = formatValue(defaultValue);
      setMaskedValue(initialMaskedValue);
      if (inputRef.current) {
        inputRef.current.value = initialMaskedValue;
      }
    }
  }, []);
  
  // Expose methods via the ref
  useImperativeHandle(ref, () => ({
    getRawValue: () => value,
    getMaskedValue: () => maskedValue,
    setValue: (newValue: string) => {
      const newMaskedValue = formatValue(newValue);
      setValue(newValue);
      setMaskedValue(newMaskedValue);
      if (inputRef.current) {
        inputRef.current.value = newMaskedValue;
      }
    },
    focus: () => {
      inputRef.current?.focus();
    },
    blur: () => {
      inputRef.current?.blur();
    },
    validate: () => validateValue(value),
    selectAll: () => {
      if (inputRef.current) {
        inputRef.current.select();
      }
    },
    setSelectionRange: (start: number, end: number) => {
      if (inputRef.current) {
        inputRef.current.setSelectionRange(start, end);
      }
    }
  }));
  
  return (
    <div className={cn('input-mask-wrapper', wrapperClassName)}>
      {label && (
        <label 
          htmlFor={name} 
          className={cn('input-mask-label', labelClassName, { required })}
        >
          {label}
          {required && <span className="input-mask-required-indicator">*</span>}
        </label>
      )}
      
      <div className="input-mask-input-wrapper">
        {prefix && <span className="input-mask-prefix">{prefix}</span>}
        
        <input
          ref={inputRef}
          type="text"
          id={name}
          name={name}
          className={cn(
            'input-mask-input',
            className,
            error ? errorClassName || 'input-mask-error' : '',
            isFocused ? 'input-mask-focused' : ''
          )}
          placeholder={placeholder}
          disabled={disabled}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          defaultValue={maskedValue}
          aria-invalid={!!error}
          aria-required={required}
        />
        
        {suffix && <span className="input-mask-suffix">{suffix}</span>}
      </div>
      
      {error && <div className="input-mask-error-message">{error}</div>}
    </div>
  );
});

InputMask.displayName = 'InputMask';

export default InputMask; 