import bodyParser from 'body-parser';
import { app } from './app';
import express from 'express';
import { SETTINGS } from './settings';

app.listen(SETTINGS.PORT, () => {
  console.log(SETTINGS.PORT);
});
