-- File: database/migrations/004_create_orders_table.sql
CREATE TABLE orders (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    status          order_status NOT NULL DEFAULT 'pending',
    order_type      order_type NOT NULL DEFAULT 'pickup',
    total_amount    NUMERIC(10, 2) NOT NULL CHECK (total_amount >= 0),
    delivery_address TEXT,
    contact_phone   VARCHAR(30) NOT NULL,
    notes           TEXT,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE TRIGGER trg_orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();