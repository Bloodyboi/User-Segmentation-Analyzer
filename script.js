// --- 1. CONFIGURATION ---
const segments = ['All', 'Power User', 'New & Active', 'At-Risk', 'Lurker', 'Active'];
const segmentClasses = {
    'Power User': 'bg-green-100 text-green-800',
    'New & Active': 'bg-blue-100 text-blue-800',
    'At-Risk': 'bg-red-100 text-red-800',
    'Lurker': 'bg-yellow-100 text-yellow-800',
    'Active': 'bg-slate-200 text-slate-800',
};

// --- 2. DOM ELEMENTS & STATE ---
const tableBody = document.getElementById('users-table-body');
const filtersContainer = document.getElementById('filters');
let currentFilter = 'All';
let allUsers = [];

// --- 3. RENDERING FUNCTIONS ---
function renderTable() {
    // This preserves the user's scroll position during refresh
    const scrollY = window.scrollY;

    tableBody.innerHTML = '';
    const filteredUsers = allUsers.filter(user => {
        if (currentFilter === 'All') return true;
        return user.segment === currentFilter;
    });

    if (filteredUsers.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="4" class="text-center text-gray-500 p-6">No users found in this segment.</td>`;
        tableBody.appendChild(row);
        return;
    }

    filteredUsers.forEach(user => {
        const badgeClasses = segmentClasses[user.segment];
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="p-4 text-slate-800">${user.name}</td>
            <td class="p-4"><span class="px-3 py-1 rounded-full text-xs font-semibold ${badgeClasses}">${user.segment}</span></td>
            <td class="p-4 text-slate-600">${user.messages}</td>
            <td class="p-4 text-slate-600">${user.lastSeen}</td>
        `;
        tableBody.appendChild(row);
    });

    // Restore the scroll position
    window.scrollTo(0, scrollY);
}

function renderFilters() {
    filtersContainer.innerHTML = '';
    segments.forEach(segment => {
        const button = document.createElement('button');
        const isActive = segment === currentFilter;
        const activeClasses = 'bg-indigo-600 text-white';
        const inactiveClasses = 'bg-slate-200 text-slate-700 hover:bg-slate-300';
        button.textContent = segment;
        button.setAttribute('data-filter', segment);
        button.className = `px-4 py-2 rounded-full font-semibold text-sm transition ${isActive ? activeClasses : inactiveClasses}`;
        button.addEventListener('click', () => {
            currentFilter = segment;
            renderFilters();
            renderTable();
        });
        filtersContainer.appendChild(button);
    });
}

// --- 4. DATA FETCHING & INITIALIZATION ---

// Fetches data and re-renders the table.
async function fetchAndRenderUsers() {
    try {
        const response = await fetch('http://localhost:3001/api/users');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        allUsers = await response.json();
        renderTable();
    } catch (error) {
        console.error("Failed to fetch user data:", error);
    }
}

// Initializes the app and starts the refresh interval.
async function initializeApp() {
    renderFilters(); // Render filters once on initial load.
    await fetchAndRenderUsers(); // Fetch and render the initial data.

    // Set an interval to refresh the user data every 5 seconds.
    setInterval(fetchAndRenderUsers, 5000);
}

document.addEventListener('DOMContentLoaded', initializeApp);