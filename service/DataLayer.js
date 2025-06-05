const isProduction = process.env.NODE_ENV === 'production';

module.exports = (require("knex"))({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL || "postgres://i:SEDI9QyhkNGN2pi7a8nloU7UageDv4O4@dpg-d0ufvfmmcj7s739l78dg-a.frankfurt-postgres.render.com:5432/bh_db_xc3m",
      ssl: !isProduction ? { rejectUnauthorized: false } : false
    }
});


