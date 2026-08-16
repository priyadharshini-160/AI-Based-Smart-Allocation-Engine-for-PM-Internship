/* ============================================================
   AI-BASED SMART ALLOCATION ENGINE
   common.js

   Common functions used by:
   - Login
   - Registration
   - Dashboard
   - Student Profile
   - Company Profile
   - Internships
   - AI Allocation
   - Reports

   Storage:
   - LocalStorage
============================================================ */


/* ============================================================
   1. LOCAL STORAGE KEYS
============================================================ */

const USERS_KEY = "users";

const STUDENTS_KEY = "students";

const COMPANIES_KEY = "companies";

const INTERNSHIPS_KEY = "internships";

const ALLOCATIONS_KEY = "allocations";

const CURRENT_USER_KEY = "currentUser";

const LOGIN_STATUS_KEY = "isLoggedIn";


/* ============================================================
   2. ID GENERATOR
============================================================ */

function generateId(prefix = "id") {

    return (
        prefix +
        "_" +
        Date.now() +
        "_" +
        Math.random()
            .toString(36)
            .substring(2, 9)
    );

}


/* ============================================================
   3. USERS
============================================================ */

/*
   Get all registered users
*/

function getUsers() {

    try {

        const data =
            localStorage.getItem(USERS_KEY);

        if (!data) {
            return [];
        }

        const users =
            JSON.parse(data);

        return Array.isArray(users)
            ? users
            : [];

    } catch (error) {

        console.error(
            "Error reading users:",
            error
        );

        return [];

    }

}


/*
   Save all users
*/

function saveUsers(users) {

    if (!Array.isArray(users)) {

        console.error(
            "saveUsers() expects an array."
        );

        return;

    }

    localStorage.setItem(
        USERS_KEY,
        JSON.stringify(users)
    );

}


/*
   Find user by email
*/

function findUserByEmail(email) {

    if (!email) {
        return null;
    }

    const normalizedEmail =
        email
            .trim()
            .toLowerCase();


    const users =
        getUsers();


    return users.find(
        function (user) {

            return (
                user.email &&
                user.email
                    .trim()
                    .toLowerCase()
                    === normalizedEmail
            );

        }
    ) || null;

}


/* ============================================================
   4. CURRENT USER
============================================================ */

/*
   Save currently logged-in user
*/

function setCurrentUser(user) {

    if (!user) {
        return;
    }

    localStorage.setItem(
        CURRENT_USER_KEY,
        JSON.stringify(user)
    );

    localStorage.setItem(
        LOGIN_STATUS_KEY,
        "true"
    );

}


/*
   Get currently logged-in user
*/

function getCurrentUser() {

    try {

        const data =
            localStorage.getItem(
                CURRENT_USER_KEY
            );

        if (!data) {
            return null;
        }

        return JSON.parse(data);

    } catch (error) {

        console.error(
            "Error reading current user:",
            error
        );

        return null;

    }

}


/*
   Check whether a user is logged in
*/

function isLoggedIn() {

    const user =
        getCurrentUser();

    return user !== null;

}


/*
   Logout
*/

function logout() {

    localStorage.removeItem(
        CURRENT_USER_KEY
    );

    localStorage.removeItem(
        LOGIN_STATUS_KEY
    );

    window.location.href =
        "index.html";

}


/* ============================================================
   5. LOGIN PROTECTION
============================================================ */

/*
   Use this on pages that require login.

   Example:

   document.addEventListener("DOMContentLoaded", function () {
       if (!checkLogin()) return;
   });
*/

function checkLogin() {

    const user =
        getCurrentUser();


    if (!user) {

        window.location.href =
            "index.html";

        return false;

    }


    return true;

}


/* ============================================================
   6. ROLE CHECKING
============================================================ */

/*
   Check whether current user is a student
*/

function isStudent() {

    const user =
        getCurrentUser();

    return (
        user &&
        user.role === "student"
    );

}


/*
   Check whether current user is a company
*/

function isCompany() {

    const user =
        getCurrentUser();

    return (
        user &&
        user.role === "company"
    );

}


/*
   Get current user's role
*/

function getCurrentUserRole() {

    const user =
        getCurrentUser();

    if (!user) {
        return null;
    }

    return user.role || null;

}


/* ============================================================
   7. STUDENTS
============================================================ */

/*
   Get all students
*/

function getStudents() {

    try {

        const data =
            localStorage.getItem(
                STUDENTS_KEY
            );

        if (!data) {
            return [];
        }

        const students =
            JSON.parse(data);

        return Array.isArray(students)
            ? students
            : [];

    } catch (error) {

        console.error(
            "Error reading students:",
            error
        );

        return [];

    }

}


/*
   Save students
*/

function saveStudents(students) {

    if (!Array.isArray(students)) {

        console.error(
            "saveStudents() expects an array."
        );

        return;

    }

    localStorage.setItem(
        STUDENTS_KEY,
        JSON.stringify(students)
    );

}


/*
   Find student using email
*/

function findStudentByEmail(email) {

    if (!email) {
        return null;
    }


    const normalizedEmail =
        email
            .trim()
            .toLowerCase();


    const students =
        getStudents();


    return students.find(
        function (student) {

            return (
                student.email &&
                student.email
                    .trim()
                    .toLowerCase()
                    === normalizedEmail
            );

        }
    ) || null;

}


/*
   Find student using ID
*/

function findStudentById(id) {

    if (!id) {
        return null;
    }


    const students =
        getStudents();


    return students.find(
        function (student) {

            return student.id === id;

        }
    ) || null;

}


/* ============================================================
   8. COMPANIES
============================================================ */

/*
   Get all companies
*/

function getCompanies() {

    try {

        const data =
            localStorage.getItem(
                COMPANIES_KEY
            );

        if (!data) {
            return [];
        }

        const companies =
            JSON.parse(data);

        return Array.isArray(companies)
            ? companies
            : [];

    } catch (error) {

        console.error(
            "Error reading companies:",
            error
        );

        return [];

    }

}


/*
   Save companies
*/

function saveCompanies(companies) {

    if (!Array.isArray(companies)) {

        console.error(
            "saveCompanies() expects an array."
        );

        return;

    }

    localStorage.setItem(
        COMPANIES_KEY,
        JSON.stringify(companies)
    );

}


/*
   Find company using email
*/

function findCompanyByEmail(email) {

    if (!email) {
        return null;
    }


    const normalizedEmail =
        email
            .trim()
            .toLowerCase();


    const companies =
        getCompanies();


    return companies.find(
        function (company) {

            return (
                company.email &&
                company.email
                    .trim()
                    .toLowerCase()
                    === normalizedEmail
            );

        }
    ) || null;

}


/*
   Find company using ID
*/

function findCompanyById(id) {

    if (!id) {
        return null;
    }


    const companies =
        getCompanies();


    return companies.find(
        function (company) {

            return company.id === id;

        }
    ) || null;

}


/* ============================================================
   9. INTERNSHIPS
============================================================ */

/*
   Get all internships
*/

function getInternships() {

    try {

        const data =
            localStorage.getItem(
                INTERNSHIPS_KEY
            );

        if (!data) {
            return [];
        }

        const internships =
            JSON.parse(data);

        return Array.isArray(internships)
            ? internships
            : [];

    } catch (error) {

        console.error(
            "Error reading internships:",
            error
        );

        return [];

    }

}


/*
   Save internships
*/

function saveInternships(internships) {

    if (!Array.isArray(internships)) {

        console.error(
            "saveInternships() expects an array."
        );

        return;

    }

    localStorage.setItem(
        INTERNSHIPS_KEY,
        JSON.stringify(internships)
    );

}


/*
   Find internship by ID
*/

function findInternshipById(id) {

    if (!id) {
        return null;
    }


    const internships =
        getInternships();


    return internships.find(
        function (internship) {

            return internship.id === id;

        }
    ) || null;

}


/*
   Get internships belonging to a company
*/

function getCompanyInternships(companyId) {

    if (!companyId) {
        return [];

    }


    const internships =
        getInternships();


    return internships.filter(
        function (internship) {

            return (
                internship.companyId
                === companyId
            );

        }
    );

}


/* ============================================================
   10. ALLOCATIONS
============================================================ */

/*
   Get all allocations
*/

function getAllocations() {

    try {

        const data =
            localStorage.getItem(
                ALLOCATIONS_KEY
            );

        if (!data) {
            return [];
        }

        const allocations =
            JSON.parse(data);

        return Array.isArray(allocations)
            ? allocations
            : [];

    } catch (error) {

        console.error(
            "Error reading allocations:",
            error
        );

        return [];

    }

}


/*
   Save allocations
*/

function saveAllocations(allocations) {

    if (!Array.isArray(allocations)) {

        console.error(
            "saveAllocations() expects an array."
        );

        return;

    }

    localStorage.setItem(
        ALLOCATIONS_KEY,
        JSON.stringify(allocations)
    );

}


/* ============================================================
   11. GET STUDENT ALLOCATIONS
============================================================ */

function getStudentAllocations(studentId) {

    if (!studentId) {
        return [];
    }


    const allocations =
        getAllocations();


    return allocations.filter(
        function (allocation) {

            return (
                allocation.studentId
                === studentId
            );

        }
    );

}


/* ============================================================
   12. GET COMPANY ALLOCATIONS
============================================================ */

function getCompanyAllocations(companyId) {

    if (!companyId) {
        return [];
    }


    const allocations =
        getAllocations();


    return allocations.filter(
        function (allocation) {

            return (
                allocation.companyId
                === companyId
            );

        }
    );

}


/* ============================================================
   13. UPDATE CURRENT USER
============================================================ */

/*
   Updates the stored user account.

   This is useful when a student/company
   changes their profile.
*/

function updateCurrentUser(updatedUser) {

    if (!updatedUser) {
        return false;
    }


    const currentUser =
        getCurrentUser();


    if (!currentUser) {
        return false;
    }


    const users =
        getUsers();


    const index =
        users.findIndex(
            function (user) {

                return (
                    user.id
                    === currentUser.id
                );

            }
        );


    if (index === -1) {
        return false;
    }


    users[index] =
        updatedUser;


    saveUsers(users);


    setCurrentUser(
        updatedUser
    );


    return true;

}


/* ============================================================
   14. CREATE STUDENT PROFILE
============================================================ */

function createOrUpdateStudent(studentData) {

    const user =
        getCurrentUser();


    if (!user || user.role !== "student") {

        return false;

    }


    const students =
        getStudents();


    const existingIndex =
        students.findIndex(
            function (student) {

                return (
                    student.userId
                    === user.id
                );

            }
        );


    const student = {

        id:
            existingIndex >= 0
                ? students[existingIndex].id
                : generateId("student"),

        userId:
            user.id,

        name:
            studentData.name
            || user.name
            || "",

        email:
            user.email,

        phone:
            studentData.phone
            || "",

        department:
            studentData.department
            || "",

        college:
            studentData.college
            || "",

        cgpa:
            Number(studentData.cgpa)
            || 0,

        skills:
            studentData.skills
            || "",

        interests:
            studentData.interests
            || "",

        location:
            studentData.location
            || "",

        createdAt:
            existingIndex >= 0
                ? students[existingIndex].createdAt
                : new Date().toISOString(),

        updatedAt:
            new Date().toISOString()

    };


    if (existingIndex >= 0) {

        students[existingIndex] =
            student;

    } else {

        students.push(student);

    }


    saveStudents(students);


    return student;

}


/* ============================================================
   15. CREATE COMPANY PROFILE
============================================================ */

function createOrUpdateCompany(companyData) {

    const user =
        getCurrentUser();


    if (!user || user.role !== "company") {

        return false;

    }


    const companies =
        getCompanies();


    const existingIndex =
        companies.findIndex(
            function (company) {

                return (
                    company.userId
                    === user.id
                );

            }
        );


    const company = {

        id:
            existingIndex >= 0
                ? companies[existingIndex].id
                : generateId("company"),

        userId:
            user.id,

        name:
            companyData.name
            || user.name
            || "",

        email:
            user.email,

        industry:
            companyData.industry
            || "",

        location:
            companyData.location
            || "",

        website:
            companyData.website
            || "",

        description:
            companyData.description
            || "",

        size:
            companyData.size
            || "",

        createdAt:
            existingIndex >= 0
                ? companies[existingIndex].createdAt
                : new Date().toISOString(),

        updatedAt:
            new Date().toISOString()

    };


    if (existingIndex >= 0) {

        companies[existingIndex] =
            company;

    } else {

        companies.push(company);

    }


    saveCompanies(companies);


    return company;

}


/* ============================================================
   16. CURRENT STUDENT PROFILE
============================================================ */

function getCurrentStudent() {

    const user =
        getCurrentUser();


    if (!user || user.role !== "student") {

        return null;

    }


    return findStudentByUserId(
        user.id
    );

}


/*
   Find student using user ID
*/

function findStudentByUserId(userId) {

    if (!userId) {
        return null;
    }


    const students =
        getStudents();


    return students.find(
        function (student) {

            return (
                student.userId
                === userId
            );

        }
    ) || null;

}


/* ============================================================
   17. CURRENT COMPANY PROFILE
============================================================ */

function getCurrentCompany() {

    const user =
        getCurrentUser();


    if (!user || user.role !== "company") {

        return null;

    }


    return findCompanyByUserId(
        user.id
    );

}


/*
   Find company using user ID
*/

function findCompanyByUserId(userId) {

    if (!userId) {
        return null;
    }


    const companies =
        getCompanies();


    return companies.find(
        function (company) {

            return (
                company.userId
                === userId
            );

        }
    ) || null;

}


/* ============================================================
   18. CLEAR PROJECT DATA
============================================================ */

/*
   IMPORTANT:

   This function is ONLY for testing.

   It removes students, companies,
   internships and allocations.

   It does NOT remove registered accounts.
*/

function clearProjectData() {

    localStorage.removeItem(
        STUDENTS_KEY
    );

    localStorage.removeItem(
        COMPANIES_KEY
    );

    localStorage.removeItem(
        INTERNSHIPS_KEY
    );

    localStorage.removeItem(
        ALLOCATIONS_KEY
    );


    console.log(
        "Project data cleared."
    );

}


/*
   Completely reset the application.

   This removes EVERYTHING.

   Use only when testing from the beginning.
*/

function resetEntireApplication() {

    localStorage.clear();

    console.log(
        "Entire application has been reset."
    );

}


/* ============================================================
   19. SAFE TEXT HELPER
============================================================ */

/*
   Prevent HTML injection when displaying
   user-entered values.
*/

function escapeHTML(value) {

    if (value === null ||
        value === undefined) {

        return "";

    }


    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* ============================================================
   20. FORMAT DATE
============================================================ */

function formatDate(dateValue) {

    if (!dateValue) {
        return "-";
    }


    try {

        const date =
            new Date(dateValue);


        return date.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    } catch (error) {

        return "-";

    }

}


/* ============================================================
   21. PAGE INITIALIZATION
============================================================ */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /*
           Add current user information
           to elements having these IDs.
        */

        const user =
            getCurrentUser();


        if (!user) {
            return;
        }


        const nameElement =
            document.getElementById(
                "currentUserName"
            );


        if (nameElement) {

            nameElement.textContent =
                user.name || "";

        }


        const emailElement =
            document.getElementById(
                "currentUserEmail"
            );


        if (emailElement) {

            emailElement.textContent =
                user.email || "";

        }


        const roleElement =
            document.getElementById(
                "currentUserRole"
            );


        if (roleElement) {

            roleElement.textContent =
                user.role === "company"
                    ? "Company"
                    : "Student";

        }

    }
);

/* Compatibility helper */
function requireLogin() {
    const user = getCurrentUser();

    if (!user) {
        window.location.href = "index.html";
        return null;
    }

    return user;
}
