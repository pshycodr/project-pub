/*
API key:-
https://leetcode-stats-api.herokuapp.com/2qHZ8iOCsz
*/


document.addEventListener('DOMContentLoaded', async () => {
    const username = '2qHZ8iOCsz';
    const apiUrl = `https://leetcode-stats-api.herokuapp.com/${username}`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data.status === 'success') {
            document.getElementById('username').textContent = `Username: ${username}`;
            document.getElementById('totalSolved').textContent = data.totalSolved;
            document.getElementById('ranking').textContent = data.ranking;
            document.getElementById('reputation').textContent = data.reputation;
            document.getElementById('acceptanceRate').textContent = `${data.acceptanceRate}%`;
            document.getElementById('easySolved').textContent = `${data.easySolved} / ${data.totalEasy}`;
            document.getElementById('mediumSolved').textContent = `${data.mediumSolved} / ${data.totalMedium}`;
            document.getElementById('hardSolved').textContent = `${data.hardSolved} / ${data.totalHard}`;
            
            const submissionCalendar = document.getElementById('submissionCalendar');
            for (const [timestamp, count] of Object.entries(data.submissionCalendar)) {
                const date = new Date(timestamp * 1000).toLocaleDateString();
                const submissionEntry = document.createElement('div');
                submissionEntry.textContent = `${date}: ${count} submissions`;
                submissionEntry.className = 'submission-entry';
                submissionCalendar.appendChild(submissionEntry);
            }
        } else {
            console.error('Failed to retrieve data');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});
