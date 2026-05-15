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
    req.body = sanitizeValue(req.body ?? {});
    req.query = sanitizeValue(req.query ?? {});
    req.params = sanitizeValue(req.params ?? {});
    next();
};

export default sanitize;