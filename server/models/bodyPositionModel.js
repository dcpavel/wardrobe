const { db } = require('../envVars');

const bodyPositions = {};

// create a new clothing type
// ADMIN ONLY
bodyPositions.createType = async (typeObj) => {
  try {
    const { name } = typeObj;

    const createQuery = `
      INSERT INTO bodyPositions
        ( name  )
      VALUES ( $1 )
      RETURNING *;
    `;

    const res = await db.query(
      createQuery,
      [ name ]
    );
    
    return res.rows[0];
  } catch (err) {
    return err;
  }
};

// delete by id
// ADMIN ONLY
bodyPositions.deleteById = async (id) => {
  try {
    const deleteQuery = `
      DELETE FROM bodyPositions
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
bodyPositions.getById = async (id) => {
  try {
    const getOneQuery = `
      SELECT * FROM bodyPositions
      WHERE _id=$1;
    `;

    const res = await db.query(getOneQuery, [ id ]);

    return res.rows[0];
  } catch (err) {
    return err;
  }
};

// get all clothing types
bodyPositions.getAll = async () => {
  try {
    const getAllQuery = `SELECT * FROM bodyPositions;`;

    const res = await db.query(getAllQuery);

    return res.rows;
  } catch (err) {
    return err;
  }
};

// update name and bodyPosition
// name should be unique
bodyPositions.updateType = async (id, typeObj) => {
  try {
    const { name } = typeObj;

    const updateQuery = `
      UPDATE bodyPositions
      SET ( name ) = ( $1 )
      WHERE _id=$2
      RETURNING *;
    `;

    const res = await db.query(
      updateQuery,
      [ name, id ]
    );

    return res.rows[0];
  } catch (err) {
    return err;
  }
};

module.exports = {
  bodyPositions,
  db
}