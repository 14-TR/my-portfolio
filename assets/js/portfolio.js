document.addEventListener('DOMContentLoaded', () => {
    fetch('assets/data/projects.json')
        .then(response => response.json())
        .then(data => {
            const projectContainer = document.querySelector('.portfolio-section .column');
            data.projects.forEach(project => {
                const projectCard = `
                    <div class="col-md-6 mb-4">
                        <div class="card h-100">
                            <div class="card-header text-center">
                                <h5 class="card-title">${project.title}</h5>
                            </div>
                            <div class="card-body">
                                <p>${project.description}</p>
                                <a href="${project.url}" target="_blank" class="btn btn-primary w-100">Open App</a>
                            </div>
                        </div>
                    </div>
                `;
                projectContainer.innerHTML += projectCard;
            });
        })
        .catch(error => console.error('Error fetching JSON:', error));
});