const sanitizeValue = (obj) => {
    if (typeof obj !== 'object' || obj === null) return obj;

    for (const key of Object.keys(obj)) {
        if (key.startsWith('$') || key.includes('.')) {
            delete obj[key];
        } else {
            obj[key] = sanitizeValue(obj[key]);
        }
    }

    return obj;
};

const sanitize = (req, res, next) => {
    sanitizeValue(req.body ?? {});
    sanitizeValue(req.query ?? {});
    sanitizeValue(req.params ?? {});
    next();
};

export default sanitize;