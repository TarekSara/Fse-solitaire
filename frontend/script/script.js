async function loadTop5() {
    const tbody = document.getElementById('leaderboardBody');

    try {
      const res = await axios.get('../backend/get_score.php');
      tbody.innerHTML = '';

      const top5 = res.data.slice(0, 5);

      top5.forEach(player => {
        tbody.innerHTML += `
          <tr>
            <td>${player.rank}</td>
            <td>${player.name}</td>
            <td>${player.score}</td>
            <td>${player.duration}</td>
          </tr>
        `;
      });
    } catch (error) {
      console.error('Error loading leaderboard:', error);
      tbody.innerHTML = `
        <tr><td colspan="4">Failed to load leaderboard data.</td></tr>
      `;
    }
  }

  window.addEventListener('DOMContentLoaded', loadTop5);

  async function addScore() {
    const name = document.getElementById('name').value.trim();
    const score = document.getElementById('score').value;
    const message = document.getElementById('message');

    if (!name || !score) {
      message.textContent = "Please fill all fields.";
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('score', score);

    try {
      const res = await axios.post('../backend/add_score.php', formData);

      if (res.data && res.data.success) {
        message.textContent = "Score added!";
        document.getElementById('name').value = "";
        document.getElementById('score').value = "";

        await loadLeaderboard();
      } else {
        message.textContent = "Error adding score.";
      }
    } catch (error) {
      console.error('Error adding score:', error);
      message.textContent = "An error occurred.";
    }
  }


  async function loadLeaderboard() {
    const tbody = document.querySelector('#leaderboardBody1');
    tbody.innerHTML = '';

    try {
      const res = await axios.get('../backend/get_score.php');

      res.data.forEach(player => {
        const row = `
          <tr>
            <td>${player.rank}</td>
            <td>${player.name}</td>
            <td>${player.score}</td>
            <td>${player.duration}</td>
          </tr>
        `;
        tbody.innerHTML += row;
      });
    } catch (error) {
      console.error('Error loading leaderboard:', error);
      tbody.innerHTML = `
        <tr><td colspan="4">Failed to load leaderboard data.</td></tr>
      `;
    }
  }

  loadLeaderboard();
