DROP DATABASE IF EXISTS employees_DB;

CREATE database employees_DB;

USE employees_DB;

CREATE TABLE department (
  id INTEGER NOT NULL auto_increment PRIMARY KEY,
  name VARCHAR(30)
);

INSERT INTO department(name)
VALUES ('HR'), ('IT'), ('AV'), ('Executive');

CREATE TABLE role (
  id INTEGER NOT NULL auto_increment PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INTEGER,
  FOREIGN KEY (department_id) REFERENCES department(id)
);

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('HR Manager', 100000, 1),
    ('HR Assistant', 40000, 1),
    ('Team Lead', 150000, 2),
    ('Team Analyst', 80000, 2),
    ('Media Manager', 70000, 3),
    ('Media Specialist', 30000, 3),
    ('CEO', 450000, 4),
    ('CEO Assistant', 60000, 4);

CREATE TABLE employee (
  id INTEGER NOT NULL auto_increment PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INTEGER,
  manager_id INTEGER,
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id)
);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Jackie', 'Marks', 1, NULL),
    ('Michael', 'Perez', 2, 1),
    ('Dave', 'Lawson', 3, NULL),
    ('John', 'McEwen', 4, 3),
    ('Tifanie', 'De La Cruz', 5, NULL),
    ('Estephania', 'Perez', 6, 5),
    ('Tim', 'Green', 7, NULL),
    ('Juline', 'Brooks', 8, 7);