TABLE NAME users
- id
- firstname
- lastname
- email
- password
- DOB
- sex
- blood_type

<!-- CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  firstname TEXT,
  lastname TEXT,
  email TEXT,
  password TEXT
  );

  CREATE TABLE relations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    name TEXT,
    relationship TEXT
    );

  INSERT INTO users VALUES (1,'john', 'doe', 'john@email.com', 'password');
  INSERT INTO users VALUES (2,'jane', 'doe', 'jane@email.com', 'password2');
  INSERT INTO users VALUES (3,'jim', 'doe', 'jim@email.com', 'password3');
  INSERT INTO users VALUES (4,'jess', 'doe', 'jess@email.com', 'password4');

  ALTER TABLE users ADD dob DATE;
  ALTER TABLE users ADD sex TEXT;
  ALTER TABLE users ADD sex TEXT; -->



-- Vitals --
TABLE NAME height_weight
- user_id
- height
- weight
- date

-- Health Events --
TABLE NAME surgeries
- user_id
- type ---->(surgery, illness, procedure, injury, other_event)
- name
- description
- date


-- Health Categories --
TABLE NAME health_categories
- user_id
- type ---->(food allergy, drug_allergy, other_category)
- name
- description
- date

-- Relatives --
TABLE NAME relations
- id
- user_id
- name
- relationship
