-- Example: properties table
CREATE TABLE IF NOT EXISTS properties (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    price NUMERIC NOT NULL,
    details TEXT NOT NULL,
    sq_ft_or_area NUMERIC NOT NULL,
    image_urls TEXT[],
    views INT DEFAULT 0
);

-- Example: users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name VARCHAR(255)
);

-- Example: agent_contacts table
CREATE TABLE IF NOT EXISTS agent_contacts (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id),
    property_id INT NOT NULL REFERENCES properties(id),
    message TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 1️⃣ Insert properties first
INSERT INTO properties (name, location, price, details, sq_ft_or_area, image_urls, views)
SELECT
    'Property ' || gs AS name,
    'City ' || (1 + (random()*10)::int) || ', Neighborhood ' || (1 + (random()*50)::int) AS location,
    (50000 + (random()*950000)::int) AS price,
    'This is a beautiful property number ' || gs AS details,
    (500 + (random()*4500)::int) AS sq_ft_or_area,
    ARRAY[
      CASE WHEN random() < 0.5 THEN '/sample data/images/properties/property1.jpg'
           ELSE '/sample data/images/properties/property2.jpg'
      END
    ] AS image_urls,
    (random()*500)::int AS views
FROM generate_series(1,1000) AS gs;

-- 2️⃣ Insert users
INSERT INTO users (email, password, name) VALUES
('user1@example.com', '$2b$10$Z1a4hX/2U0wJ9w7F1p1A2eQK/5qP3vXkD3hTtJz6YlBvXqk9d8n3e', 'User One'),
('user2@example.com', '$2b$10$Z1a4hX/2U0wJ9w7F1p1A2eQK/5qP3vXkD3hTtJz6YlBvXqk9d8n3e', 'User Two');

-- 3️⃣ Insert agent_contacts after properties and users exist
INSERT INTO agent_contacts (user_id, property_id, message)
SELECT 
    (1 + (random()*1)::int),   -- user_id 1 or 2
    (1 + (random()*1000)::int), -- property_id 1 to 1000
    'Interested in this property'
FROM generate_series(1, 50);

-- 4️⃣ Indexes
CREATE INDEX idx_properties_views ON properties(views DESC);
CREATE INDEX idx_properties_fulltext ON properties USING gin(to_tsvector('english', name || ' ' || details));
