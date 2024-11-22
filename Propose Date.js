// Sample groupData structure
let groupData = JSON.parse(localStorage.getItem("groupData")) || { dates: [] };

// Function to render the dates and voting buttons
function renderDates() {
    const datesList = document.getElementById("datesList");
    datesList.innerHTML = ''; // Clear existing list

    // Loop through the stored dates and display them with vote counts and voters
    groupData.dates.forEach((dateObj, index) => {
        const dateItem = document.createElement("div");
        dateItem.classList.add("date-item");

        const dateDisplay = document.createElement("div");
        dateDisplay.textContent = `${dateObj.date} - Votes: ${dateObj.votes}`;

        const voteBtn = document.createElement("button");
        voteBtn.classList.add("vote-btn");
        voteBtn.textContent = "Vote";
        
        // Disable voting button if the user already voted on this date
        const username = prompt("Enter your username to vote:");
        if (username && !dateObj.voters.includes(username)) {
            voteBtn.addEventListener("click", () => {
                // Add username to the list of voters for that date
                dateObj.voters.push(username);
                dateObj.votes++; // Increment the vote count
                localStorage.setItem("groupData", JSON.stringify(groupData)); // Update localStorage
                renderDates(); // Re-render the dates with updated vote counts and voters
                checkVotingCompletion(); // Check if all members have voted
            });
        } else {
            // If already voted, disable the button and show a message
            voteBtn.disabled = true;
            voteBtn.textContent = "You have voted";
        }

        // Display the list of voters for the date
        const votersList = document.createElement("div");
        votersList.classList.add("voters");
        votersList.textContent = "Voters: " + (dateObj.voters.length > 0 ? dateObj.voters.join(", ") : "No votes yet");

        dateItem.appendChild(dateDisplay);
        dateItem.appendChild(voteBtn);
        dateItem.appendChild(votersList);
        datesList.appendChild(dateItem);
    });
}

// Function to add a new date
document.getElementById("addDateBtn").addEventListener("click", () => {
    const dateInput = document.getElementById("dateInput").value;

    if (dateInput) {
        // Add the new date with 0 votes initially
        groupData.dates.push({ date: dateInput, votes: 0, voters: [] });

        // Store the updated group data in localStorage
        localStorage.setItem("groupData", JSON.stringify(groupData));

        // Re-render the dates
        renderDates();
        document.getElementById("dateInput").value = ''; // Clear the input
    } else {
        alert("Please select a valid date.");
    }
});

// Function to check if all members have voted
function checkVotingCompletion() {
    const allVoted = groupData.dates.every(dateObj => dateObj.voters.length > 0);
    
    if (allVoted) {
        // Redirect to User Profile page once all members have voted
        window.location.href = "User profile.html";
    }
}

// Initialize the page by rendering any saved dates
renderDates();
