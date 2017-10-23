export const getValueFromEvent = (e) => {
    if (!e || !e.target) {
        return e;
    }
    const { target } = e;
    return target.type === 'checkbox' ? target.checked : target.value;
};

export const normalizeValidateTrigger = (validateTrigger = []) => [].concat(validateTrigger);

export const noop = () => {};
