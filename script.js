const form = document.getElementById('pollForm');
const resultDiv = document.getElementById('poll-result');

// Initialize votes
let votes = JSON.parse(localStorage.getItem("pollVotes")) || {
    "SEM 1 KUMPULAN 1": 0,
    "Sem 1 Kumpulan 2": 0,
    "Sem 2 Kumpulan 1": 0,
    "Sem 2 Kumpulan 2": 0,
    "Sem 3 Kumpulan 1": 0,
    "Sem 3 Kumpulan 2": 0,
    "Sem 4 Kumpulan 1": 0,
    "Sem 4 Kumpulan 2": 0,
    "Sem 5 Kumpulan 1": 0,
    "Sem 5 Kumpulan 2": 0,
    "Sem 6 Kumpulan 1": 0,
    "Sem 6 Kumpulan 2": 0
};

let voteCount = parseInt(localStorage.getItem("voteCount")) || 0;

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const selected = document.querySelector('input[name="poster"]:checked');
    if (!selected) {
        alert("Sila pilih satu poster dahulu.");
        return;
    }

    if (voteCount >= 2) {
        alert("Anda hanya boleh mengundi maksimum 2 kali.");
        return;
    }

    const choice = selected.value;
    votes[choice]++;
    voteCount++;

    localStorage.setItem("pollVotes", JSON.stringify(votes));
    localStorage.setItem("voteCount", voteCount.toString());

    displayResults();
});

function displayResults() {
    let output = `<h2>Keputusan Undian</h2>`;
    let totalVotes = 0;

    for (let poster in votes) {
        output += `<p>${poster}: ${votes[poster]} undi</p>`;
        totalVotes += votes[poster];
    }

    output += `<p><strong>Jumlah Keseluruhan Undian:</strong> ${totalVotes}</p>`;
    resultDiv.innerHTML = output;
    resultDiv.style.display = "block";
    form.style.display = "none";
}

function resetVote() {
    localStorage.removeItem("pollVotes");
    localStorage.removeItem("voteCount");

    votes = {
        "SEM 1 KUMPULAN 1": 0,
        "Sem 1 Kumpulan 2": 0,
        "Sem 2 Kumpulan 1": 0,
        "Sem 2 Kumpulan 2": 0,
        "Sem 3 Kumpulan 1": 0,
        "Sem 3 Kumpulan 2": 0,
        "Sem 4 Kumpulan 1": 0,
        "Sem 4 Kumpulan 2": 0,
        "Sem 5 Kumpulan 1": 0,
        "Sem 5 Kumpulan 2": 0,
        "Sem 6 Kumpulan 1": 0,
        "Sem 6 Kumpulan 2": 0
    };
    voteCount = 0;
    form.reset();
    resultDiv.style.display = "none";
    form.style.display = "block";
}
