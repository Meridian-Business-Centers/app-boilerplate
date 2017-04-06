const pg = require('pg');


function getClient() {
    return new Promise((resolve, reject) => {
        pg.connect('postgres://localhost', (err, client) => {
            if (err) {
                return reject(err);
            }
            return resolve(client);
        });
    });
}

async function doQuery(statement, bind) {
    let client = await getClient();
    let result = await new Promise((resolve, reject) => {
        client.query(statement, bind, (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
    client.end();
    return result;
}

/**
 * Db Object
 * @type {{row: ((p1?:*, p2?:*)), rows: ((p1?:*, p2?:*)), execute: ((p1?:*, p2?:*))}}
 */
module.exports = {
    row: async (query, bind) => {
        let result = await doQuery(query, bind);
        return result.rows[0];
    },
    rows: async (query, bind) => {
        let result = await doQuery(query, bind);
        return result.rows;
    },
    execute: async (query, bind) => {
        let result = await doQuery(query, bind);
        return result.rowCount;
    },
};
