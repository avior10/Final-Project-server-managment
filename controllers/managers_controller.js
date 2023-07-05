const Manager = require('../models/Manager');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {

    //managers requests

    getAllManagers: async (req, res) => {
        console.log("API request: get all managers");

        try {
            const managers = await Manager.find();

            return res.status(200).json({
                success: true,
                message: "success to get all managers",
                managers
            });
        } catch (err) {
            return res.status(500).json({
                message: "error to get all managers",
                error: err.message
            })
        }
    },

    getManagerById: async (req, res) => {
        console.log("API request: get manager by id");

        try {
            const manager_id = req.params.manager_id;
            const manager = await Manager.findById(manager_id);

            return res.status(200).json({
                success: true,
                message: "success to get manager by id",
                manager
            });
        } catch (err) {
            return res.status(500).json({
                message: "error to get manager by id",
                error: err.message
            });
        }
    },

    loginManager: async (req, res) => {
        try {
            const { manager_email, manager_password } = req.body;

            const manager = await Manager.findOne({ manager_email });

            if (!manager) {
                throw new Error("bad credentials");
            }

            const equal = await bcrypt.compare(manager_password, manager.manager_password);

            if (!equal) {
                throw new Error("bad credentials");
            }

            let payload = {
                manager: manager._id,
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: 10000,
            });

            let oldTokens = manager.tokens || [];

            if (oldTokens.length) {
                oldTokens = oldTokens.filter(t => {
                    const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000;
                    if (timeDiff < 1000) {
                        return t;
                    }
                });
            }

            await Manager.findByIdAndUpdate(manager._id, {
                tokens: [...oldTokens, { token, signedAt: Date.now().toString() }],
            }).exec();

            return res.status(201).json({
                success: true,
                message: "manager login successfully",
                token,
                manager: {
                    _id: manager._id,
                    manager_name: manager.manager_name,
                    manager_email: manager.manager_email,
                },
            });
        } catch (error) {
            return res.status(401).json({
                message: "error to login manager",
                error: error.message,
            });
        }
    },

    logoutManager: async (req, res) => {
        if (req.headers && req.headers.authorization) {

            try {

                const token = req.headers.authorization.split(' ')[1];
                if (!token) {
                    return res.status(401).json({ 
                        success: false, 
                        message: 'Authorization fail!' 
                    });
                }

                const tokens = req.manager.tokens;

                const newTokens = tokens.filter(t => t.token !== token);

                await Manager.findByIdAndUpdate(req.manager._id, { tokens: newTokens }).exec();

                res.clearCookie("token");

                return res.status(200).json({
                    success: true,
                    message: "success to logout manager",
                });
            } catch (error) {
                return res.status(500).json({
                    message: "error in logout request",
                    error: error.message,
                });
            }
        }
        },

        authManager: async (req, res) => {
            try {
                const token = req.headers.authorization;

                if (!token) {
                    throw new Error("no token provided");
                }

                const bearer = token.split(" ")[1];

                const decode = jwt.verify(bearer, process.env.JWT_SECRET);

                const manager = await Manager.findById(decode.manager).exec();

                if (!manager || manager.permission !== 1) {
                    throw new Error("access denided");
                }

                return res.status(201).json({
                    success: true,
                    message: "manager authorized",
                    token,
                    manager: {
                        _id: manager._id,
                        manager_name: manager.manager_name,
                        manager_email: manager.manager_email
                    },
                });
            } catch (error) {
                return res.status(401).json({
                    message: "unauthorized",
                    error: error.message
                });
            }
        },

            //admin requests

            addManager: async (req, res) => {
                try {
                    const { manager_name, manager_email, manager_password, manager_password_confirm, manager_phone, manager_address, permission } = req.body;

                    if (!manager_name || !manager_password || !manager_password_confirm || !manager_email || !manager_phone || !manager_address) {
                        throw new Error("all fields are required");
                    }

                    if (manager_password !== manager_password_confirm) {
                        throw new Error("passwords do not match");
                    }
                    const hash = await bcrypt.hash(manager_password, 12);

                    const new_manager = new Manager({
                        manager_name,
                        manager_email,
                        manager_password: hash,
                        manager_phone,
                        manager_address,
                        permission: permission || 1
                    });

                    await new_manager.save();

                    return res.status(200).json({
                        success: true,
                        message: "success to add new manager",
                    });
                } catch (error) {
                    return res.status(500).json({
                        message: "error to add new manager",
                        error: error.message,
                    });
                }
            },

                deleteManager: async (req, res) => {
                    try {
                        const id = req.params.manager_id;

                        await Manager.findByIdAndDelete(id).exec();

                        return res.status(200).json({
                            success: true,
                            message: `success to delete manager by id`
                        });
                    } catch (error) {
                        return res.status(500).json({
                            message: `error to delete manager`,
                            error: error.message
                        });
                    }
                },

                    updateManager: async (req, res) => {
                        try {
                            const id = req.params.manager_id;

                            await Manager.findByIdAndUpdate(id, req.body).exec();

                            return res.status(200).json({
                                success: true,
                                message: "success to update manager by id"
                            });
                        } catch (error) {
                            return res.status(500).json({
                                message: "error to update manager by id",
                                error: error.message
                            });
                        }
                    },

                        registerAdmin: async (req, res) => {
                            try {

                                const {
                                    admin_name,
                                    admin_password,
                                    admin_password_confirm,
                                    admin_email,
                                    admin_phone,
                                    admin_address,
                                } = req.body;



                                if (
                                    !admin_name ||
                                    !admin_password ||
                                    !admin_password_confirm ||
                                    !admin_email ||
                                    !admin_phone ||
                                    !admin_address
                                ) {
                                    throw new Error("all fields are required");
                                }

                                if (admin_password !== admin_password_confirm) {
                                    throw new Error("passwords do not match");
                                }
                                const hash = await bcrypt.hash(admin_password, 12);



                                const admin = new Manager({
                                    admin_name,
                                    admin_password: hash,
                                    admin_email,
                                    admin_phone,
                                    admin_address,
                                    //note: admin permission allowed to be sended only from manager route (security issues)
                                });

                                await admin.save();

                                return res.status(201).json({
                                    success: true,
                                    message: "admin saved successfully",
                                    admin,
                                });
                            } catch (error) {
                                console.log(error);
                                return res.status(500).json({
                                    error: error.message,
                                });
                            }
                        }
    }