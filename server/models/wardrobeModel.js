const { Pool } = require('pg');
const { PSQL_URI } = require('../envVars');

const db = new Pool({
  connectionString: PSQL_URI
});

const wardrobes = {};

wardrobes.createWardrobe = async (wardrobeObj) => {
  try {
    const {
      userId,
      name
    } = wardrobeObj;

    const createQuery = `
      INSERT INTO wardrobes
        (userId, name)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const res = await db.query(
      createQuery,
      [ userId, name ]
    );

    return res.rows[0];
  } catch (err) {
    return err;
  }
};

wardrobes.deleteById = async (id) => {
  try {
    const delQuery = `
      DELETE FROM wardrobes
      WHERE _id=$1
      RETURNING *;
    `;
    const res = await db.query(delQuery, [ id ]);

    return res.rows[0];
  } catch (err) {
    return err;
  }
};

wardrobes.getById = async (id) => {
  try {
    const queryWardrobe = `
      SELECT *
      FROM wardrobes
      WHERE _id=$1;
    `;

    const res = await db.query(queryWardrobe, [ id ]);

    return res.rows[0];
  } catch (err) {
    return err;
  }
};

wardrobes.getAll = async () => {
  try {
    const queryAll = `SELECT * FROM wardrobes`;

    const res = await db.query(queryAll);

    return res.rows;
  } catch (err) {
    return err;
  }
};

wardrobes.updateWardrobe = async (id, wardrobeObj) => {
  try {
    const { userId, name } = wardrobeObj;
    const current = await wardrobes.getById(id);
    
    if (userId !== current.userId) {
      throw Error('Cannot change the userId');
    }

    const updateQuery = `
      UPDATE wardrobes
      SET name=$1
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
}

module.exports = {
  wardrobes,
  db
};