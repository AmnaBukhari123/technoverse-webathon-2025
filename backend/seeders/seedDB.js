const pool = require('../config/db');

const seed = async () => {
  try {
    // Seed departments
    await pool.query(`
      INSERT INTO departments (name)
      VALUES ('Transport'), ('Sanitation'), ('Health')
      ON CONFLICT (name) DO NOTHING;
    `);

    // Seed roles
    await pool.query(`
      INSERT INTO roles (name)
      VALUES ('admin'), ('official'), ('citizen')
      ON CONFLICT (name) DO NOTHING;
    `);

    // Seed permissions
    const permissions = [
      'manage_users',
      'manage_roles',
      'assign_tasks',
      'view_analytics',
      'manage_department_data',
      'coordinate_departments',
      'issue_management',
      'ar_field_assistance',
      'report_issues',
      'track_updates',
      'vote_on_proposals',
      'ar_issue_reporting'
    ];

    for (const perm of permissions) {
      await pool.query(`
        INSERT INTO permissions (name)
        VALUES ($1)
        ON CONFLICT (name) DO NOTHING;
      `, [perm]);
    }

    // Map role_permissions
    const rolePermissions = {
      admin: [
        'manage_users',
        'manage_roles',
        'assign_tasks',
        'view_analytics'
      ],
      official: [
        'manage_department_data',
        'coordinate_departments',
        'issue_management',
        'ar_field_assistance'
      ],
      citizen: [
        'report_issues',
        'track_updates',
        'vote_on_proposals',
        'ar_issue_reporting'
      ]
    };

    // Fetch role IDs
    const { rows: roleRows } = await pool.query('SELECT id, name FROM roles;');
    const roleIdMap = {};
    roleRows.forEach(r => roleIdMap[r.name] = r.id);

    // Fetch permission IDs
    const { rows: permRows } = await pool.query('SELECT id, name FROM permissions;');
    const permIdMap = {};
    permRows.forEach(p => permIdMap[p.name] = p.id);

    // Insert into role_permissions
    for (const [role, perms] of Object.entries(rolePermissions)) {
      for (const perm of perms) {
        await pool.query(`
          INSERT INTO role_permissions (role_id, permission_id)
          VALUES ($1, $2)
          ON CONFLICT DO NOTHING;
        `, [roleIdMap[role], permIdMap[perm]]);
      }
    }

    // Create an example admin user
    await pool.query(`
      INSERT INTO users (username, email, password, role_id)
      VALUES ('admin', 'admin@city.com', 'adminhashedpassword', $1)
      ON CONFLICT (email) DO NOTHING;
    `, [roleIdMap['admin']]);

    console.log('✅ Seed data inserted successfully!');
    process.exit();
  } catch (err) {
    console.error('❌ Error seeding data:', err);
    process.exit(1);
  }
};

seed();
