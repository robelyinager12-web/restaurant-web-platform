-- File: database/seeds/003_seed_admin_user.sql
-- password_hash below is a placeholder — replace with a real bcrypt hash:
-- node -e "console.log(require('bcrypt').hashSync('your-password', 10))"
INSERT INTO users (name, email, password_hash, role)
VALUES ('Restaurant Admin', 'admin@feane.local', '$2b$10$REPLACE_WITH_REAL_BCRYPT_HASH', 'admin');