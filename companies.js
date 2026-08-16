document.addEventListener("DOMContentLoaded", function () {

    if (!checkLogin()) {
        return;
    }

    const user = getCurrentUser();

    if (!user || user.role !== "company") {

        window.location.href = "dashboard.html";

        return;
    }


    document.getElementById("companyEmail").value =
        user.email;


    document.getElementById("companyName").value =
        user.name;


    const companies = getCompanies();


    const existingCompany =
        companies.find(function (company) {

            return company.userId === user.id;

        });


    if (existingCompany) {

        document.getElementById("companyName").value =
            existingCompany.name;

        document.getElementById("industry").value =
            existingCompany.industry;

        document.getElementById("companyLocation").value =
            existingCompany.location;

        document.getElementById("companySize").value =
            existingCompany.size;

        document.getElementById("website").value =
            existingCompany.website || "";

    }


    document.getElementById("companyForm")
        .addEventListener("submit", function (event) {

            event.preventDefault();


            const companies = getCompanies();


            const company = {

                id: existingCompany
                    ? existingCompany.id
                    : generateId("company"),

                userId: user.id,

                name:
                    document.getElementById("companyName")
                    .value.trim(),

                email: user.email,

                industry:
                    document.getElementById("industry")
                    .value.trim(),

                location:
                    document.getElementById("companyLocation")
                    .value.trim(),

                size:
                    document.getElementById("companySize")
                    .value,

                website:
                    document.getElementById("website")
                    .value.trim(),

                updatedAt:
                    new Date().toISOString()

            };


            if (existingCompany) {

                const index =
                    companies.findIndex(function (item) {

                        return item.id === existingCompany.id;

                    });

                companies[index] = company;

            } else {

                companies.push(company);

            }


            saveCompanies(companies);


            showCompanyMessage(
                "Company profile saved successfully!",
                "success"
            );

        });

});


function showCompanyMessage(text, type) {

    const message =
        document.getElementById("companyMessage");

    message.textContent = text;

    message.className =
        "message " + type;

}