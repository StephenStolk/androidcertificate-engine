const userName = document.getElementById("name");
const submitBtn = document.getElementById("submitBtn");
const certificateContainer = document.getElementById("certificateContainer");
const certificateImage = document.getElementById("certificateImage");
const downloadCertificateBtn = document.getElementById("downloadCertificateBtn");
const instagramStoryBtn = document.getElementById("instagramStoryBtn");
const linkedinPostBtn = document.getElementById("linkedinPostBtn");

submitBtn.addEventListener("click", async () => {
    const val = capitalize(userName.value.trim());

    // Check if the text is empty or not
    if (val !== "" && userName.checkValidity()) {
        await generateCertificate(val);
    } else {
        userName.reportValidity();
    }
});

const generateCertificate = async (name) => {
    const imageUrl = await generateImage(name);
    certificateImage.src = imageUrl;
    certificateContainer.style.display = "block";

    // Download button functionality
    downloadCertificateBtn.addEventListener("click", () => {
        downloadImage(imageUrl, "androidcertificate.png");
    });

    // Instagram Story button functionality
    instagramStoryBtn.addEventListener("click", () => {
        postToInstagramStory(imageUrl, name);
    });

    // LinkedIn Post button functionality
    linkedinPostBtn.addEventListener("click", () => {
        postToLinkedIn(imageUrl, name);
    });
};

const generateImage = async (name) => {
    const canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext("2d");

    // Load background certificate image
    const backgroundImage = new Image();
        backgroundImage.src = "./certificate/webworkcertificateimg.jpg";

    // Wait for the background image to load
    await new Promise((resolve, reject) => {
        backgroundImage.onload = () => resolve();
        backgroundImage.onerror = (err) => reject(err);
    });
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#82b5c6";
    ctx.font = "55px 'Great Vibes', cursive";
    const textWidth = ctx.measureText(name).width;
    const x = (canvas.width - textWidth) / 2;

    ctx.fillText(name, x, 350); 
    const dataUrl = canvas.toDataURL("image/png");
    return dataUrl;
};


const downloadImage = (url, filename) => {
    // Create an anchor element
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;

    // Append anchor to body and simulate click
    document.body.appendChild(a);
    a.click();

    // Remove anchor from body
    document.body.removeChild(a);
};

const postToInstagramStory = () => {
    const instagramWebUrl = `https://www.instagram.com/`;
    window.open(instagramWebUrl, '_blank');
};

const postToLinkedIn = () => {
    const linkedInWebUrl = `https://www.linkedin.com/sharing/share-offsite/`;
    window.open(linkedInWebUrl, '_blank');
};

const capitalize = (str, lower = false) =>
    (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
        match.toUpperCase()
    );

// Captions array
const captions = [
    "Excited to share my participation certificate from Android Club! 🌟 Thank you @AndroidClub for organizing #WebWorks #CertificateOfParticipation",
    "Just received my Web Works certificate from Android Club. 🎉 Huge thanks to @AndroidClub for this opportunity! #WebWorks #Certificate",
    "Feeling proud to be part of the Android Club's Web Works event! 🏆 Thank you @AndroidClub for the amazing experience! #WebWorks #ProudMoment",
    "Honored to receive my certificate for Web Works organized by Android Club. 📜 Thank you @AndroidClub for this recognition! #WebWorks #Honored"
];

// Function to populate captions
const populateCaptions = () => {
    const captionList = document.getElementById("captionList");

    captions.forEach(caption => {
        const li = document.createElement("li");
        li.textContent = caption;
        captionList.appendChild(li);
    });
};

// Call populateCaptions on page load
window.onload = populateCaptions;
