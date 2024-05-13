import { Router } from 'express';
import deleteAllDataController from '../controllers/testing/deleteAllDataController';

export const testingRouter = Router();

testingRouter.delete('/all-data', deleteAllDataController);
