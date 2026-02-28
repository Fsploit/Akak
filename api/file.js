export default function handler(req, res) {
    try {
        const hosted = req.query.hosted;

        // 1. Key Authentication
        if (hosted !== "bee54fbc56a2a65809c4519b3816cff770e45d072d4dd53e1675f865beb9f6d7") {
            return res.status(403).send("You're not allowed to see this file contents.");
        }

        // 2. Serve the Script
        res.setHeader("Content-Type", "text/plain");
        
        return res.status(200).send(`print("hi")`);

    } catch (err) {
        return res.status(500).send("Server Error");
    }
}
