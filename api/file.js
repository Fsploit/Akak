export default function handler(req, res) {
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
            <title>Antora VM Loader</title>
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
            <h1>FSPLOIT SEE'S YOU</h1>
            <p>
            Hello Skidder, I wanted to fully say that the script is obfuscated by LURAPH so even if you tried, you won't get the full raw code. also join discord.gg/fluxusz for updates.
            
            this file protector is powered by POLSEC.
            
            </p>
            <div class="error-code">700</div>
        </body>
        </html>
        `;

        if (hosted !== "bee54fbc56a2a65809c4519b3816cff770e45d072d4dd53e1675f865beb9f6d7") {
            return res.status(403).send("malformed link or file api changed error 200, report this error to discord.gg/fluxusz");
        }
        
        if (!isRoblox) {
            res.setHeader("Content-Type", "text/html");
            return res.status(403).send(customErrorHTML);
        }


        const luaScriptContent = `loadstring(game:HttpGet("https://raw.githubusercontent.com/Fsploit/Akak/main/api/loader.txt"))()`; 

        const endTime = performance.now();
        const timeTaken = (endTime - startTime).toFixed(2);
        
        const timingWarning = `warn("script successfully loaded: ${timeTaken}ms")\n`;
        
        const finalScript = timingWarning + luaScriptContent;

        res.setHeader("Content-Type", "text/plain");
        return res.status(200).send(finalScript);

    } catch (error) {
        console.error("API Error:", error);
        return res.status(500).send("Internal Server Error");
    }
}
