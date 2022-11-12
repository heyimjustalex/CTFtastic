USE db;

CREATE TABLE team(
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50),
  password_hash VARCHAR(350) NOT NULL,
  points INTEGER,
  website VARCHAR(50),
  affiliation VARCHAR(50),
  is_verified BOOLEAN,
  is_banned BOOLEAN NOT NULL,
  is_hidden BOOLEAN NOT NULL
);

CREATE TABLE duty (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  name_role VARCHAR(100) NOT NULL
);

CREATE TABLE participant (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,

  username VARCHAR(25) NOT NULL,

  id_team INTEGER,
  id_role INTEGER NOT NULL,
  email VARCHAR(25) NOT NULL,
  password_hash VARCHAR(350) NOT NULL,
  website VARCHAR(50),
  affiliation VARCHAR(50),
  country VARCHAR(30),
  is_verified BOOLEAN,
  is_banned BOOLEAN NOT NULL,
  is_hidden BOOLEAN NOT NULL,
  is_ctf_admin BOOLEAN NOT NULL,
  is_team_capitan BOOLEAN NOT NULL,
  
  FOREIGN KEY (id_team) REFERENCES team(id), 
  FOREIGN KEY (id_role) REFERENCES duty(id)
);

CREATE TABLE address(
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  id_participant INTEGER NOT NULL,
  ip_address VARCHAR(128),

  FOREIGN KEY (id_participant) REFERENCES participant(id) 
);

CREATE TABLE contest(
 id INTEGER PRIMARY KEY AUTO_INCREMENT,
 start_time DATETIME NOT NULL,
 end_time DATETIME NOT NULL,
 start_time_utc DATETIME NOT NULL,
 end_time_utc DATETIME NOT NULL,
 title VARCHAR(70) NOT NULL,
 description VARCHAR(500) NOT NULL,
 has_started BOOLEAN NOT NULL
);

CREATE TABLE challenge(
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  id_contest INTEGER NOT NULL,
  name VARCHAR(50),
  category VARCHAR(40),
  description VARCHAR(450),
  points INTEGER,
  flag VARCHAR(256),
  is_case_sensitive BOOLEAN,
  is_visible BOOLEAN,
  file blob,
  dockerfile blob,
  dockerfile_build_state VARCHAR(40),
  FOREIGN KEY (id_contest) REFERENCES contest(id) 
  
);


CREATE TABLE submit(
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  id_participant INTEGER NOT NULL,
  id_challenge INTEGER NOT NULL,
  is_correct BOOLEAN NOT NULL,
  time DATETIME,
  FOREIGN KEY (id_participant) REFERENCES participant(id) ,
  FOREIGN KEY (id_challenge) REFERENCES challenge(id) 
  
);

CREATE TABLE solution(
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  id_challange INTEGER,
  id_team INTEGER,
  link VARCHAR(256),
  is_solved BOOLEAN,
  FOREIGN KEY (id_challange) REFERENCES challenge(id),
  FOREIGN KEY (id_team) REFERENCES team(id)
);

INSERT INTO `duty` (`id`, `name_role`) VALUES
(1, 'ROLE_CTF_ADMIN'),
(2, 'ROLE_TEAM_CAPITAN'),
(3, 'ROLE_USER'),
(4, 'ROLE_USER_WITH_TEAM');
