import { Router } from "express";
// import customer from "../../app/routes/customer.routes";
// import users from "../../app/routes/users.routes";
// import feedback from "../../app/routes/feedback.routes";
// import authentication from '../../app/routes/authentication.routes';

const api = Router();
api.get("/", (req, res) =>
    res.status(200).json({
        ok: true,
        message: "Welcome to Questioner",
        status: "API version 1"
    })
);

// api.use("/customer", customer);
// api.use("/", users);
// api.use("/auth", authentication);
// api.use("/feedback", feedback);

api.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    // Request methods you wish to allow
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    // Request headers you wish to allow
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
    );
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

// No routes matched? 404.
api.use("*", (req, res) =>
    res.status(404).send({ message: "Sorry that route/method doesnt exist" })
);

export default api;
