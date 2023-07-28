const { db } = require('../envVars');

/*
  Thoughts:
    What exactly will we save on an article of clothing?
    Will each article of clothing get it's own schema?
    What about extensibility (e.g. jewelry, shoes, accessories)?
    Since there are clothes stored in Mongo and Postgres, should this be 2 files
*/ 
const clothes = {};

clothes.createClothing = async (clothingObj) => {
  try {
    const {
      wardrobeId,
      typeId,
      noSqlKey
    } = clothingObj;

    const createQuery = `
      INSERT INTO clothing
        ( wardrobeId, typeId, noSqlKey)
      VALUES ( $1, $2, $3 )
      RETURNING *;
    `;

    const res = await db.query(
      createQuery,
      [ wardrobeId, typeId, noSqlKey ]
    );

    return res.rows[0];
  } catch (err) {
    return err;
  }
};

clothes.getById = async (id) => {
  try {
    const getQuery = `SELECT * FROM clothing WHERE _id=$1;`;

    const res = await db.query( getQuery, [ id ] );

    return res.rows[0];
  } catch (err) {
    return err;
  }
};

clothes.getByNoSqlKey = async (key) => {
  try {
    const getQuery = `SELECT * FROM clothing WHERE nosqlkey=$1;`;

    const res = await db.query( getQuery, [ key ] );

    return res.rows[0];
  } catch (err) {
    return err;
  }
}

clothes.getByWardrobeId = async (id) => {
  try {
    const getQuery = `SELECT * FROM clothing WHERE wardrobeid=$1;`;

    const res = await db.query( getQuery, [ id ] );

    return res.rows;
  } catch (err) {
    return err;
  }
}

clothes.getAll = async () => {
  try {
    const getQuery = `SELECT * FROM clothing;`;

    const res = await db.query( getQuery);

    return res.rows;
  } catch (err) {
    return err;
  }
}

clothes.updateClothing = async (id, clothingObj) => {
  try {
    const { typeId } = clothingObj;

    // is it worth checking if the typeid has changed?
    if (!typeId) {
      throw Error('You may only change typeid');
    }

    const updateQuery = `
      UPDATE clothing
      SET typeid=$1
      WHERE _id=$2
      RETURNING *;
    `;

    const res = await db.query(
      updateQuery,
      [ typeId, id ]
    );

    return res.rows[0];
  } catch (err) {
    return err;
  }
};

clothes.deleteById = async (id) => {
  try {
    const deleteQuery = `
      DELETE FROM clothing
      WHERE _id=$1
      RETURNING *;
    `;

    const res = await db.query( deleteQuery, [ id ] )

    return res.rows[0];
  } catch (err) {
    return err;
  }
};

module.exports = {
  db,
  clothes,
  p: clothes
};