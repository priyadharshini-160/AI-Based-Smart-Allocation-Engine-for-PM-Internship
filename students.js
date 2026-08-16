document.addEventListener("DOMContentLoaded", function () {

    if (!checkLogin()) {
        return;
    }

    const user = getCurrentUser();

    if (!user || user.role !== "student") {

        window.location.href = "dashboard.html";

        return;
    }


    const form =
        document.getElementById("studentForm");


    document.getElementById("studentName").value =
        user.name;

    document.getElementById("studentEmail").value =
        user.email;


    /* LOAD EXISTING PROFILE */

    const students = getStudents();

    const existingStudent =
        students.find(function (student) {

            return student.userId === user.id;

        });


    if (existingStudent) {

        document.getElementById("department").value =
            existingStudent.department;

        document.getElementById("cgpa").value =
            existingStudent.cgpa;

        document.getElementById("skills").value =
            existingStudent.skills;

        document.getElementById("domain").value =
            existingStudent.domain;

        document.getElementById("location").value =
            existingStudent.location;

        document.getElementById("experience").value =
            existingStudent.experience;

    }


    /* SAVE */

    form.addEventListener("submit", function (event) {

        event.preventDefault();


        const students = getStudents();


        const student = {

            id: existingStudent
                ? existingStudent.id
                : generateId("student"),

            userId: user.id,

            name: user.name,

            email: user.email,

            department:
                document.getElementById("department")
                .value.trim(),

            cgpa:
                Number(
                    document.getElementById("cgpa")
                    .value
                ),

            skills:
                document.getElementById("skills")
                .value.trim(),

            domain:
                document.getElementById("domain")
                .value.trim(),

            location:
                document.getElementById("location")
                .value.trim(),

            experience:
                document.getElementById("experience")
                .value,

            updatedAt:
                new Date().toISOString()

        };


        if (existingStudent) {

            const index =
                students.findIndex(function (item) {

                    return item.id === existingStudent.id;

                });

            students[index] = student;

        } else {

            students.push(student);

        }


        saveStudents(students);


        showStudentMessage(
            "Student profile saved successfully!",
            "success"
        );

    });

});


function showStudentMessage(text, type) {

    const message =
        document.getElementById("studentMessage");

    message.textContent = text;

    message.className =
        "message " + type;

}