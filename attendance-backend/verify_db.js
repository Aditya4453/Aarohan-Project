import pool from './src/config/database.js';

const run = async () => {
  try {
    const [dbRow] = await pool.query('SELECT DATABASE() as db');
    console.log('Active database:', dbRow[0].db);
    const [tables] = await pool.query("SHOW TABLES");
    console.log('Tables:', tables.map(t => Object.values(t)[0]));
    const [rows] = await pool.query('SELECT id, name, email, role, LEFT(password, 20) as pw_prefix FROM user');
    if (rows.length === 0) {
      console.log('No users found in current DB.');
    } else {
      console.table(rows);
    }
  } catch (e) {
    console.error('Error inspecting DB:', e.message);
  } finally {
    pool.end();
  }
};
run();
