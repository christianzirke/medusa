import express from 'express';
import controller from './controller';

export default express
  .Router()
  .post('/', controller.create)
  .delete('/:id', controller.delete)
  .get('/:id', controller.getById)
  .get('/', controller.getAll);
