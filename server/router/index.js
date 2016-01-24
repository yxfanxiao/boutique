import { Router } from "express";
import app from "../app";

const router = Router();

router.get("/", (req, res, next) => {
    res.render("index", {
        app: app
    });
})

export default router;