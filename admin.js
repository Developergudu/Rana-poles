// Function to create a poll
function createPoll() {
    let question = document.getElementById("question").value;
    let option1 = document.getElementById("option1").value;
    let option2 = document.getElementById("option2").value;

    if (question === "" || option1 === "" || option2 === "") {
        alert("Please fill all fields!");
        return;
    }

    let pollId = "poll_" + Date.now();
    let pollData = {
        question: question,
        options: {
            [option1]: 0,
            [option2]: 0
        },
        active: true
    };

    db.ref("polls/" + pollId).set(pollData)
        .then(() => {
            alert("Poll Created!");
            generateQRCode(pollId);
        })
        .catch(error => console.error("Error:", error));
}

// Function to generate QR code for participants
function generateQRCode(pollId) {
    let pollLink = `https://yourusername.github.io/repositoryname/participant.html?id=${pollId}`;
    document.getElementById("qrCode").innerHTML = "";
    new QRCode(document.getElementById("qrCode"), pollLink);
}

// Function to end poll
function endPoll() {
    db.ref("polls/" + pollId).update({ active: false });
    alert("Poll Ended!");
}