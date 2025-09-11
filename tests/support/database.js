require('dotenv').config()

const { Pool } = require('pg')

const DbConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: true
}

async function executeSQL(sqlScript) {
  const pool = new Pool(DbConfig)
  try {
    const client = await pool.connect()
    const result = await client.query(sqlScript)
    client.release()
    return result
  } catch (error) {
    console.error('Erro ao executar SQL:', error.message)
  } finally {
    await pool.end()
  }
}

// 👇 Exportando corretamente
module.exports = {
  executeSQL
}
