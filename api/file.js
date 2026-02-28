export default function handler(req, res) {
    try {
        const hosted = req.query.hosted;
        const userAgent = req.headers['user-agent'] || '';

        // 1. Key Authentication
        if (hosted !== "bee54fbc56a2a65809c4519b3816cff770e45d072d4dd53e1675f865beb9f6d7") {
            return res.status(403).send("You're not allowed to see this file contents.");
        }

        // 2. Anti-Browser Check
        // If the request looks like it's coming from a standard web browser, hide the real script.
        const isBrowser = /Mozilla|Chrome|Safari|Edge|Opera/i.test(userAgent);
        if (isBrowser) {
            // Return a decoy script or a denial message.
            res.setHeader("Content-Type", "text/plain");
            return res.status(200).send(`print("Nice try! Please execute this directly in the application.")`);
        }

        // 3. Serve the Real (Obfuscated) Script
        res.setHeader("Content-Type", "text/plain");
        
        // PASTE YOUR OBFUSCATED LUA SCRIPT HERE
        // Do not put raw, readable Lua here if you want it truly hidden.
        return res.status(200).send(`
print("hewwwo")
        `);

    } catch (err) {
        return res.status(500).send("Server Error");
    }
}
