export default function handler(req, res) {
    const content = req.query.content;

    if (hosted !== "bee54fbc56a2a65809c4519b3816cff770e45d072d4dd53e1675f865beb9f6d7") {
        res.status(403).send("You're not allowed to see this file contents.");
        return;
    }

    res.setHeader("Content-Type", "text/plain");

    res.status(200).send(`
        print("hi")
    `);
}
