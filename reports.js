document.addEventListener("DOMContentLoaded", function () {

    if (!checkLogin()) {
        return;
    }


    const user =
        getCurrentUser();


    if (user.role === "student") {

        document.querySelectorAll(".company-only")
            .forEach(function (element) {
                element.style.display = "none";
            });

    }


    if (user.role === "company") {

        document.querySelectorAll(".student-only")
            .forEach(function (element) {
                element.style.display = "none";
            });

    }


    loadReports();

});


function loadReports() {

    const user =
        getCurrentUser();


    const students =
        getStudents();


    const internships =
        getInternships();


    let allocations =
        getAllocations();


    /* STUDENT SEES OWN */

    if (user.role === "student") {

        const student =
            students.find(function (item) {

                return item.userId === user.id;

            });


        if (student) {

            allocations =
                allocations.filter(
                    function (allocation) {

                        return (
                            allocation.studentId
                            === student.id
                        );

                    }
                );

        } else {

            allocations = [];

        }

    }


    /* COMPANY SEES OWN */

    if (user.role === "company") {

        const companies =
            getCompanies();


        const company =
            companies.find(function (item) {

                return item.userId === user.id;

            });


        if (company) {

            allocations =
                allocations.filter(
                    function (allocation) {

                        return (
                            allocation.companyId
                            === company.id
                        );

                    }
                );

        } else {

            allocations = [];

        }

    }


    document.getElementById(
        "reportStudents"
    ).textContent =
        students.length;


    document.getElementById(
        "reportInternships"
    ).textContent =
        internships.length;


    document.getElementById(
        "reportAllocations"
    ).textContent =
        allocations.length;


    displayReportTable(
        allocations
    );

}


function displayReportTable(
    allocations
) {

    const container =
        document.getElementById(
            "reportTableContainer"
        );


    if (allocations.length === 0) {

        container.innerHTML = `
            <div class="empty-state">
                <h3>No allocations yet</h3>
                <p>
                    AI allocation results will appear here.
                </p>
            </div>
        `;

        return;

    }


    let html = `

        <div class="table-wrapper">

            <table>

                <thead>

                    <tr>

                        <th>Student</th>

                        <th>Internship</th>

                        <th>Company</th>

                        <th>AI Score</th>

                        <th>Status</th>

                    </tr>

                </thead>

                <tbody>

    `;


    allocations.forEach(
        function (allocation) {

            html += `

                <tr>

                    <td>
                        ${escapeHTML(
                            allocation.studentName
                        )}
                    </td>

                    <td>
                        ${escapeHTML(
                            allocation.internshipTitle
                        )}
                    </td>

                    <td>
                        ${escapeHTML(
                            allocation.companyName
                        )}
                    </td>

                    <td>
                        <strong>
                            ${allocation.score}%
                        </strong>
                    </td>

                    <td>

                        <span class="status-success">
                            ${escapeHTML(
                                allocation.status
                            )}
                        </span>

                    </td>

                </tr>

            `;

        }
    );


    html += `

                </tbody>

            </table>

        </div>

    `;


    container.innerHTML = html;

}


function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}