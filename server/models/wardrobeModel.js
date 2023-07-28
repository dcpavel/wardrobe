const { db } = require('../envVars');

const wardrobes = {};

// create a new wardrobe
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

// delete a wardrobe
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

// get a single wardrobe by _id
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

// get all the wardrobes
wardrobes.getAll = async () => {
  try {
    const queryAll = `SELECT * FROM wardrobes;`;

    const res = await db.query(queryAll);

    return res.rows;
  } catch (err) {
    return err;
  }
};

// get all the wardrobes by user id
wardrobes.getAllByUserId = async (id) => {
  try {
    const queryAll = `
      SELECT *
      FROM wardrobes
      WHERE userid=$1
      ORDER BY _id ASC;
    `;

    const res = await db.query(queryAll, [ id ]);

    return res.rows;
  } catch (err) {
    return err;
  }
};

// update a wardrobe with a new name ONLY
wardrobes.updateWardrobe = async (id, wardrobeObj) => {
  try {
    const { userId, name } = wardrobeObj;
    const current = await wardrobes.getById(id);

    if (userId !== current.userid) {
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
    const check = await db.query(`SELECT * FROM wardrobes;`);
    
    return res.rows[0];
  } catch (err) {
    return err;
  }
}

module.exports = {
  wardrobes,
  db
};