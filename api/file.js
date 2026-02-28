export default function handler(req, res) {
    // 1. Capture the exact start time
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
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    margin: 0;
                    background-color: #ffffff;
                    color: #000000;
                    text-align: center;
                }
                h1 {
                    font-size: 2.5rem;
                    margin-bottom: 20px;
                    font-weight: 600;
                }
                p {
                    font-size: 1.1rem;
                    color: #555;
                    max-width: 600px;
                    line-height: 1.6;
                    margin-bottom: 60px;
                }
                .error-code {
                    font-size: 18rem;
                    font-weight: bold;
                    color: #d9b3b3;
                    margin: 0;
                    line-height: 1;
                    text-shadow: 
                        5px 5px 0px #f0f0f0, 
                        10px 10px 0px #e0e0e0;
                }
            </style>
        </head>
        <body>
            <h1>WARNING...</h1>
            <p>Hello Skidder, I wanted to fully say that the script is obfuscated by LURAPH so even if you tried, you won't get the full raw code.</p>
            <div class="error-code">700</div>
        </body>
        </html>
        `;

        // 2. Security Checks
        if (hosted !== "bee54fbc56a2a65809c4519b3816cff770e45d072d4dd53e1675f865beb9f6d7") {
            return res.status(403).send("malformed link or file api changed err. 200");
        }
        
        if (!isRoblox) {
            res.setHeader("Content-Type", "text/html");
            return res.status(403).send(customErrorHTML);
        }

        // 3. Serve the Lua Script (Since it IS Roblox)
        
        // Put your actual Luraph obfuscated script content here
        const luaScriptContent = `loadstring(game:HttpGet("https://raw.githubusercontent.com/Fsploit/Akak/main/api/loader.txt"))()`; 

        // 4. Calculate the end time and format the difference to 2 decimal places
        const endTime = performance.now();
        const timeTaken = (endTime - startTime).toFixed(2);
        
        // Create the warning string exactly as requested
        const timingWarning = `warn("time took loaded script: ${timeTaken}ms")\n`;
        
        // Combine the warning with the script content
        const finalScript = timingWarning + luaScriptContent;

        // 5. Send the final compiled string back to Roblox
        res.setHeader("Content-Type", "text/plain");
        return res.status(200).send(finalScript);

    } catch (error) {
        console.error("API Error:", error);
        return res.status(500).send("Internal Server Error");
    }
}
