import { Op } from "@sequelize/core";
import Contact from "../models/ContactModel.js";

export default class ContactsController {
    static async getContactById(req, res) {
        const regex = /[a-zA-Z]/g
        try {
            if(regex.test(req.params.id)){
                return  res.status(404).json({
                    success: false,
                    body: null,
                    message: "مخاطب یافت نشد",
                    status: 404,
                });
            }
            const contact = await Contact.findByPk(req.params.id);
            if (contact) {
                res.json({
                    success: true,
                    body: contact,
                    message: "",
                    status: 200,
                });
            } else {
                res.status(404).json({
                    success: false,
                    body: null,
                    message: "مخاطب یافت نشد",
                    status: 404,
                });
            }
        } catch (e) {
            res.status(500).json({ success: false, body: null, message: e.message, status: 500 });
        }
    }

    static async getContacts(req, res) {
        const q = req.query.q ?? "";
        const where = {
            [Op.or]: [
                { firstname: { [Op.like]: `%${q}%` } },
                { lastname: { [Op.like]: `%${q}%` } },
            ],
        };
        try {
            const contacts = await Contact.findAll({ where, order: [["id", "DESC"]] });
            res.json({ success: true, body: contacts, message: "", status: 200 });
        } catch (e) {
            res.status(500).json({ success: false, body: null, message: e.message, status: 500 });
        }
    }

    static async createContact(req, res) {
        const { firstname, lastname, mobile, email, avatar, description } = req.body;
        let error = "";
        if (!firstname) {
            error = "وارد کردن نام الزامی است";
        } else if (!lastname) {
            error = "وارد کردن نام خانوادگی الزامی است";
        }
        if (error) {
            return res
                .status(400)
                .json({ success: false, body: null, message: error, status: 400 });
        }
        try {
            const contact = await Contact.create({
                firstname,
                lastname,
                mobile,
                email,
                avatar,
                description,
            });
            await contact.reload();
            res.status(201).json({
                success: true,
                body: contact,
                message: "مخاطب جدید با موفقیت ایجاد شد",
                status: 201,
            });
        } catch (e) {
            res.status(500).json({ success: false, body: null, message: e.message, stauts: 500 });
        }
    }

    static async updateContact(req, res) {
        const { firstname, lastname, mobile, email, avatar, description } = req.body;
        let error = "";
        if (!firstname) {
            error = "وارد کردن نام الزامی است";
        } else if (!lastname) {
            error = "وارد کردن نام خانوادگی الزامی است";
        }
        if (error) {
            return res
                .status(400)
                .json({ success: false, body: null, message: error, status: 400 });
        }
        try {
            const contact = await Contact.findByPk(req.params.id);
            if (!contact) {
                return res.status(404).json({
                    success: false,
                    body: null,
                    message: "مخاطب یافت نشد",
                    status: 404,
                });
            }
            await Contact.update(
                { firstname, lastname, mobile, email, avatar, description },
                { where: { id: req.params.id } }
            );
            res.json({
                success: true,
                body: null,
                message: "بروز رسانی با موفقیت انجام شد",
                status: 200,
            });
        } catch (e) {
            res.status(500).json({ success: false, body: null, message: e.message, status: 500 });
        }
    }

    static async deleteContact(req, res) {
        try {
            const contact = await Contact.findByPk(req.params.id);
            if (contact) {
                await contact.destroy();
                res.json({
                    success: true,
                    body: null,
                    message: "مخاطب با موفقیت حذف شد",
                    status: 200,
                });
            } else {
                res.status(404).json({
                    success: false,
                    body: null,
                    message: "مخاطب یافت نشد",
                    status: 404,
                });
            }
        } catch (e) {
            res.status(500).json({ success: false, body: null, message: e.message, status: 500 });
        }
    }
}
