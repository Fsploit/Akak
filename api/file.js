import axios from 'axios';

export default async function handler(req, res) {
    const startTime = performance.now();

    try {
        const hosted = req.query.hosted;
        const userAgent = req.headers['user-agent'] || '';
        const isRoblox = userAgent.includes("Roblox") || req.headers['roblox-id'];
        
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

        if (hosted !== "bee54fbc56a2a65809c4519b3816cff770e45d072d4dd53e1675f865beb9f6d7") {
            return res.status(403).send("malformed link or file api changed err. 200");
        }
        
        if (!isRoblox) {
            res.setHeader("Content-Type", "text/html");
            return res.status(403).send(customErrorHTML);
        }

        // 1. Fetch the raw script
        const githubRawUrl = "https://raw.githubusercontent.com/Fsploit/Akak/main/api/loader.txt";
        const response = await axios.get(githubRawUrl);
        const luaScriptContent = response.data;

        const endTime = performance.now();
        const timeTaken = (endTime - startTime).toFixed(2);
        
        // 2. Wrap in loadstring
        // Using Lua's long bracket syntax [[ ]] to avoid issues with quotes inside your script
        const loadstringWrapper = `loadstring([[${luaScriptContent}]])()`;
        
        // 3. Add the warning and the wrapped code
        const finalScript = `warn("time took loaded script: ${timeTaken}ms")\n${loadstringWrapper}`;

        res.setHeader("Content-Type", "text/plain");
        return res.status(200).send(finalScript);

    } catch (error) {
        console.error("API Error:", error);
        return res.status(500).send("Internal Server Error: Could not fetch GitHub file.");
    }
}
