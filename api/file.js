import axios from 'axios';

export default async function handler(req, res) {
    // 1. Capture the exact start time
    const startTime = performance.now();

    try {
        const hosted = req.query.hosted;
        const userAgent = req.headers['user-agent'] || '';
        const isRoblox = userAgent.includes("Roblox") || req.headers['roblox-id'];
        
        // Custom Error HTML for non-Roblox users
        const customErrorHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Astralise virtual file</title>
            <style>
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; background-color: #ffffff; color: #000000; text-align: center; }
                .error-code { font-size: 18rem; font-weight: bold; color: #d9b3b3; margin: 0; line-height: 1; text-shadow: 5px 5px 0px #f0f0f0, 10px 10px 0px #e0e0e0; }
            </style>
        </head>
        <body>
            <h1>WARNING...</h1>
            <p>Hello Skidder, the script is obfuscated by LURAPH. You won't get the raw code.</p>
            <div class="error-code">700</div>
        </body>
        </html>
        `;

        // Security check for the 'hosted' parameter
        if (hosted !== "bee54fbc56a2a65809c4519b3816cff770e45d072d4dd53e1675f865beb9f6d7") {
            return res.status(403).send("malformed link or file api changed err. 200");
        }
        
        // Serve HTML error if not accessed via Roblox
        if (!isRoblox) {
            res.setHeader("Content-Type", "text/html");
            return res.status(403).send(customErrorHTML);
        }

        // 2. Fetch the raw script from GitHub
        // Note: Using 'raw.githubusercontent.com' is required to get the code without the GitHub UI
        const githubRawUrl = "https://raw.githubusercontent.com/Fsploit/Akak/main/api/loader.txt";
        const response = await axios.get(githubRawUrl);
        const luaScriptContent = response.data;

        // 3. Calculate load time
        const endTime = performance.now();
        const timeTaken = (endTime - startTime).toFixed(2);
        
        // 4. Prepend the warning message
        const timingWarning = `warn("time took loaded script: ${timeTaken}ms")\n`;
        const finalScript = timingWarning + luaScriptContent;

        // 5. Send back the uncorrupted Lua script to the executor
        res.setHeader("Content-Type", "text/plain");
        return res.status(200).send(finalScript);

    } catch (error) {
        console.error("API Error:", error);
        return res.status(500).send("Internal Server Error: Could not fetch GitHub file.");
    }
}
