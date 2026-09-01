-- File: database/migrations/006_create_bookings_table.sql
CREATE TABLE bookings (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID REFERENCES users(id) ON DELETE SET NULL,
    name            VARCHAR(120) NOT NULL,
    email           VARCHAR(255) NOT NULL,
    phone           VARCHAR(30) NOT NULL,
    party_size      INTEGER NOT NULL CHECK (party_size > 0),
    booking_date    DATE NOT NULL,
    booking_time    TIME NOT NULL,
    status          booking_status NOT NULL DEFAULT 'pending',
    notes           TEXT,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_bookings_booking_date ON bookings(booking_date);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE TRIGGER trg_bookings_updated_at BEFORE UPDATE ON bookings
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();