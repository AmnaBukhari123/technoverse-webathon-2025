const pool = require('../config/db');

const fixUsersTable = async () => {
  try {
    await pool.query(`
      ALTER TABLE users ADD COLUMN username VARCHAR(100);
    `);
    console.log('✅ Added "username" column to users table!');
  } catch (err) {
    console.error('❌ Error fixing users table:', err);
  } finally {
    process.exit();
  }
};

fixUsersTable();
