const form = document.getElementById("poll-form");
const resultDiv = document.getElementById("poll-result");
const resultList = document.getElementById("result-list");
const totalVotesDisplay = document.getElementById("totalVotes");

const SCRIPT_URL = "https://script.google.com/macros/s/A1FGPNk1JGyhAyySxKWM1a2tihjL8UxT-U74UGYKZalQA/exec";

let voteCount = parseInt(localStorage.getItem("voteCount")) || 0;

form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (voteCount >= 2) {
        alert("Anda hanya boleh mengundi 2 kali sahaja.");
        return;
    }

    const selected = document.querySelector('input[name="poll"]:checked');

    if (selected) {
        const choice = selected.value;
        voteCount++;
        localStorage.setItem("voteCount", voteCount);

        fetch(SCRIPT_URL, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `choice=${encodeURIComponent(choice)}`
        })
        .then(response => response.text())
        .then(() => displayResults())
        .catch(error => console.error("Ralat hantar undian:", error));
    } else {
        alert("Sila pilih satu pilihan sebelum undi.");
    }
});

function displayResults() {
    form.style.display = "none";
    resultDiv.style.display = "block";
    resultList.innerHTML = "";

    fetch(SCRIPT_URL)
        .then(response => response.json())
        .then(data => {
            let total = 0;
            data.forEach(item => {
                total += parseInt(item.votes);
                const li = document.createElement("li");
                li.textContent = `${item.choice.toUpperCase()}: ${item.votes} vote(s)`;
                resultList.appendChild(li);
            });

            if (totalVotesDisplay) {
                totalVotesDisplay.textContent = `Jumlah keseluruhan undian: ${total}`;
            }
        })
        .catch(error => console.error("Ralat ambil keputusan:", error));
}

if (voteCount > 0) {
    displayResults();
}
