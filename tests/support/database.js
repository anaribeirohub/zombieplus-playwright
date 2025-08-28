const { Pool } = require('pg')

const DbConfig = {
  user: 'neondb_owner',
  host: 'ep-mute-cherry-ae0efkna-pooler.c-2.us-east-2.aws.neon.tech',
  database: 'zombieplus',
  password: 'npg_B94jlyvieSDV',
  port: 5432,
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
