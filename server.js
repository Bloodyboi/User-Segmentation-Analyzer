// --- 1. SETUP ---
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

// --- 2. MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// --- 3. MOCK DATA ---
// Changed to 'let' so we can modify the array
let users = [
    { name: 'Alice', messages: 150, lastSeen: 2, joinDate: new Date('2024-07-15') },
    { name: 'Bob', messages: 25, lastSeen: 5, joinDate: new Date('2025-07-28') },
    { name: 'Charlie', messages: 5, lastSeen: 45, joinDate: new Date('2024-03-20') },
    { name: 'Diana', messages: 80, lastSeen: 1, joinDate: new Date('2024-01-10') },
    { name: 'Ethan', messages: 2, lastSeen: 80, joinDate: new Date('2023-11-05') },
    { name: 'Fiona', messages: 210, lastSeen: 1, joinDate: new Date('2023-09-01') },
    { name: 'George', messages: 15, lastSeen: 10, joinDate: new Date('2025-07-25') },
    { name: 'Hannah', messages: 60, lastSeen: 25, joinDate: new Date('2024-05-18') },
    { name: 'Ian', messages: 0, lastSeen: 15, joinDate: new Date('2025-06-30') },
    { name: 'Jane', messages: 45, lastSeen: 8, joinDate: new Date('2024-08-01') },
];

// --- 4. LIVE DATA SIMULATOR ---
// This function will randomly update user stats to simulate a live environment.
function simulateRealtimeData() {
    users = users.map(user => {
        // Randomly decide whether to add new messages (80% chance)
        if (Math.random() < 0.8) {
            user.messages += Math.floor(Math.random() * 4); // Add 0 to 3 new messages
        }
        return user;
    });
    console.log("Simulated new user activity.");
}

// Run the simulator every 5 seconds
setInterval(simulateRealtimeData, 5000);


// --- 5. SEGMENTATION LOGIC ---
function getUserSegment(user) {
    const joinDate = new Date(user.joinDate);
    const daysSinceJoin = (new Date() - joinDate) / (1000 * 60 * 60 * 24);

    if (user.messages > 100 && user.lastSeen < 10) return 'Power User';
    if (daysSinceJoin < 30 && user.messages > 10) return 'New & Active';
    if (user.lastSeen > 30 && user.messages > 0) return 'At-Risk';
    if (user.messages < 5 && user.lastSeen > 10) return 'Lurker';
    return 'Active';
}

// --- 6. API ENDPOINT ---
app.get('/api/users', (req, res) => {
    console.log("Request received: GET /api/users");
    const usersWithSegments = users.map(user => ({
        ...user,
        segment: getUserSegment(user)
    }));
    res.json(usersWithSegments);
});


// --- 7. START THE SERVER ---
app.listen(PORT, () => {
    console.log(`Backend server is running at http://localhost:${PORT}`);
});