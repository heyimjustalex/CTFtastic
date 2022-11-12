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

INSERT INTO `team` (`id`, `name`, `password_hash`, `points`, `website`, `affiliation`, `is_verified`, `is_banned`, `is_hidden`) VALUES
(1, 'Team1', '123', 100, 'url.com', 'idc', 1, 0, 0),
(2, 'Team2', '123', 100, 'url.com/1', 'idc', 1, 0, 0),
(3, 'Team3', '1234', 345, 'url.com/2', 'idc', 1, 0, 0),
(4, 'Team3', '1234', 345, 'url.com/2', 'idc', 1, 0, 0),
(5, 'Team3', '1234', 345, 'url.com/2', 'idc', 1, 0, 0),
(6, 'Team3', '1234', 345, 'url.com/2', 'idc', 1, 0, 0),
(7, 'Team3', '1234', 345, 'url.com/2', 'idc', 1, 0, 0),
(8, 'Team3', '1234', 345, 'url.com/2', 'idc', 1, 0, 0),
(9, 'Team3', '1234', 345, 'url.com/2', 'idc', 1, 0, 0),
(10, 'Team3', '1234', 345, 'url.com/2', 'idc', 1, 0, 0),
(11, 'Team3', '1234', 345, 'url.com/2', 'idc', 1, 0, 0),
(12, 'Team3', '1234', 345, 'url.com/2', 'idc', 1, 0, 0),
(13, 'Team3', '1234', 345, 'url.com/2', 'idc', 1, 0, 0),
(14, 'Team3', '1234', 345, 'url.com/2', 'idc', 1, 0, 0),
(15, 'Team3', '1234', 345, 'url.com/2', 'idc', 1, 0, 0),
(16, 'Team3', '1234', 345, 'url.com/2', 'idc', 1, 0, 0),
(17, 'Team3', '1234', 345, 'url.com/2', 'idc', 1, 0, 0),
(18, 'Team3', '1234', 345, 'url.com/2', 'idc', 1, 0, 0),
(19, 'Team3', '1234', 345, 'url.com/2', 'idc', 1, 0, 0),
(20, 'Team3', '1234', 345, 'url.com/2', 'idc', 1, 0, 0),
(21, 'Team3', '1234', 345, 'url.com/2', 'idc', 1, 0, 0),
(22, 'Team3', '1234', 345, 'url.com/2', 'idc', 1, 0, 0),
(23, 'Team3', '1234', 345, 'url.com/2', 'idc', 1, 0, 0),
(24, 'Team3', '1234', 345, 'url.com/2', 'idc', 1, 0, 0),
(25, 'Team3', '1234', 345, 'url.com/2', 'idc', 1, 0, 0),
(26, 'Team3', '1234', 345, 'url.com/2', 'idc', 1, 0, 0),
(27, 'Team3', '1234', 345, 'url.com/2', 'idc', 1, 0, 0),
(28, 'Team3', '1234', 345, 'url.com/2', 'idc', 1, 0, 0),
(29, 'Team3', '1234', 345, 'url.com/2', 'idc', 1, 0, 0),
(30, 'Team3', '1234', 345, 'url.com/2', 'idc', 1, 0, 0),
(31, 'Team3', '1234', 345, 'url.com/2', 'idc', 1, 0, 0),
(32, 'Team3', '1234', 345, 'url.com/2', 'idc', 1, 0, 0),
(33, 'Team3', '1234', 345, 'url.com/2', 'idc', 1, 0, 0),
(34, 'Team3', '1234', 345, 'url.com/2', 'idc', 1, 0, 0),
(35, 'Team3', '1234', 345, 'url.com/2', 'idc', 1, 0, 0),
(36, 'Team3', '1234', 345, 'url.com/2', 'idc', 1, 0, 0),
(37, 'Team3', '1234', 345, 'url.com/2', 'idc', 1, 0, 0),
(38, 'Team3', '1234', 345, 'url.com/2', 'idc', 1, 0, 0),
(39, 'Team3', '1234', 345, 'url.com/2', 'idc', 1, 0, 0),
(40, 'Team3', '1234', 345, 'url.com/2', 'idc', 1, 0, 0),
(41, 'Team3', '1234', 345, 'url.com/2', 'idc', 1, 0, 0),
(42, 'Team3', '1234', 345, 'url.com/2', 'idc', 1, 0, 0),
(43, 'Team3', '1234', 345, 'url.com/2', 'idc', 1, 0, 0),
(44, 'Team3', '1234', 345, 'url.com/2', 'idc', 1, 0, 0),
(45, 'Team3', '1234', 345, 'url.com/2', 'idc', 1, 0, 0),
(46, 'Team3', '1234', 345, 'url.com/2', 'idc', 1, 0, 0),
(47, 'Team3', '1234', 345, 'url.com/2', 'idc', 1, 0, 0),
(48, 'Team3', '1234', 345, 'url.com/2', 'idc', 1, 0, 0),
(49, 'Team3', '1234', 345, 'url.com/2', 'idc', 1, 0, 0),
(50, 'Team3', '1234', 345, 'url.com/2', 'idc', 1, 0, 0),
(51, 'Team3', '1234', 345, 'url.com/2', 'idc', 1, 0, 0),
(52, 'Team3', '1234', 345, 'url.com/2', 'idc', 1, 0, 0),
(53, 'Team3', '1234', 345, 'url.com/2', 'idc', 1, 0, 0),
(54, 'Team3', '1234', 345, 'url.com/2', 'idc', 1, 0, 0),
(55, 'Team4', '1235', 50, 'url.com/3', 'idc', 1, 0, 0);



INSERT INTO participant (id, username, id_team, id_role, email, password_hash, website, affiliation, country, is_verified, is_banned, is_hidden, is_ctf_admin, is_team_capitan) VALUES

(1, 'Test2', 1, 1, 'Test2@gmail.com', '$2a$10$YRBdKiJytZT3vL5CPrQ4tOzgw7GXU2e44wt1yfdzUg5wg9lHd1yWC', 'example1.com', 'PL', NULL, 0, 0, 0, 0, 0),
(2, 'Test3',2, 3, 'Test3@gmail.com', '$2a$10$0ThvMYe//xAZxcxlb7TptOv3.iu69SlVAHD9qQBQa8z77gsGXxRP6','example1.com', 'EN', NULL, 0, 0, 0, 0, 0),
(3, 'Test4',3, 3, 'Test4@gmail.com', '$2a$10$cg26PE5.3zo7sNTdl1d44.YppxHYtF/8pjgB5fkJ64tQkR4AtfV92', 'example1.com', 'PL', NULL, 0, 0, 0, 0, 0),
(4, 'Test1',1, 3, 'Test1@gmail.com', '$2a$10$X6cyoKgfedC1ODb6XkiIDebfVLE7L0SKgqjVjzSbmwQiWBevrvp5e', 'example1.com', 'EN', NULL, 0, 0, 0, 0, 0),
(5, 'Test123',2, 2, 'Test123@gmail.com', '$2a$10$I14lTg3P9YYRf4KP/Rj1Pe1zoj7bwu0u1pXE/.s4UmWp26DJMOep2', 'example1.com', 'PL', NULL, 0, 0, 0, 0, 0),
(6, 'NowyTestowy',1, 1, 'NowyTestowy@gmail.com', '$2a$10$GDdmTTzBAeqttwXaPQ4hlurf1YquvabIuNtDr/Jv39HiDe9Yk4A5u', 'example1.com', 'GER', NULL, 0, 0, 0, 0, 0);