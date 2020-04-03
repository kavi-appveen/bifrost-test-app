const MSG = require('../models/model.js');

// Create and Save a new Note
exports.create = async (req, res) => {

    await insert(1)

    res.send("ok")
};


insert = async (id) => {

    if (id > 1000)
        return

    const message = new MSG({
        _id: `H${id}`,
        message: "Hello World"
    });

    await message.save()
        .then(m => {
            console.log("message ",m)
        })
        .catch(err => {
            console.log("Error - ", err)
        })

    insert(id + 1);
}