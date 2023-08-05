const createAlert = (msg, type = "danger") => {
    return `<p class="alert alert-${type} 
    d-flex justify-content-between" role="alert" >${msg}   
            <button class="btn-close" data-bs-dismiss="alert"></button></p>`
};

// regular expression for validations check
const isNumber = (num) => {
    const pattern = /^[0-9]{6,}$/;
    return pattern.test(num);
};

// set data to localStorage 
const setDataLs = (student, data) => {
    return localStorage.setItem(student, JSON.stringify(data))
};

// get data to localStorage 
const getDataLS = (student) => {
    if (localStorage.getItem(student)) {
        return JSON.parse(localStorage.getItem(student));
    }
    return [];
};

/*****
 * Createing unique id or geneteting  id like mongo DB
 */

const getRandomId = (length) => {
    const cryptoObj = window.crypto || window.msCrypto; // Modern browsers use 'crypto', and IE/Edge uses 'msCrypto'.

    // Check if the cryptographic object is available and has the 'getRandomValues' method.
    if (!cryptoObj || !cryptoObj.getRandomValues) {
        throw new Error('Your browser does not support secure random number generation.');
    }

    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const randomArray = new Uint16Array(length);

    // Generate random values and fill the array.
    cryptoObj.getRandomValues(randomArray);

    let result = '';
    for (let i = 0; i < length; i++) {
        result += charset[randomArray[i] % charset.length];
    }
    return result;
};

// Create time ago functions 
const timeAgo = (date) => {
    const now = new Date();
    const postDate = new Date(date);

    const seconds = Math.floor((now - postDate) / 1000);

    const intervals = [
        { label: 'year', value: 31536000 },
        { label: 'month', value: 2592000 },
        { label: 'week', value: 604800 },
        { label: 'day', value: 86400 },
        { label: 'hour', value: 3600 },
        { label: 'minute', value: 60 },
        { label: 'second', value: 1 }
    ];

    for (let i = 0; i < intervals.length; i++) {
        const interval = intervals[i];
        const intervalValue = Math.floor(seconds / interval.value);
        if (intervalValue >= 1) {
            return intervalValue === 1 ? intervalValue + ' ' + interval.label + ' ago' : intervalValue + ' ' + interval.label + 's ago';
        }
    }
    return 'Just now';
}