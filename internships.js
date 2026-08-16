document.addEventListener("DOMContentLoaded", function () {

    if (!checkLogin()) {
        return;
    }

    const user = getCurrentUser();


    /* ROLE CONTROL */

    if (user.role === "company") {

        document.getElementById(
            "internshipFormSection"
        ).style.display = "block";

        document.querySelectorAll(".student-only")
            .forEach(function (element) {
                element.style.display = "none";
            });

    }


    if (user.role === "student") {

        document.querySelectorAll(".company-only")
            .forEach(function (element) {
                element.style.display = "none";
            });

    }


    loadInternships();


    /* COMPANY ADD INTERNSHIP */

    const form =
        document.getElementById("internshipForm");


    if (form) {

        form.addEventListener("submit", function (event) {

            event.preventDefault();


            const companies = getCompanies();


            const company =
                companies.find(function (item) {

                    return item.userId === user.id;

                });


            if (!company) {

                showInternshipMessage(
                    "Please create your company profile first.",
                    "error"
                );

                return;

            }


            const internships =
                getInternships();


            const internship = {

                id: generateId("internship"),

                companyId: company.id,

                companyName: company.name,

                title:
                    document.getElementById(
                        "internshipTitle"
                    ).value.trim(),

                domain:
                    document.getElementById(
                        "internshipDomain"
                    ).value.trim(),

                requiredSkills:
                    document.getElementById(
                        "requiredSkills"
                    ).value.trim(),

                location:
                    document.getElementById(
                        "internshipLocation"
                    ).value.trim(),

                duration:
                    document.getElementById(
                        "duration"
                    ).value.trim(),

                stipend:
                    Number(
                        document.getElementById(
                            "stipend"
                        ).value
                    ),

                minimumCgpa:
                    Number(
                        document.getElementById(
                            "minimumCgpa"
                        ).value
                    ),

                createdAt:
                    new Date().toISOString()

            };


            internships.push(internship);

            saveInternships(internships);


            showInternshipMessage(
                "Internship added successfully!",
                "success"
            );


            form.reset();


            loadInternships();

        });

    }

});


function loadInternships() {

    const internships =
        getInternships();


    const container =
        document.getElementById(
            "internshipList"
        );


    if (!container) {
        return;
    }


    if (internships.length === 0) {

        container.innerHTML = `
            <div class="empty-state">
                <h3>No internships available</h3>
                <p>
                    Companies can add internship opportunities here.
                </p>
            </div>
        `;

        return;

    }


    container.innerHTML = "";


    internships.forEach(function (internship) {

        const card =
            document.createElement("div");

        card.className =
            "internship-card";


        card.innerHTML = `

            <div class="internship-header">

                <div>

                    <h3>
                        ${escapeHTML(internship.title)}
                    </h3>

                    <p>
                        🏢 ${escapeHTML(internship.companyName)}
                    </p>

                </div>

                <span class="domain-badge">
                    ${escapeHTML(internship.domain)}
                </span>

            </div>


            <div class="internship-details">

                <span>
                    📍 ${escapeHTML(internship.location)}
                </span>

                <span>
                    ⏱ ${escapeHTML(internship.duration)}
                </span>

                <span>
                    💰 ₹${internship.stipend}
                </span>

                <span>
                    🎓 CGPA ${internship.minimumCgpa}+
                </span>

            </div>


            <p class="skills-text">

                <strong>Required Skills:</strong>

                ${escapeHTML(internship.requiredSkills)}

            </p>

        `;


        container.appendChild(card);

    });

}


function showInternshipMessage(
    text,
    type
) {

    const message =
        document.getElementById(
            "internshipMessage"
        );


    if (!message) {
        return;
    }


    message.textContent = text;

    message.className =
        "message " + type;

}


/* SECURITY */

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}