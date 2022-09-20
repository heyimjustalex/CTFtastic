CREATE TABLE Team(
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50),
  password_hash VARCHAR(350) NOT NULL,
  points INTEGER,
  website VARCHAR(50),
  affilation VARCHAR(50),
  is_verified BOOLEAN,
  is_banned BOOLEAN NOT NULL,
  is_hidden BOOLEAN NOT NULL
);


CREATE TABLE User (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  id_team INTEGER NOT NULL,
  email VARCHAR(25) NOT NULL,
  password_hash VARCHAR(350) NOT NULL,
  website VARCHAR(50),
  affilation VARCHAR(50),
  country VARCHAR(30),
  is_verified BOOLEAN,
  is_banned BOOLEAN NOT NULL,
  is_hidden BOOLEAN NOT NULL,
  is_ctf_admin BOOLEAN NOT NULL,
  is_team_capitan BOOLEAN NOT NULL,
  
  FOREIGN KEY (id_team) REFERENCES Team(id) 
  
);

CREATE TABLE Address(
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  id_user INTEGER NOT NULL,
  ip_address VARCHAR(128),

  FOREIGN KEY (id_user) REFERENCES User(id) 
);

CREATE TABLE Contest(
 id INTEGER PRIMARY KEY AUTO_INCREMENT,
 start_time DATETIME NOT NULL,
 end_time DATETIME NOT NULL

);

CREATE TABLE Challenge(
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  id_contest INTEGER NOT NULL,
  name VARCHAR(50),
  category VARCHAR(40),
  message VARCHAR(450),
  points INTEGER,
  flag VARCHAR(40),
  is_case_sensitive BOOLEAN,
  is_visible BOOLEAN,
  file blob,
  dockerfile VARCHAR(200),
  
  FOREIGN KEY (id_contest) REFERENCES Contest(id) 
  
);


CREATE TABLE Submit(
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  id_user INTEGER NOT NULL,
  id_challenge INTEGER NOT NULL,
  is_correct BOOLEAN NOT NULL,
  time DATETIME,
  FOREIGN KEY (id_user) REFERENCES User(id) ,
  FOREIGN KEY (id_challenge) REFERENCES Challenge(id) 
  
);


