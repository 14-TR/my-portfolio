import os

# Define the folder structure
folders = [
    "my-portfolio/css",
    "my-portfolio/js",
    "my-portfolio/images",
    "my-portfolio/data"
]

# Define the files to create
files = {
    "my-portfolio/index.html": "<!-- Home Page HTML -->",
    "my-portfolio/about.html": "<!-- About Page HTML -->",
    "my-portfolio/portfolio.html": "<!-- Portfolio Page HTML -->",
    "my-portfolio/contact.html": "<!-- Contact Page HTML -->",
    "my-portfolio/css/styles.css": "/* Custom CSS file */",
    "my-portfolio/js/scripts.js": "// JavaScript file",
    "my-portfolio/data/projects.json": "{\n\t\"projects\": []\n}",
    "my-portfolio/data/events.xml": "<events></events>",
    "my-portfolio/README.md": "# Personal Portfolio Project"
}

# Create the folders
for folder in folders:
    os.makedirs(folder, exist_ok=True)

# Create the files with initial content
for file_path, content in files.items():
    with open(file_path, "w") as file:
        file.write(content)

print("Folder structure created successfully!")
