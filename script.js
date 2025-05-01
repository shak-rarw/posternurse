const form = document.getElementById("poll-form");
const resultDiv = document.getElementById("poll-result");
const resultList = document.getElementById("result-list");

const SCRIPT_URL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"; // Ganti dengan URL anda

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const selected = document.querySelector('input[name="poll"]:checked');

    if (selected) {
        const choice = selected.value;

        // Hantar undian ke Google Sheets
        fetch(SCRIPT_URL, {
            method: 'POST',
            body: new URLSearchParams({ "choice": choice })
        })
        .then(response => response.text())
        .then(data => {
            alert("Undian anda telah dihantar.");
            fetchResults(); // Dapatkan keputusan semasa
        })
        .catch(error => {
            alert("Ralat semasa menghantar undian.");
            console.error(error);
        });
    } else {
        alert("Sila pilih satu pilihan sebelum menghantar undian.");
    }
});

function fetchResults() {
    fetch(SCRIPT_URL)
        .then(res => res.json())
        .then(data => {
            resultList.innerHTML = "";
            let totalVotes = 0;

            data.forEach(item => {
                const li = document.createElement("li");
                li.textContent = `${item.choice.toUpperCase()}: ${item.votes} undi`;
                resultList.appendChild(li);
                totalVotes += parseInt(item.votes);
            });

            const total = document.createElement("p");
            total.style.fontWeight = "bold";
            total.textContent = `Jumlah keseluruhan undian: ${totalVotes}`;
            resultList.appendChild(total);

            resultDiv.style.display = "block";
            form.style.display = "none";
        });
}

// Papar keputusan terus kalau pengguna reload (optional)
window.addEventListener("load", fetchResults);
