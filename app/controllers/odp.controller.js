const rp = require('request-promise')
const uuid = require('uuid/v4');
const XLSX = require('xlsx');
const config = require('../../config/config.js');

exports.create = async (req, res) => {
    console.log("Inside controller create", req.files)

    if (!req.files) {
        res.send({
            status: false,
            message: 'No file uploaded'
        });
    } else {

        let keys = Object.keys(req.files);
        let file = req.files[keys[0]];
        
        let fileName = uuid();
        let dir = './uploads/' + fileName;

        await file.mv(dir)

        let wb = XLSX.readFile(dir);
        let sheet_name_list = wb.SheetNames;

        let data = XLSX.utils.sheet_to_json(wb.Sheets[sheet_name_list[0]], { raw: true, defval: null });
        console.log("Data - ", data)

        let jsonData = [];

        await data.forEach(d => {
            jsonObj = {}
            jsonObj.name = {}
            jsonObj.name.lastName = d.lastName
            jsonObj.name.firstName = d.firstName
            jsonObj.dateOfBirth = JSON.stringify(d.dateOfBirth)
            jsonObj.dateOfJoining = JSON.stringify(d.dateOfJoining)
            jsonObj.salary = d.salary
            jsonObj.status = d.status
            jsonObj.email = d.email
            jsonObj.gender = d.gender

            jsonData.push(jsonObj)
        })
        
        console.log("Data ----------------\n", jsonData)

        var options = {
            uri: config.postUrl,
            method: "POST",
            headers: {
                'authorization': config.token
            },
            body: jsonData,//: jsonData[0]
            
            json: true // Automatically parses the JSON string in the response
        };

        console.log("Options - ", options)

        rp(options)
            .then(function (employees) {
                console.log('API Response - ', employees);
                res.send(employees)
            })
            .catch(function (err) {
                console.log(err.message, err.statusCode)
                res.send(err)
                // API call failed...
            });
    }
};

// Retrieve and return all employees from the odp.
exports.getEmployees = (req, res) => {

    var options = {
        uri: config.getUrl,
        headers: {
            'authorization': config.token
        },
        json: true // Automatically parses the JSON string in the response
    };

    rp(options)
        .then(function (employees) {
            console.log('User has %d repos', employees.length);
            res.send(employees)
        })
        .catch(function (err) {
            console.log(err.message, err.statusCode)
            res.send(err)
            // API call failed...
        });
};