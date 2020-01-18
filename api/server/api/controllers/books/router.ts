import express from 'express';
import controller from './controller';
import passport from 'passport';

export default express
  .Router()
  .post('/', controller.create)
  .delete('/:id', controller.delete)
  .get('/:id', controller.getById)
  .get('/', controller.getAll);
