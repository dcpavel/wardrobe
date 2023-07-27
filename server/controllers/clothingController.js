import * as m from '../models/noSqlClothingModel';
import * as p from '../models/sqlClothingModel';
import fs from 'filesystem';
import sharp from 'sharp';

const pClothes = p.clothes;
const mClothes = m.clothes;

const createErr = (errInfo) => {
  const { method, type, err } = errInfo
  return {
    log: `clothingController.${method} ${type}: ERROR: ${
      typeof err === "object" ? JSON.stringify(err) : err
    }`,
    message: {
      err: `Error occurred in clothingController.${method}. ${type}`,
    },
  }
}

const clothingController = {};

clothingController.create = (req, res, next) => {

}

module.exports = clothingController;