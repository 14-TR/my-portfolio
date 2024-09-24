// Open the modal and display the selected image
function openModal(imgElement) {
  const modal = document.getElementById("imageModal");
  const expandedImg = document.getElementById("expandedImg");
  const captionText = document.getElementById("imgtext");

  modal.style.display = "block";  // Show the modal
  expandedImg.src = imgElement.src;  // Set the full-size image
  captionText.innerHTML = imgElement.alt;  // Set the caption
}

// Close the modal
function closeModal() {
  const modal = document.getElementById("imageModal");
  modal.style.display = "none";  // Hide the modal
}
