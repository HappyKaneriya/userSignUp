const express = require('express');
const { connectToDB, sql } = require('../DbConnect/datasql');
const app = express()
const port = 3000

app.use(express.json());

let dBpool;
connectToDB().then(pool => {
    dBpool = pool;
    app.listen(3000, () => {
        console.log('🚀 Server running on http://localhost:3000');
    });
})
    .catch(err => console.error('❌ DB Connection Error:', err));


app.post('/RegisterUser', async (req, res) => {
    const { firstName, lastName, dob, emailId, contactNumber, password, gender, address, city, pincode, state, country } = req.body;

    try {
        const result = await dBpool.request()
            .input('FirstName', sql.NVarChar(100), firstName)
            .input('LastName', sql.NVarChar(100), lastName)
            .input('DOB', sql.Date, dob)
            .input('EmailID', sql.NVarChar(50), emailId)
            .input('ContactNumber', sql.NVarChar(15), contactNumber)
            .input('Password', sql.NVarChar(50), password)
            .input('Gender', sql.NVarChar(15), gender)
            .input('Address', sql.NVarChar(250), address)
            .input('City', sql.NVarChar(50), city)
            .input('PinCode', sql.Int, pincode)
            .input('State', sql.NVarChar(50), state)
            .input('Country', sql.NVarChar(50), country)
            .execute('RegisterUser');
        res.status(201).send('User inserted successfully');
    } catch (err) {
        console.error('❌ Error inserting user:', err);
        res.status(500).send('Database insert failed');
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});