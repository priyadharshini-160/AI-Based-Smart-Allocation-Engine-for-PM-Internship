/* =========================================================
   AI SMART ALLOCATION ENGINE
   reports.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    console.log("Reports page loaded");

    loadReports();

});


/* =========================================================
   GET ARRAY FROM LOCAL STORAGE
   ========================================================= */

function getReportArray(key) {

    try {

        const data = localStorage.getItem(key);

        if (!data) {
            return [];
        }

        const parsed = JSON.parse(data);

        return Array.isArray(parsed) ? parsed : [];

    } catch (error) {

        console.error(
            "Error reading " + key + ":",
            error
        );

        return [];

    }

}


/* =========================================================
   LOAD REPORTS
   ========================================================= */

function loadReports() {

    const students =
        getReportArray("students");

    const internships =
        getReportArray("internships");

    const allocations =
        getReportArray("allocations");


    console.log("Students:", students);

    console.log("Internships:", internships);

    console.log("Allocations:", allocations);


    /* =====================================================
       UPDATE SUMMARY CARDS
       ===================================================== */

    const studentCount =
        document.getElementById(
            "reportStudents"
        );

    const internshipCount =
        document.getElementById(
            "reportInternships"
        );

    const allocationCount =
        document.getElementById(
            "reportAllocations"
        );


    if (studentCount) {

        studentCount.textContent =
            students.length;

    }


    if (internshipCount) {

        internshipCount.textContent =
            internships.length;

    }


    if (allocationCount) {

        allocationCount.textContent =
            allocations.length;

    }


    /* =====================================================
       DISPLAY ALLOCATION TABLE
       ===================================================== */

    displayReportTable(
        allocations
    );

}


/* =========================================================
   DISPLAY REPORT TABLE
   ========================================================= */

function displayReportTable(allocations) {

    const container =
        document.getElementById(
            "reportTableContainer"
        );


    if (!container) {

        console.error(
            "reportTableContainer not found."
        );

        return;

    }


    /* =====================================================
       NO ALLOCATIONS
       ===================================================== */

    if (
        !Array.isArray(allocations) ||
        allocations.length === 0
    ) {

        container.innerHTML = `

            <div class="empty-state">

                <h3>
                    No allocations yet
                </h3>

                <p>
                    AI allocation results will appear here.
                </p>

            </div>

        `;

        return;

    }


    /* =====================================================
       ALLOCATION TABLE
       ===================================================== */

    let html = `

        <div class="table-wrapper">

            <table>

                <thead>

                    <tr>

                        <th>
                            Student
                        </th>

                        <th>
                            Internship
                        </th>

                        <th>
                            Company
                        </th>

                        <th>
                            AI Score
                        </th>

                        <th>
                            Status
                        </th>

                    </tr>

                </thead>

                <tbody>

    `;


    allocations.forEach(function (allocation) {

        const studentName =
            allocation.studentName ||
            allocation.name ||
            "Student";


        const internshipTitle =
            allocation.internshipTitle ||
            allocation.title ||
            allocation.internshipName ||
            "Internship";


        const companyName =
            allocation.companyName ||
            allocation.company ||
            "Company";


        const score =
            allocation.score ??
            allocation.matchScore ??
            0;


        const status =
            allocation.status ||
            "Allocated";


        html += `

            <tr>

                <td>
                    ${escapeReportHTML(
                        studentName
                    )}
                </td>

                <td>
                    ${escapeReportHTML(
                        internshipTitle
                    )}
                </td>

                <td>
                    ${escapeReportHTML(
                        companyName
                    )}
                </td>

                <td>

                    <strong>
                        ${score}%
                    </strong>

                </td>

                <td>

                    <span class="status-success">

                        ${escapeReportHTML(
                            status
                        )}

                    </span>

                </td>

            </tr>

        `;

    });


    html += `

                </tbody>

            </table>

        </div>

    `;


    container.innerHTML =
        html;

}


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeReportHTML(value) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }


    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}
