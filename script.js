import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, update, onValue } from "firebase/database";

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

let pollID = Date.now();
let chart;

document.getElementById('start-poll').addEventListener('click', () => {
    let question = document.getElementById('question').value;
    let options = Array.from(document.getElementsByClassName('option')).map(opt => opt.value);
    if (question === "" || options.length < 2) return alert("Enter a question and at least 2 options!");

    let pollRef = ref(db, 'polls/' + pollID);
    set(pollRef, { question, options, votes: Array(options.length).fill(0) });

    document.getElementById('poll-setup').style.display = 'none';
    document.getElementById('poll-container').style.display = 'block';
    document.getElementById('poll-question').innerText = question;

    generateOptions(options);
    generateQR();
});

function generateOptions(options) {
    let optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = "";
    options.forEach((opt, i) => {
        let btn = document.createElement('button');
        btn.innerText = opt;
        btn.style.border = `3px solid ${getColor(i)}`;
        btn.addEventListener('click', () => vote(i));
        optionsDiv.appendChild(btn);
    });

    chart = new Chart(document.getElementById('voteChart'), {
        type: 'bar',
        data: { labels: options, datasets: [{ label: "Votes", data: Array(options.length).fill(0), backgroundColor: ['red', 'blue', 'green', 'yellow', 'white'] }] }
    });
}

function vote(index) {
    let pollRef = ref(db, 'polls/' + pollID);
    get(pollRef).then(snapshot => {
        if (!snapshot.exists()) return;
        let pollData = snapshot.val();
        pollData.votes[index] += 1;
        update(pollRef, { votes: pollData.votes });

        document.getElementById('voteChart').data.datasets[0].data = pollData.votes;
        document.getElementById('voteChart').update();

        navigator.vibrate(100);
        new Audio('vote.mp3').play();
    });
}

function generateQR() {
    let qrDiv = document.getElementById('qr-container');
    qrDiv.innerHTML = "";
    new QRCode(qrDiv, {
        text: `https://yourwebsite.com/poll.html?id=${pollID}`,
        width: 150,
        height: 150
    });
}

function getColor(index) {
    return ["red", "blue", "green", "yellow", "white"][index] || "gray";
          }
