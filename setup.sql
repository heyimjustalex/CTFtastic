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
 end_time DATETIME NOT NULL

);

CREATE TABLE challenge(
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


INSERT INTO `duty` (`id`, `name_role`) VALUES
(1, 'ROLE_CTF_ADMIN'),
(2, 'ROLE_TEAM_CAPITAN'),
(3, 'ROLE_USER');

INSERT INTO `team` (`id`, `name`, `password_hash`, `points`, `website`, `affiliation`, `is_verified`, `is_banned`, `is_hidden`) VALUES
(1, 'Team1', '123', 100, 'url.com', 'idc', 1, 0, 0),
(2, 'Team2', '123', 100, 'url.com/1', 'idc', 1, 0, 0),
(3, 'Team3', '1234', 345, 'url.com/2', 'idc', 1, 0, 1),
(4, 'Team4', '1235', 50, 'url.com/3', 'idc', 1, 0, 0);

INSERT INTO `contest` (`id`, `start_time`, `end_time`) VALUES
(1, '2022-10-06 17:01:08', '2022-10-06 17:01:08'),
(2, '2022-10-06 17:02:34', '2022-10-06 17:02:34'),
(3, '2022-10-06 17:03:55', '2022-10-06 17:03:55'),
(4, '2022-10-06 17:14:05', '2022-10-06 17:14:05'),
(5, '2022-10-06 17:18:41', '2022-10-06 17:18:41'),
(6, '2022-10-06 17:23:06', '2022-10-06 17:23:06');

INSERT INTO `challenge` (`id`, `id_contest`, `name`, `category`, `message`, `points`, `flag`, `is_case_sensitive`, `is_visible`, `file`, `dockerfile`) VALUES
(1, 1, 'challenge1', 'category1', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and', 100, 'flag1', 0, 1, NULL, NULL),
(2, 1, 'challenge2', 'category2', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,', 50, 'flag2', 1, 1, NULL, NULL),
(3, 1, 'challenge3', 'category3', 'Lorem Ipsum is simply ', 1, 'flag3', 1, 0, NULL, NULL);


INSERT INTO participant (id, id_team, id_role, email, password_hash, website, affiliation, country, is_verified, is_banned, is_hidden, is_ctf_admin, is_team_capitan) VALUES
(1, 1, 1, 'Test2@gmail.com', '$2a$10$YRBdKiJytZT3vL5CPrQ4tOzgw7GXU2e44wt1yfdzUg5wg9lHd1yWC', 'example1.com', 'PL', NULL, 0, 0, 0, 0, 0),
(2, 2, 3, 'Test3@gmail.com', '$2a$10$0ThvMYe//xAZxcxlb7TptOv3.iu69SlVAHD9qQBQa8z77gsGXxRP6','example1.com', 'EN', NULL, 0, 0, 0, 0, 0),
(3, 3, 3, 'Test4@gmail.com', '$2a$10$cg26PE5.3zo7sNTdl1d44.YppxHYtF/8pjgB5fkJ64tQkR4AtfV92', 'example1.com', 'PL', NULL, 0, 0, 0, 0, 0),
(4, 1, 3, 'Test1@gmail.com', '$2a$10$X6cyoKgfedC1ODb6XkiIDebfVLE7L0SKgqjVjzSbmwQiWBevrvp5e', 'example1.com', 'EN', NULL, 0, 0, 0, 0, 0),
(5, 2, 2, 'Test123@gmail.com', '$2a$10$I14lTg3P9YYRf4KP/Rj1Pe1zoj7bwu0u1pXE/.s4UmWp26DJMOep2', 'example1.com', 'PL', NULL, 0, 0, 0, 0, 0),
(6, 1, 1, 'NowyTestowy@gmail.com', '$2a$10$GDdmTTzBAeqttwXaPQ4hlurf1YquvabIuNtDr/Jv39HiDe9Yk4A5u', 'example1.com', 'GER', NULL, 0, 0, 0, 0, 0);