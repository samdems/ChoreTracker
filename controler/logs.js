import { Router } from "express";
import { Log } from "../database.js";
const app = Router();

app.get("/", async (req, res) => {
  try {
    const Logs = await Log.findAll();
    res.render("Logs", { Logs,error:null,info:null });
  } catch (error) {
    res.render("Logs", { Logs:[], error:error,info:null });
  }
});

export default app; 