document.addEventListener("DOMContentLoaded", function () {
    const user = getCurrentUser();

    if (!user) {
        window.location.href = "index.html";
        return;
    }

    const userName = document.getElementById("userName");
    const welcomeName = document.getElementById("welcomeName");
    const userRole = document.getElementById("userRole");

    if (userName) userName.textContent = user.name || "";
    if (welcomeName) welcomeName.textContent = user.name || "";
    if (userRole) {
        userRole.textContent =
            user.role === "company" ? "COMPANY" : "STUDENT";
    }

    if (user.role === "student") {
        document.querySelectorAll(".company-only").forEach(function (el) {
            el.style.display = "none";
        });
    }

    if (user.role === "company") {
        document.querySelectorAll(".student-only").forEach(function (el) {
            el.style.display = "none";
        });
    }

    const studentCount = document.getElementById("studentCount");
    const companyCount = document.getElementById("companyCount");
    const internshipCount = document.getElementById("internshipCount");
    const allocationCount = document.getElementById("allocationCount");

    if (studentCount) studentCount.textContent = getStudents().length;
    if (companyCount) companyCount.textContent = getCompanies().length;
    if (internshipCount) internshipCount.textContent = getInternships().length;
    if (allocationCount) allocationCount.textContent = getAllocations().length;
});
