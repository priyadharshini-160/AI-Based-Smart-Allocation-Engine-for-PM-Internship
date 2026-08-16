/* =========================================================
   AI SMART ALLOCATION - allocation.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    console.log("allocation.js loaded successfully");

    setupAllocationButton();
    displayExistingAllocations();

});


/* =========================================================
   GET LOCAL STORAGE DATA
   ========================================================= */

function getArray(key) {

    try {

        const data = localStorage.getItem(key);

        if (!data) {
            return [];
        }

        const parsed = JSON.parse(data);

        return Array.isArray(parsed) ? parsed : [];

    } catch (error) {

        console.error("Error reading " + key, error);

        return [];

    }

}


/* =========================================================
   SET LOCAL STORAGE DATA
   ========================================================= */

function saveArray(key, data) {

    localStorage.setItem(
        key,
        JSON.stringify(data)
    );

}


/* =========================================================
   FIND THE BUTTON
   ========================================================= */

function setupAllocationButton() {

    const buttons = document.querySelectorAll("button");

    buttons.forEach(function (button) {

        const text =
            button.textContent
                .trim()
                .toLowerCase();

        if (
            text.includes("find best matches") ||
            text.includes("best matches") ||
            text.includes("find matches")
        ) {

            button.type = "button";

            button.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    console.log(
                        "Find Best Matches button clicked"
                    );

                    generateAllocations();

                }
            );

        }

    });

}


/* =========================================================
   NORMALIZE TEXT
   ========================================================= */

function normalize(value) {

    if (
        value === null ||
        value === undefined
    ) {
        return "";
    }

    return String(value)
        .trim()
        .toLowerCase();

}


/* =========================================================
   GET SKILLS
   ========================================================= */

function getSkills(value) {

    if (Array.isArray(value)) {

        return value
            .map(function (skill) {
                return normalize(skill);
            })
            .filter(Boolean);

    }

    if (!value) {
        return [];
    }

    return String(value)
        .split(/[,;|]/)
        .map(function (skill) {
            return normalize(skill);
        })
        .filter(Boolean);

}


/* =========================================================
   STUDENT SKILLS
   ========================================================= */

function studentSkills(student) {

    return getSkills(
        student.skills ||
        student.skill ||
        student.technicalSkills ||
        student.studentSkills ||
        ""
    );

}


/* =========================================================
   INTERNSHIP SKILLS
   ========================================================= */

function internshipSkills(internship) {

    return getSkills(
        internship.requiredSkills ||
        internship.skills ||
        internship.skillRequirements ||
        internship.requiredSkill ||
        ""
    );

}


/* =========================================================
   MATCH SCORE
   ========================================================= */

function calculateScore(student, internship) {

    const sSkills =
        studentSkills(student);

    const iSkills =
        internshipSkills(internship);


    let matchedSkills = 0;


    iSkills.forEach(function (requiredSkill) {

        const found =
            sSkills.some(function (studentSkill) {

                return (
                    studentSkill === requiredSkill ||
                    studentSkill.includes(requiredSkill) ||
                    requiredSkill.includes(studentSkill)
                );

            });


        if (found) {
            matchedSkills++;
        }

    });


    let skillScore = 0;


    if (iSkills.length > 0) {

        skillScore =
            (matchedSkills / iSkills.length) * 60;

    }


    /* DOMAIN */

    const studentDomain =
        normalize(
            student.preferredDomain ||
            student.domain ||
            student.interest ||
            ""
        );


    const internshipDomain =
        normalize(
            internship.domain ||
            internship.category ||
            ""
        );


    let domainScore = 0;


    if (
        studentDomain &&
        internshipDomain &&
        (
            studentDomain === internshipDomain ||
            studentDomain.includes(internshipDomain) ||
            internshipDomain.includes(studentDomain)
        )
    ) {

        domainScore = 20;

    }


    /* LOCATION */

    const studentLocation =
        normalize(
            student.preferredLocation ||
            student.location ||
            ""
        );


    const internshipLocation =
        normalize(
            internship.location ||
            internship.city ||
            ""
        );


    let locationScore = 0;


    if (
        studentLocation &&
        internshipLocation &&
        (
            studentLocation === internshipLocation ||
            studentLocation.includes(internshipLocation) ||
            internshipLocation.includes(studentLocation)
        )
    ) {

        locationScore = 10;

    }


    /* CGPA */

    const cgpa =
        parseFloat(
            student.cgpa ||
            student.CGPA ||
            0
        );


    let cgpaScore = 0;


    if (cgpa >= 8.5) {

        cgpaScore = 10;

    } else if (cgpa >= 7.5) {

        cgpaScore = 8;

    } else if (cgpa >= 6.5) {

        cgpaScore = 6;

    } else if (cgpa >= 5.5) {

        cgpaScore = 4;

    }


    const total =
        Math.min(
            100,
            Math.round(
                skillScore +
                domainScore +
                locationScore +
                cgpaScore
            )
        );


    return total;

}


/* =========================================================
   GENERATE ALLOCATIONS
   ========================================================= */

function generateAllocations() {

    const students =
        getArray("students");


    const internships =
        getArray("internships");


    console.log(
        "Students:",
        students
    );


    console.log(
        "Internships:",
        internships
    );


    if (students.length === 0) {

        alert(
            "No students found. Please add students first."
        );

        return;

    }


    if (internships.length === 0) {

        alert(
            "No internships found. Please add internships first."
        );

        return;

    }


    const allocations = [];


    const usedInternships =
        new Set();


    students.forEach(function (student) {

        let bestInternship = null;

        let bestScore = -1;


        internships.forEach(function (internship) {

            const internshipId =
                String(
                    internship.id ||
                    internship.internshipId ||
                    internship.title ||
                    internship.internshipTitle ||
                    Math.random()
                );


            if (
                usedInternships.has(internshipId)
            ) {

                return;

            }


            const score =
                calculateScore(
                    student,
                    internship
                );


            if (score > bestScore) {

                bestScore = score;

                bestInternship = {
                    data: internship,
                    id: internshipId
                };

            }

        });


        /*
         * Allocate when score is 50 or above.
         */

        if (
            bestInternship &&
            bestScore >= 50
        ) {

            const internship =
                bestInternship.data;


            const allocation = {

                id:
                    "ALLOC_" +
                    Date.now() +
                    "_" +
                    Math.random()
                        .toString(36)
                        .substring(2, 8),

                studentId:
                    student.studentId ||
                    student.id ||
                    student.email ||
                    "",

                studentName:
                    student.name ||
                    student.fullName ||
                    student.studentName ||
                    "Student",

                studentEmail:
                    student.email ||
                    student.studentEmail ||
                    "",

                companyName:
                    internship.companyName ||
                    internship.company ||
                    "Company",

                internshipId:
                    internship.id ||
                    internship.internshipId ||
                    "",

                internshipTitle:
                    internship.title ||
                    internship.internshipTitle ||
                    internship.name ||
                    "Internship",

                domain:
                    internship.domain ||
                    internship.category ||
                    "",

                location:
                    internship.location ||
                    internship.city ||
                    "",

                score:
                    bestScore,

                matchScore:
                    bestScore,

                status:
                    "Allocated",

                allocatedAt:
                    new Date().toISOString()

            };


            allocations.push(
                allocation
            );


            usedInternships.add(
                bestInternship.id
            );

        }

    });


    /*
     * SAVE ALLOCATIONS
     */

    saveArray(
        "allocations",
        allocations
    );


    /*
     * SAVE PREDICTIONS FOR COMPATIBILITY
     */

    const predictions =
        allocations.map(function (item) {

            return {

                id: item.id,

                studentId:
                    item.studentId,

                studentName:
                    item.studentName,

                studentEmail:
                    item.studentEmail,

                companyName:
                    item.companyName,

                internshipTitle:
                    item.internshipTitle,

                score:
                    item.score,

                matchScore:
                    item.matchScore,

                status:
                    item.status,

                allocated: true

            };

        });


    saveArray(
        "predictions",
        predictions
    );


    console.log(
        "Allocations created:",
        allocations
    );


    if (allocations.length > 0) {

        alert(
            allocations.length +
            " allocation(s) generated successfully!"
        );

    } else {

        alert(
            "No suitable matches found. Check student skills and internship requirements."
        );

    }


    /*
     * Show recommendations immediately
     */

    displayAllocations();

}


/* =========================================================
   DISPLAY ALLOCATIONS ON AI PAGE
   ========================================================= */

function displayAllocations() {

    const allocations =
        getArray("allocations");


    /*
     * Find a suitable result area.
     */

    let container =
        document.getElementById(
            "allocationResults"
        );


    if (!container) {

        container =
            document.getElementById(
                "recommendations"
            );

    }


    if (!container) {

        container =
            document.getElementById(
                "recommendationsContainer"
            );

    }


    /*
     * If the page doesn't have a result container,
     * create one below the button.
     */

    if (!container) {

        const heading =
            Array.from(
                document.querySelectorAll("h1,h2,h3")
            ).find(function (element) {

                return element.textContent
                    .toLowerCase()
                    .includes("recommendation");

            });


        if (heading) {

            container =
                document.createElement("div");

            container.id =
                "allocationResults";

            container.style.marginTop =
                "30px";

            heading.parentElement
                .appendChild(container);

        }

    }


    if (!container) {

        return;

    }


    if (allocations.length === 0) {

        container.innerHTML = `
            <div style="
                padding:30px;
                text-align:center;
                border-radius:20px;
                background:rgba(120,90,255,0.10);
            ">
                <h3>No allocations yet</h3>
                <p>
                    Click "Find Best Matches" to generate
                    AI recommendations.
                </p>
            </div>
        `;

        return;

    }


    let html = `

        <div>

            <h2 style="
                margin-bottom:20px;
            ">
                🤖 AI Recommended Matches
            </h2>

    `;


    allocations.forEach(function (item) {

        html += `

            <div style="
                padding:25px;
                margin-bottom:18px;
                border-radius:20px;
                background:linear-gradient(
                    135deg,
                    #e7dcff,
                    #d8edff
                );
                border:1px solid #8b6cff;
            ">

                <h3>
                    🎓 ${escapeHTML(item.studentName)}
                </h3>

                <p>
                    🏢 <strong>Company:</strong>
                    ${escapeHTML(item.companyName)}
                </p>

                <p>
                    💼 <strong>Internship:</strong>
                    ${escapeHTML(item.internshipTitle)}
                </p>

                <p>
                    📍 <strong>Location:</strong>
                    ${escapeHTML(item.location || "-")}
                </p>

                <p>
                    🎯 <strong>AI Match Score:</strong>
                    ${item.score}%
                </p>

                <strong style="
                    display:inline-block;
                    padding:8px 16px;
                    border-radius:20px;
                    background:#673de6;
                    color:white;
                ">
                    ✓ ${item.status}
                </strong>

            </div>

        `;

    });


    html += `</div>`;


    container.innerHTML =
        html;

}


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHTML(value) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }


    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================================
   GLOBAL FUNCTION
   This allows HTML onclick="findBestMatches()"
   to work too.
   ========================================================= */

window.findBestMatches =
    function () {

        generateAllocations();

    };


window.allocateStudents =
    function () {

        generateAllocations();

    };