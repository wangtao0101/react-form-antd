const getLength = (value) => {
    if (typeof (value) === 'number') {
        return value;
    }
    if (typeof (value) === 'string' || Array.isArray(value)) {
        return value.length;
    }
    return null;
};

export default {
    required: (value) => {
        if (value == null || value === '') {
            return true;
        }
        return false;
    },

    len: (value, len) => {
        const length = getLength(value);
        if (length == null) {
            return true;
        }
        return len !== length;
    },

    max: (value, max) => {
        const length = getLength(value);
        if (length == null) {
            return false;
        }
        return max < length;
    },

    min: (value, min) => {
        const length = getLength(value);
        if (length == null) {
            return false;
        }
        return min > length;
    },
};
