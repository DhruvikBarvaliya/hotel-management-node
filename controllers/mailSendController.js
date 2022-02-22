const nodemailer = require('nodemailer');

const mailSend = (req, res) => {
    const { email, subject, message } = req.body
    if (!email || !subject || !message) {
        return res.json({ message: "Please Give All Manadatory Fields" })
    }

    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "dhruvik.barvaliya.blackwolve@gmail.com",
                pass: "dhruvik123"
            }
        });

        let message = {
            from: "dhruvik.barvaliya.blackwolve@gmail.com",
            to: req.body.email,
            subject: req.body.subject,
            html: `<h1>${req.body.message}</h1>`
        }

        transporter.sendMail(message, function (err, info) {
            if (err) {
                console.log(err);
                res.status(200).json({ message: err })

            } else {
                console.log(info);
                res.status(200).json({ message: "Mail Successfully Send" })
            }
        })
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

module.exports = mailSend