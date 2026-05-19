import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export default async function handler(req, res) {
  try {
    const result = await pool.query('select now() as fecha_actual');

    res.status(200).json({
      ok: true,
      message: 'Conexión con Supabase funcionando',
      fecha_actual: result.rows[0].fecha_actual
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message
    });
  }
}
