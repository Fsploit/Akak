export default function handler(req, res) {
    try {
        const hosted = req.query.hosted;
        const userAgent = req.headers['user-agent'] || '';
        
        // Headers used by almost all Roblox executors
        const isRoblox = userAgent.includes("Roblox") || req.headers['roblox-id'];

        // The HTML and CSS for your custom "700" error page
        const customErrorHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Error 700</title>
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
                    color: #d9b3b3; /* Dusty rose color matching your image */
                    margin: 0;
                    line-height: 1;
                    /* Simulates the 3D block shadow effect from the image */
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

        // 1. Key Authentication
        if (hosted !== "bee54fbc56a2a65809c4519b3816cff770e45d072d4dd53e1675f865beb9f6d7") {
            return res.status(403).send("Invalid Key.");
        }

        // 2. The "Hide" Logic
        // If the key is CORRECT but the request is NOT from Roblox, serve the HTML page.
        if (!isRoblox) {
            res.setHeader("Content-Type", "text/html");
            // We use 403 under the hood so the server doesn't crash, but show 700 visually.
            return res.status(403).send(customErrorHTML); 
        }

        // 3. Serve the Script (Only reached if Key is correct AND request is from Roblox)
        res.setHeader("Content-Type", "text/plain");
        return res.status(200).send(`print("hi")`);

    } catch (err) {
        return res.status(500).send("Server Error");
    }
}
