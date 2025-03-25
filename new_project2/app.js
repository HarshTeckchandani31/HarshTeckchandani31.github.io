// Fetch Projects from JSON (projects.json) and display them
document.addEventListener('DOMContentLoaded', function() {
    fetch('projects.json')
        .then(response => response.json())
        .then(data => {
            const projectList = document.getElementById('project-list');
            data.projects.forEach(project => {
                const projectCard = `
                    <div class="col-md-4">
                        <div class="card">
                            <img src="${project.image}" class="card-img-top" alt="${project.name}">
                            <div class="card-body">
                                <h5 class="card-title">${project.name}</h5>
                                <p class="card-text">${project.description}</p>
                                <a href="${project.link}" class="btn btn-primary">View Project</a>
                            </div>
                        </div>
                    </div>
                `;
                projectList.innerHTML += projectCard;
            });
        });
});
document.addEventListener("DOMContentLoaded", function () {
    fetch("skills.json")
        .then(response => response.json())
        .then(data => {
            const skillsContainer = document.getElementById("skills-list");
            skillsContainer.innerHTML = ""; // Clear previous content

            data.skills.forEach(skill => {
                let skillHTML = `
                    <div class="col-md-4">
                        <h4>${skill.category}</h4>
                        <p>${skill.technologies.join(", ")}</p>
                    </div>
                `;
                skillsContainer.innerHTML += skillHTML;
            });
        })
        .catch(error => console.error("Error loading skills:", error));
});

document.addEventListener("DOMContentLoaded", function () {
    fetch("education_experience.json")
        .then(response => response.json())
        .then(data => {
            // Load Education
            const educationList = document.getElementById("education-list");
            data.education.forEach(edu => {
                let eduHTML = `
                    <div class="col-md-6">
                        <div class="card p-3 shadow">
                            <h4 class="text-primary">${edu.degree}</h4>
                            <p>${edu.institution}</p>
                            <p><strong>${edu.year}</strong></p>
                        </div>
                    </div>
                `;
                educationList.innerHTML += eduHTML;
            });

            // Load Experience
            const experienceList = document.getElementById("experience-list");
            data.experience.forEach(exp => {
                let expHTML = `
                    <div class="col-md-6">
                        <div class="card p-3 shadow">
                            <h4 class="text-primary">${exp.position}</h4>
                            <p>${exp.company}</p>
                            <p><strong>${exp.year}</strong></p>
                        </div>
                    </div>
                `;
                experienceList.innerHTML += expHTML;
            });
        })
        .catch(error => console.error("Error loading education & experience:", error));
});


// Contact Form Submission
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert("Thank you for contacting me!");
});
