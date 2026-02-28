export default function handler(req, res) {
    try {
        const hosted = req.query.hosted;
        const userAgent = req.headers['user-agent'] || '';
        
        // Headers used by almost all Roblox executors
        const isRoblox = userAgent.includes("Roblox") || req.headers['roblox-id'];

        // 1. Key Authentication
        if (hosted !== "bee54fbc56a2a65809c4519b3816cff770e45d072d4dd53e1675f865beb9f6d7") {
            return res.status(403).send("Invalid Key.");
        }

        // 2. The "Hide" Logic
        // If the key is CORRECT but the request is NOT from Roblox, act like the file is empty/hidden.
        if (!isRoblox) {
            return res.status(403).send("You're not allowed to see this file contents.");
        }

        // 3. Serve the Script (Only reached if Key is correct AND request is from Roblox)
        res.setHeader("Content-Type", "text/plain");
        return res.status(200).send(`print("hi")`);

    } catch (err) {
        return res.status(500).send("Server Error");
    }
}
