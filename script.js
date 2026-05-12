async function loadMissions() {
    const response = await fetch("missions.json");
    const missions = await response.json();

    const container = document.getElementById("missions-container");
    container.innerHTML = "";

    missions.sort((a, b) => a.level - b.level);

    missions.forEach(m => {
        const card = document.createElement("div");
        card.className = "mission-card";

        card.innerHTML = `
            <h2>Level ${m.level} – ${m.name}</h2>

            <strong>Aufgaben:</strong>
            <ul class="task-list">
                ${m.tasks.map(t => `<li>${t.text} (${t.amount})</li>`).join("")}
            </ul>

            <strong>Belohnung:</strong>
            <ul class="reward-list">
                <li>${m.rewards.xp} EP</li>
                <li>${m.rewards.zd} Zoo-Dollar</li>
            </ul>

            <strong>Günstigste Lösung:</strong>
            <ul class="cost-list">
                <li>${m.cheapest_solution.shops.count}× ${m.cheapest_solution.shops.item} (${m.cheapest_solution.shops.price} ZD)</li>
                <li>${m.cheapest_solution.enclosures.count}× ${m.cheapest_solution.enclosures.item} (${m.cheapest_solution.enclosures.price} ZD)</li>
                <li><strong>Gesamtkosten: ${m.cheapest_solution.total_cost} ZD</strong></li>
            </ul>
        `;

        container.appendChild(card);
    });
}

loadMissions();
