//file models/population.ts

import {BasicPopulation, Population } from "../types/population";
import {db} from "../db";
import { OkPacket, RowDataPacket } from "mysql2";

export const findAll = (callback: Function) => {
    const queryString = `
      SELECT 
        p.* 
      FROM population AS p`
  
    db.query(queryString, (err, result) => {
      if (err) {callback(err)}
  
      const rows = <RowDataPacket[]> result;
      const populations: Population[] = [];
  
      rows.forEach(row => {
        const population: Population =  {
          id: row.id,
          city: row.city,
          geoId: row.geo_id,
          state: row.state,
          totalPopulation: row.total_population

        }
        populations.push(population);
      });
      callback(null, populations);
    });
  }

  export const findOne = (populationId: number, callback: Function) => {
    const queryString = `
      SELECT 
        p.* 
      FROM population AS p
      WHERE p.id=?`
  
    db.query(queryString, populationId,(err, result) => {
      if (err) {callback(err)}
        let row = (<RowDataPacket[]> result)[0];
        if (row === undefined) {
          const population: Population =  {
            id: 0,
            city: '',
            geoId: '',
            state: '',
            totalPopulation: 0
          }
          callback(null, population);
        } else {
          const population: Population =  {
            id: row.id,
            city: row.city,
            geoId: row.geo_id,
            state: row.state,
            totalPopulation: row.total_population
          }
          callback(null, population);
        }
    });
  }

  export const create = (population: Population, callback: Function) => {
    const queryString = "INSERT INTO population (city, geo_id, state, total_population) VALUES (?, ?, ?, ?)"
  
    db.query(
      queryString,
      [population.city, population.geoId, population.state, population.totalPopulation],
      (err, result) => {
        if (err) {callback(err)};
  
        const insertId = (<OkPacket> result).insertId;
        callback(null, insertId);
      }
    );
  };

  export const update = (population: Population, callback: Function) => {
    const queryString = `UPDATE population 
                         SET total_population=? WHERE id=?`;
  
    db.query(
      queryString,
      [population.totalPopulation, population.id],
      (err, result) => {
        if (err) {callback(err)}
        callback(null, result);
      }
    );
  }

  export const deleteOne = (populationId: number, callback: Function) => {
    const queryString = `
      DELETE 
      FROM population 
      WHERE id=?`
  
    db.query(queryString,
        populationId,
        (err, result) => {
            if (err) {callback(err)}
            callback(null, result);
        }
    );
  }