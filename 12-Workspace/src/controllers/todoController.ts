import { RequestHandler } from 'express';

import { Todo } from '../models/todoModel';
import exp from 'constants';

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
  const text = (req.body as { text: string }).text;

  const newTodo = new Todo(Math.random().toString(), text);
  TODOS.push(newTodo);

  res.status(201).json({
    status: 'success',
    message: 'Create the todo',
    data: newTodo,
  });
};

export const getTodos: RequestHandler = (req, res, next) => {
  res.status(200).json({ todos: TODOS });
};

export const updateTodos: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id;
  const updatedText = (req.body as { text: string }).text;
  const todoIndex = TODOS.findIndex(todo => todo.id === todoId);

  if (todoIndex < 0) throw new Error('Could not find todo!');
  TODOS[todoIndex] = { ...TODOS[todoIndex], text: updatedText };

  res.status(200).json({
    status: 'success',
    data: TODOS[todoIndex],
  });
};

export const deleteTodos: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id;
  const todoIndex = TODOS.findIndex(todo => todo.id === todoId);

  if (todoIndex < 0) throw new Error('Could not find todo!');

  TODOS.splice(todoIndex, 1);
  console.log(TODOS);

  res.status(204).json({
    status: 'success',
  });
};

export default {
  createTodo,
  getTodos,
  updateTodos,
  deleteTodos,
};
