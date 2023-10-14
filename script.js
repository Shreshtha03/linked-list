let currentIndex = 0;
const compartments = ["Image"];

function moveBackward() {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = compartments.length - 1;
    }
    updateSlider();
}

function moveForward() {
    if (currentIndex < compartments.length - 1) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    updateSlider();
}

function updateSlider() {
    const trainImages = document.getElementById("train-images");
    const imageWidth = 600; // Width of each image
    const offset = -currentIndex * imageWidth;
    trainImages.style.left = offset + "px";
}

function addCompartment() {
    const compartmentName = document.getElementById("compartment-name").value.trim().toLowerCase();
    if (compartmentName !== "") {
        currentIndex = compartments.length;
        compartments.push(compartmentName);
        addImage(compartmentName);
        updateCompartmentList();
        document.getElementById("compartment-name").value = "";

        // Update the currentIndex and slider position
        currentIndex = compartments.indexOf(compartmentName);
        updateSlider();
    }
}

function deleteCompartment() {
    if (compartments.length > 1) {
        const removedCompartment = compartments.pop();
        updateCompartmentList();
        deleteImage(removedCompartment);
        currentIndex = compartments.length - 1;
        updateSlider();
    }
}

function addImage(compartmentName) {
    const trainImages = document.getElementById("train-images");
    const newImage = document.createElement("img");
    newImage.className = "compartment-image";
    newImage.src = `${compartmentName}.png`;
    newImage.alt = compartmentName;
    trainImages.appendChild(newImage);
}

function deleteImage(compartmentName) {
    const trainImages = document.getElementById("train-images");
    const images = trainImages.querySelectorAll(".compartment-image");
    for (const image of images) {
        if (image.alt === compartmentName) {
            trainImages.removeChild(image);
            break;
        }
    }
}

function updateCompartmentList() {
    const compartmentList = document.getElementById("compartments");
    compartmentList.innerHTML = "";
    for (const compartment of compartments) {
        const listItem = document.createElement("li");
        listItem.textContent = compartment;
        compartmentList.appendChild(listItem);
    }
}

updateSlider();