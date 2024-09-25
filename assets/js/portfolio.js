document.addEventListener('DOMContentLoaded', () => {
    fetch('assets/data/projects.json')
        .then(response => response.json())
        .then(data => {
            const projectContainer = document.getElementById('projects-container');
            data.projects.forEach(project => {
                const projectCard = `
                    <div class="card h-100">
                        <img src="${project.image}" class="card-img-top" alt="${project.title}">
                        <div class="card-header text-center">
                            <h5 class="card-title">${project.title}</h5>
                        </div>
                        <div class="card-body">
                            <p>${project.description}</p>
                            <a href="${project.url}" target="_blank" class="btn btn-primary w-100">Open App</a>
                        </div>
                    </div>
                `;
                projectContainer.innerHTML += projectCard;
            });
        })
        .catch(error => console.error('Error fetching JSON:', error));
});
