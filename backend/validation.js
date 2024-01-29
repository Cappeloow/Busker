
export function validateType(value, fieldName, expectedType) {
    if (value !== null && value !== undefined && typeof value !== expectedType) {
        throw new Error(`${fieldName} must be of type ${expectedType}.`);
    }
}

// String checker
export function isString(value, fieldName) {
    validateType(value, fieldName, 'string');
}

// Number checker
export function isNumber(value, fieldName) {
    validateType(value, fieldName, 'number');
}

// Bool checker
export function isBoolean(value, fieldName) {
    validateType(value, fieldName, 'boolean');
}
