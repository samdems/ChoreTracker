import { Router } from "express";
import { Log,User } from "../database.js";
const app = Router();

app.get("/", async (req, res) => {
  try {
    const Logs = await Log.findAll();
    const users = await User.findAll();
    res.render("Logs", { Logs,users,error:null,info:null });
  } catch (error) {
    res.render("Logs", { Logs:[],users:[], error:error,info:null });
  }
});

export default app; 