import * as nodemailer from "nodemailer";

export async function handler(event, context) {
    console.log(event.body)
    const data = JSON.parse(event.body);
    var mailOpts, smtpTrans;
    smtpTrans = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });
    mailOpts = {
        from: data.name + " &lt;" + data.email + "&gt;",
        to: process.env.EMAIL,
        subject: "New message from contact form at connerleigh.com",
        text: `${data.name} (${data.email}) says: ${data.subject}: ${data.message}`
    };

    const response = await new Promise(resolve => {
        smtpTrans.sendMail(mailOpts, function (error, res) {
            if (error) {
                console.error(error)
                resolve({
                    statusCode: 500,
                    body: res
                });
            } else {
                resolve({
                    statusCode: 200,
                    body: res
                });
            }
        });
    });
    return response;
};