const { Pool } = require('pg');
const { PSQL_URI } = require('../envVars');
const { get } = require('http');

const db = new Pool({
  connectionString: PSQL_URI
});

const clothingTypes = {};

// create a new clothing type
clothingTypes.createType = async (typeObj) => {
  try {
    const { name, bodyPosition } = typeObj;

    const createQuery = `
      INSERT INTO clothingTypes
        ( name, bodyPosition )
      VALUES ( $1, $2 )
      RETURNING *;
    `;

    const res = await db.query(
      createQuery,
      [ name, bodyPosition ]
    );
    
    return res.rows[0];
  } catch (err) {
    return err;
  }
};

// delete by id
clothingTypes.deleteById = async (id) => {
  try {
    const deleteQuery = `
      DELETE FROM clothingTypes
      WHERE _id=$1
      RETURNING *;
    `;

    const res = await db.query(deleteQuery, [ id ]);

    return res.rows[0];
  } catch (err) {
    return err;
  }
};

// get a single clothing type by id
clothingTypes.getById = async (id) => {
  try {
    const getOneQuery = `
      SELECT * FROM clothingTypes
      WHERE _id=$1;
    `;

    const res = await db.query(getOneQuery, [ id ]);

    return res.rows[0];
  } catch (err) {
    return err;
  }
};

// get all clothing types
clothingTypes.getAll = async () => {
  try {
    const getAllQuery = `SELECT * FROM clothingTypes;`;

    const res = await db.query(getAllQuery);

    return res.rows;
  } catch (err) {
    return err;
  }
};

// update name and bodyPosition
// name should be unique
clothingTypes.updateType = async (id, typeObj) => {
  try {
    const { name, bodyPosition } = typeObj;

    const updateQuery = `
      UPDATE clothingTypes
      SET ( name, bodyPosition ) = ( $1, $2 )
      WHERE _id=$3
      RETURNING *;
    `;

    const res = await db.query(
      updateQuery,
      [ name, bodyPosition, id ]
    );

    return res.rows[0];
  } catch (err) {
    return err;
  }
};

module.exports = {
  clothingTypes,
  db
}