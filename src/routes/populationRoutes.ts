import express, {Request, Response} from "express";
import * as populationModel from "../models/population";
import { Population, BasicPopulation } from "../types/population";
const populationRouter = express.Router();

populationRouter.get("/", async (req: Request, res: Response) => {
    populationModel.findAll((err: Error, populations: Population[]) => {
    if (err) {
      return res.status(500).json({"errorMessage": err.message});
    }

    res.status(200).json({"data": populations});
  });
});

populationRouter.post("/", async (req: Request, res: Response) => {
  const newPopulation: Population = req.body;
  populationModel.create(newPopulation, (err: Error, populationId: number) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }

    res.status(200).json({"populationId": populationId});
  });
});

populationRouter.put("/:id", async (req: Request, res: Response) => {
  const population: Population = req.body;
  populationModel.update(population, (err: Error, population: any) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }
    if (population.changedRows)
      res.status(200).send();
    else
      res.status(404).json({"msg": "population not found"});
  })
});

populationRouter.get("/:id", async (req: Request, res: Response) => {
  const populationId: number = Number(req.params.id);
  populationModel.findOne(populationId, (err: Error, population: Population) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }
    if (population.id)
      res.status(200).json({"data": population});
    else
      res.status(404).json({"msg": "population not found"});
  })
});

populationRouter.delete("/:id", async (req: Request, res: Response) => {
  const populationId: number = Number(req.params.id);
  populationModel.deleteOne(populationId, (err: Error, population: any) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }
    if (population.affectedRows)
      res.status(200).json({"data": populationId});
    else
      res.status(404).json({"message": "population not found"});
  })
});

export { populationRouter };