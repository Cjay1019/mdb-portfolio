import * as ContactMe from "../lambdas/contactMe.mjs";

export default function routes(app) {
    app.post("/api/contactMe", async (req, res) => {
        const response = await ContactMe.handler(req);

        res.sendStatus(response.statusCode);
    });
}