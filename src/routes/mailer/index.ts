import { Router } from "express"
import { SES } from "aws-sdk"
const {SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");
const router = Router();
const REGION = "us-west-1"

//Mailer for Grabbing Feedback
router.post('/process', (req, res) => {
    const params = {
        Destination: {
            CcAddresses: [
                'fhs.studybuddies@gmail.com'
            ],
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: "HTML_FORMAT_BODY"
                },
                Text: {
                    Charset: "UTF-8",
                    Data: req.body.email
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: req.body.ques
            }
          },
          Source: 'fhs.studybuddies@gmail.com',
          ReplyToAddresses: [
              'fhs.studybuddies@gmail.com'
          ],
    };
    const ses = new SESClient({region: REGION});

    const run = async() => {
        try {
            const data = await ses.send(new SendEmailCommand(params));
            console.log("Success", data);
        } catch (err) {
            console.log("Error", err);
        }
    }
    run();
});

//Mailer for Sending Student Notifications
router.post('/notify', (req, res) => {
    const params = {
        Destination: {
            CcAddresses: [
                req.body.studentEmail
            ],
            ToAddresses: [
                req.body.studentEmail2
            ]
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: "HTML_FORMAT_BODY"
                },
                Text: {
                    Charset: "UTF-8",
                    Data: req.body.notification
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: 'Email From Your Tutor: ' + req.body.tutorEmail
            }
          },
          Source: 'fhs.studybuddies@gmail.com',
          ReplyToAddresses: [
              'fhs.studybuddies@gmail.com'
          ],
    };
    const ses = new SESClient({region: REGION});

    const run = async() => {
        try {
            const data = await ses.send(new SendEmailCommand(params));
            console.log("Success", data);
        } catch (err) {
            console.log("Error", err);
        }
    }
    run();
});

export const mailerRouter = router;