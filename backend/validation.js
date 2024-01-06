
export function validateType(value, fieldName, expectedType) {
    if (value !== null && typeof value !== expectedType) {
        throw new Error(`${fieldName} must be of type ${expectedType}.`);
    }
}

// Usage example:
export function isString(value, fieldName) {
    validateType(value, fieldName, 'string');
}

export function isNumber(value, fieldName) {
    validateType(value, fieldName, 'number');
}

export function isBoolean(value, fieldName) {
    validateType(value, fieldName, 'boolean');
}
