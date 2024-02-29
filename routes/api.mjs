import * as ContactMe from "../lambdas/contactMe.mjs";

export default function routes(app) {
    app.post("/api/contactMe", async (req, res) => {
        console.log(req.body)
        const reqDetails = { ...req, body: JSON.stringify(req.body)};        
        const response = await ContactMe.handler(reqDetails);

        res.sendStatus(response.statusCode);
    });
}