const db = require('.');

const CreateUsers = () => {
  const deleteStmt = db.prepare(`
  DROP TABLE IF EXISTS users
  `);
  deleteStmt.run();
  console.log('Tabla de usuarios eliminada');
  const stmt = db.prepare(`
  CREATE TABLE users (
    user_id TEXT PRIMARY KEY,
    name TEXT NOT NULL
  )
  `);
  stmt.run();
  console.log('Tabla de usuarios creada');
};

const CreateTables = () => {
  CreateUsers();
};
CreateTables();

const CreateNotes = () => {
  const deleteStmt = db.prepare(`
  DROP TABLE IF EXISTS pkm
  `);
  deleteStmt.run();
  console.log('Tabla de usuarios eliminada');
  const stmt = db.prepare(`
  CREATE TABLE pkm (
    user_id TEXT,
    poke_name TEXT NOT NULL
  )
  `);
  stmt.run();
  console.log('Tabla de usuarios creada');
};

const CreateTable = () => {
  CreateNotes();
};
CreateTable();

