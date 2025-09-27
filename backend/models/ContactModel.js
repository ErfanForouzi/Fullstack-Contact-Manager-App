import { DataTypes } from "@sequelize/core";

import sequelize from "../config/db.js";

const Contact = sequelize.define(
    "Contact",
    {
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        mobile: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
        avatar: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.TEXT("tiny"),
        },
    },
    {
        timestamps: false,
    }
);

export default Contact;
