document.getElementById("poll-form").addEventListener("submit", function(event){
    event.preventDefault();

    const choice = document.querySelector('input[name="poll"]:checked');
    if (!choice) {
        alert("Please select an option before voting.");
        return;
    }

    const selected = choice.value;
    const voteKey = "pollVotes";

    let votes = JSON.parse(localStorage.getItem(voteKey)) || {};
    votes[selected] = (votes[selected] || 0) + 1;

    // Limit to 2 votes per device
    const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);
    if (totalVotes > 2) {
        alert("You have reached the maximum of 2 votes.");
        return;
    }

    localStorage.setItem(voteKey, JSON.stringify(votes));

    const resultsDiv = document.getElementById("poll-result");
    const resultList = document.getElementById("result-list");
    resultList.innerHTML = "";
    for (let option in votes) {
        const li = document.createElement("li");
        li.textContent = option + ": " + votes[option];
        resultList.appendChild(li);
    }
    resultsDiv.style.display = "block";
});
