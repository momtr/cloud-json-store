const express = require('express');

const FirebaseRealTime = require('../firebase');
const db = new FirebaseRealTime();

const schemas = require('../schemas');

const uuid = require('uuid');

const router = express.Router();

/**
 * gets a JSON from the Cloud and expects a key
 */
router.get('/data', async (req, res, next) => {
    let data = req.query;
    /** validate collection and key */
    let validate = schemas.schema_get_data.validate(data);
    if(validate.error) {
        res.json({
            status: 'error',
            message: '🔴 key and name are not valid!',
            customCode: 0
        });
        return;
    }
    /** get data and return it */
    const collection = `${data.name}_${data.key}`;
    const jsonData = await db.getData(`collections/${collection}`);
    if(!jsonData || Object.keys(jsonData).length === 0) {
        res.json({
            status: 'error',
            message: '🔴 json storage space does not exist',
            customCode: 1,
            joiErr: validate.error
        });
        return;
    }
    res.json({
        status: 'success',
        message: '🟢 data given',
        data: { jsonData }
    });
});

/**
 * saves JSON to the Cloud and returns the key for it!
 */
router.post('/data', (req, res, next) => {
    let data = req.query;
    try {
        data.data = JSON.parse(data.data);
    } catch(e) {
        res.send({
            status: 'error',
            message: '🔴 json not valid',
            customCode: 2
        });
        return;
    }
    /** validate data (name, json) */
    let validate = schemas.schema_post_data.validate(data);
    if(validate.error) {
        res.send({
            status: 'error',
            message: '🔴 json and name are not valid',
            customCode: 2,
            joiErr: validate.error
        });
        return;
    }
    /** store data and respond key */
    let key = uuid.v1();
    let collection = `${data.name}_${key}`;
    db.insertData('collections', collection, data.data);
    res.json({
        status: 'success',
        message: '🟢 data stored',
        data: { key, collection }
    });
});

module.exports = router;