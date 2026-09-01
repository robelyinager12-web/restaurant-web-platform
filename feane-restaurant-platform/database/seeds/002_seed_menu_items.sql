-- File: database/seeds/002_seed_menu_items.sql
INSERT INTO menu_items (category_id, name, description, price, is_available)
SELECT id, 'Classic Cheeseburger', 'Beef patty, cheddar, lettuce, tomato, house sauce', 6.99, TRUE
FROM menu_categories WHERE slug = 'burgers';

INSERT INTO menu_items (category_id, name, description, price, is_available)
SELECT id, 'Double Bacon Burger', 'Double beef patty, bacon, cheddar, BBQ sauce', 9.49, TRUE
FROM menu_categories WHERE slug = 'burgers';

INSERT INTO menu_items (category_id, name, description, price, is_available)
SELECT id, 'French Fries', 'Crispy golden fries, salted', 2.99, TRUE
FROM menu_categories WHERE slug = 'sides';

INSERT INTO menu_items (category_id, name, description, price, is_available)
SELECT id, 'Onion Rings', 'Battered and fried onion rings', 3.49, TRUE
FROM menu_categories WHERE slug = 'sides';

INSERT INTO menu_items (category_id, name, description, price, is_available)
SELECT id, 'Cola', '330ml can', 1.99, TRUE
FROM menu_categories WHERE slug = 'drinks';

INSERT INTO menu_items (category_id, name, description, price, is_available)
SELECT id, 'Chocolate Milkshake', 'Rich chocolate shake, whipped cream', 4.49, TRUE
FROM menu_categories WHERE slug = 'desserts';