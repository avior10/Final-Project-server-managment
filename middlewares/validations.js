module.exports = {
    userAddValidation: (req, res, next) => {

        try {

            const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


            const {
                user_name,
                user_email,
                user_password,
                user_password_confirm,
                user_phone,
                user_address
            } = req.body;

            if (!user_name || !user_email || !user_password || !user_password_confirm || !user_phone || !user_address) {
                throw new Error("missing required feilds");
            };

            if (!email_regex.test(user_email)) {
                throw new Error("email should be a valid email");
            };

            if (!password_regex.test(user_password)) {
                throw new Error("password should have a letter, big letter and number and specail sign");
            };

            if (user_password !== user_password_confirm) {
                throw new Error("passwords are dont match");
            }

            next();

        } catch (error) {
            return res.status(500).json({
                message: "error in user validation",
                error: error.message
            })
        }

    },

    managerAddValidation: async (req, res) => {
        try {

            const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


            const {
                manager_name,
                manager_email, 
                manager_password, 
                manager_password_confirm, 
                manager_phone, 
                manager_address
            } = req.body;

            if (!manager_name || !manager_password || !manager_password_confirm || !manager_email || !manager_phone || !manager_address) {
                throw new Error("missing required feilds");
            };

            if (!email_regex.test(manager_email)) {
                throw new Error("email should be a valid email");
            };

            if (!password_regex.test(manager_password)) {
                throw new Error("password should have a letter, big letter and number and specail sign");
            };

            if (manager_password !== manager_password_confirm) {
                throw new Error("passwords are dont match");
            }

            next();

        } catch (error) {
            return res.status(500).json({
                message: "error in manager validation",
                error: error.message
            })
        }

    }
}