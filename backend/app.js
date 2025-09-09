import express from "express";
import "dotenv/config";

import sequelize from "./utils/db.js";
import Contact from "./models/ContactModel.js";
import contactRoutes from "./routes/contactRoutes.js";
import contacts from "./testData.js";

const app = express();
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
});

app.use((req, res, next) => {
    setTimeout(next, 1000);
});

app.use("/api/v1/contacts", contactRoutes);

await sequelize.sync({ force: true });
await Contact.bulkCreate(contacts);
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
