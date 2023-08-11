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
const timeAgo = (timestamp) => {
    const currentTime = Date.now();
    const timeDifference = currentTime - timestamp;

    // Define time units in milliseconds
    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    const month = 30 * day;
    const year = 365 * day;

    if (timeDifference < minute) {
        return "Just now";
    } else if (timeDifference < hour) {
        const minutesAgo = Math.floor(timeDifference / minute);
        return `${minutesAgo} ${minutesAgo === 1 ? "minute" : "minutes"} ago`;
    } else if (timeDifference < day) {
        const hoursAgo = Math.floor(timeDifference / hour);
        return `${hoursAgo} ${hoursAgo === 1 ? "hour" : "hours"} ago`;
    } else if (timeDifference < month) {
        const daysAgo = Math.floor(timeDifference / day);
        return `${daysAgo} ${daysAgo === 1 ? "day" : "days"} ago`;
    } else if (timeDifference < year) {
        const monthsAgo = Math.floor(timeDifference / month);
        return `${monthsAgo} ${monthsAgo === 1 ? "month" : "months"} ago`;
    } else {
        const yearsAgo = Math.floor(timeDifference / year);
        return `${yearsAgo} ${yearsAgo === 1 ? "year" : "years"} ago`;
    }
};




// function for marking  student 
const getResult = (mark) => {
    let grade;
    let gpa;

    if (mark >= 0 && mark < 33) {
        grade = "F";
        gpa = 0;
    } else if (mark >= 33 && mark < 40) {
        grade = "D";
        gpa = 1;
    } else if (mark >= 40 && mark < 50) {
        grade = "C";
        gpa = 2;
    } else if (mark >= 50 && mark < 60) {
        grade = "B";
        gpa = 3;
    } else if (mark >= 60 && mark < 70) {
        grade = "A-";
        gpa = 3.5;
    } else if (mark >= 70 && mark < 80) {
        grade = "A";
        gpa = 4;
    } else if (mark >= 80 && mark <= 100) {
        grade = "A+";
        gpa = 5;
    } else {
        grade = "Invalid";
        gpa = "Invalid";
    }
    return {
        grade: grade,
        gpa: gpa,
    };
}; // ends getResult function



const getFinalresult = (markes) => {
    let cgpa;
    let result;

    totalcgpa = getResult(markes.bangla).gpa +
        getResult(markes.english).gpa +
        getResult(markes.math).gpa +
        getResult(markes.social_science).gpa +
        getResult(markes.science).gpa +
        getResult(markes.reigion).gpa;

    cgpa = totalcgpa / 6

    if (markes.bangla >= 33 &&
        markes.english >= 33 &&
        markes.math >= 33 &&
        markes.social_science >= 33 &&
        markes.science >= 33 &&
        markes.reigion >= 33
    ) {

        if (cgpa >= 1 && cgpa < 2) {
            result = "D";
        } else if (cgpa >= 2 && cgpa < 3) {
            result = "C";
        } else if (cgpa >= 3 && cgpa < 4) {
            result = "B";
        } else if (cgpa >= 3.5 && cgpa < 4) {
            result = "A_";
        } else if (cgpa >= 4 && cgpa < 5) {
            result = "A";
        } else if (cgpa >= 5) {
            result = "A+";
        } else {
            result = "Invalid"
        }
        return {
            cgpa: cgpa,
            result: result
        }

    } else {
        return {
            result: "F",
            cgpa: cgpa,
        };
    }


}