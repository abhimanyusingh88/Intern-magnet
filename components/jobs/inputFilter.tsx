import React from 'react';
import { inputClasses, numberInputClasses } from './reusableClasses';

export const InputFilter = ({ type, className = '', ...props }: React.InputHTMLAttributes<HTMLInputElement>) => {
    // Determine the base styling based on input type
    const baseClasses = type === 'number' ? numberInputClasses : inputClasses;

    return (
        <input
            type={type}
            className={`${baseClasses} ${className}`.trim()}
            {...props}
        />
    );
};
