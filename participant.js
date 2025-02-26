// Get poll ID from URL
const urlParams = new URLSearchParams(window.location.search);
const pollId = urlParams.get("id");

if (!pollId) {
    document.getElementById("question").innerText = "Poll Not Found!";
} else {
    // Fetch poll details
    db.ref("polls/" + pollId).on("value", (snapshot) => {
        let poll = snapshot.val();
        if (poll) {
            document.getElementById("question").innerText = poll.question;
            let optionsHTML = "";
            for (let option in poll.options) {
                optionsHTML += `<button onclick="vote('${option}')">${option}</button>`;
            }
            document.getElementById("options").innerHTML = optionsHTML;
        } else {
            document.getElementById("question").innerText = "Poll Not Found!";
        }
    });
}

// Function to vote
function vote(option) {
    db.ref(`polls/${pollId}/options/${option}`).transaction(votes => (votes || 0) + 1);
    alert("Vote Submitted!");
}