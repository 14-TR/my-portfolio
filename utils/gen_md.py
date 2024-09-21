import os

# Directories to exclude
exclude_dirs = ['.git', 'node_modules', '__pycache__']

# Files to exclude
exclude_files = ['.gitattributes', '.DS_Store']

def generate_folder_structure(folder_path):
    structure = []
    for root, dirs, files in os.walk(folder_path):
        # Remove directories that we want to exclude from the walk
        dirs[:] = [d for d in dirs if d not in exclude_dirs]
        
        # Calculate the folder level and indentation
        level = root.replace(folder_path, '').count(os.sep)
        indent = '│   ' * level
        
        # Append folder to structure
        structure.append(f"{indent}├── {os.path.basename(root)}/" if level > 0 else f"{os.path.basename(root)}/")
        
        # Iterate over files in the folder and add them to structure
        sub_indent = '│   ' * (level + 1)
        for file in files:
            if file not in exclude_files:
                structure.append(f"{sub_indent}└── {file}")

    return "\n".join(structure)

# Specify the folder path
folder_path = r"C:\Users\TR\Desktop\Fall 2024\GIT\my-portfolio"

# Generate the folder structure
folder_structure = generate_folder_structure(folder_path)

# Write the folder structure to README.md (using utf-8 encoding)
if folder_structure:
    with open('README.md', 'a', encoding='utf-8') as readme_file:
        readme_file.write("\n## Folder Structure Overview\n")
        readme_file.write(folder_structure)
    print("Folder structure added to README.md")
else:
    print("No folder structure found.")
