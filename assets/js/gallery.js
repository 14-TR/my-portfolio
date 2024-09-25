function loadImagesFromXML() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "assets/data/images.xml", true);
  xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
          const xml = xhr.responseXML;
          const images = xml.getElementsByTagName("image");
          const thumbnailGrid = document.querySelector(".thumbnail-grid");

          
          for (let i = 0; i < images.length; i++) {
              const src = images[i].getElementsByTagName("src")[0].textContent;
              const alt = images[i].getElementsByTagName("alt")[0].textContent;

              const thumbnailDiv = document.createElement("div");
              thumbnailDiv.classList.add("thumbnail");

              const imgElement = document.createElement("img");
              imgElement.src = src;
              imgElement.alt = alt;
              imgElement.onclick = function() {
                  openModal(this);
              };

              thumbnailDiv.appendChild(imgElement);
              thumbnailGrid.appendChild(thumbnailDiv);
          }
      }
  };
  xhr.send();
}

function openModal(imgElement) {
  const modal = document.getElementById("imageModal");
  const expandedImg = document.getElementById("expandedImg");
  const captionText = document.getElementById("imgtext");

  modal.style.display = "block"; 
  expandedImg.src = imgElement.src;  
  captionText.innerHTML = imgElement.alt;  
}

function closeModal() {
  const modal = document.getElementById("imageModal");
  modal.style.display = "none";  
}


window.onload = function() {
  loadImagesFromXML();
};
