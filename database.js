const mongoose = require('mongoose')

class Database {

    constructor() {
        this.connect()
    }

    connect() {
        mongoose.connect('mongodb+srv://twitterclone:Pass123@cluster0.5ynfv.mongodb.net/TwitterClone?retryWrites=true&w=majority')
        .then(() => {
            console.log("Database Connected :)")
        })
        .catch(() => {
            console.log("DB Error :(")
        });
    }
}

module.exports = new Database;