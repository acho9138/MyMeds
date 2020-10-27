// Node Libraries
const moment = require('moment');
const nodemailer = require('nodemailer');

// Models
const MedDB = require('../models/med');
const UserDB = require('../models/user')

// Controller
module.exports = {
  medReminder: () => {
    const currentTimeLower = moment().seconds(0).milliseconds(0).toDate();
    const currentTimeUpper = moment().add(1, 'minutes').seconds(0).milliseconds(0).toDate();
    console.log(currentTimeUpper)
    console.log(currentTimeLower)

    MedDB.find({
      startDate: {
        $lte: currentTimeLower,
        $gte: currentTimeUpper,
      },

    })
      .then(medModel => {
        for (const med of medModel) {
          const userId = med.userId
          UserDB.findOne({
            _id: userId
          }).then(userModel => {
            console.log(userModel)
            const email = userModel.username

            const transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: process.env.GMAIL_EMAIL,
                pass: process.env.GMAIL_PASSWORD
              }
            });

            const mailOptions = {
              from: process.env.GMAIL_EMAIL,
              to: 'anna.s.chong@gmail.com',
              subject: `REMINDER: Take ${med.name}`,
              text: 'Please remember to take the medication' + JSON.stringify(med)
            };

            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
            });
          })
        }

      })
      .catch(err => console.log(err))
  }
}