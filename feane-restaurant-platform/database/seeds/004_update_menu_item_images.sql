-- File: database/seeds/004_update_menu_item_images.sql
UPDATE menu_items SET image_url = '/images/menu/classic-cheeseburger.jpg' WHERE name = 'Classic Cheeseburger';
UPDATE menu_items SET image_url = '/images/menu/double-bacon-burger.jpg' WHERE name = 'Double Bacon Burger';
UPDATE menu_items SET image_url = '/images/menu/french-fries.jpg' WHERE name = 'French Fries';
UPDATE menu_items SET image_url = '/images/menu/onion-rings.jpg' WHERE name = 'Onion Rings';
UPDATE menu_items SET image_url = '/images/menu/cola.jpg' WHERE name = 'Cola';
UPDATE menu_items SET image_url = '/images/menu/chocolate-milkshake.jpg' WHERE name = 'Chocolate Milkshake';