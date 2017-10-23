export default {
    required: (value) => {
        if (value == null || value === '') {
            return true;
        }
        return false;
    },
};
