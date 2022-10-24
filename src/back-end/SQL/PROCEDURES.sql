USE books_directory;
# -------------------------------------------------------
# CRUD for the user table
# -------------------------------------------------------
DELIMITER ;

CREATE PROCEDURE sp_user_create(
    IN p_name VARCHAR(50),
    IN p_lastname VARCHAR(50),
    IN p_password VARCHAR(50),
    IN p_email VARCHAR(50)
)
BEGIN
    INSERT INTO user(name, lastname, password, email)
    VALUES (p_name, p_lastname, p_password, p_email);
END;
DELIMITER $$
# -------------------------------------------------------
DELIMITER ;
CREATE PROCEDURE sp_user_readall()
BEGIN
    SELECT * FROM user;
END;
DELIMITER $$

# -------------------------------------------------------
DELIMITER ;
CREATE PROCEDURE sp_user_read(
    IN p_id INT
)
BEGIN
    SELECT * FROM user WHERE iduser = p_id;
END;
DELIMITER $$
# -------------------------------------------------------

DELIMITER ;
CREATE PROCEDURE sp_user_update(
    IN p_id INT,
    IN p_name VARCHAR(50),
    IN p_lastname VARCHAR(50),
    IN p_password VARCHAR(50),
    IN p_email VARCHAR(50)
)
BEGIN
    UPDATE user SET name = p_name, lastname = p_lastname, password = p_password, email = p_email WHERE iduser = p_id;
END;
DELIMITER $$
# -------------------------------------------------------
DELIMITER ;
CREATE PROCEDURE sp_user_delete(
    IN p_id INT
)
BEGIN
    DELETE FROM user WHERE iduser = p_id;
END;
DELIMITER $$
# -------------------------------------------------------
# CRUD for the book table
# -------------------------------------------------------
DELIMITER ;
CREATE PROCEDURE sp_book_create(
    IN p_title VARCHAR(50),
    IN p_author VARCHAR(50),
    IN p_description VARCHAR(2000),
    IN p_pages INT,
    IN p_release_date DATE)
BEGIN
    INSERT INTO book(title, author, description, pages, releasedate)
    VALUES (p_title, p_author, p_description, p_pages, p_release_date);
END;
DELIMITER $$
# -------------------------------------------------------
DELIMITER ;
CREATE PROCEDURE sp_book_readall()
BEGIN
    SELECT * FROM book;
END;
DELIMITER $$
# -------------------------------------------------------
DELIMITER ;
CREATE PROCEDURE sp_book_read(
    IN p_id INT
)
BEGIN
    SELECT * FROM book WHERE idbook = p_id;
END;
DELIMITER $$
# -------------------------------------------------------
DELIMITER ;
CREATE PROCEDURE sp_book_update(
    IN p_id INT,
    IN p_title VARCHAR(50),
    IN p_author VARCHAR(50),
    IN p_description VARCHAR(50),
    IN p_pages INT,
    IN p_release_date DATE
)
BEGIN
    UPDATE book
    SET title       = p_title,
        author      = p_author,
        description = p_description,
        pages       = p_pages,
        releasedate = p_release_date
    WHERE idbook = p_id;
END;
DELIMITER $$
# -------------------------------------------------------
DELIMITER ;
CREATE PROCEDURE sp_book_delete(
    IN p_id INT
)
BEGIN
    DELETE FROM book WHERE idbook = p_id;
END;
DELIMITER $$
# -------------------------------------------------------
# CRUD for the bookMarkedBooks table
# -------------------------------------------------------
DELIMITER ;
CREATE PROCEDURE sp_bookmarkedbooks_create(
    IN p_iduser INT,
    IN p_idbook INT
)
BEGIN
    INSERT INTO bookmarkedbooks(iduser, idbook)
    VALUES (p_iduser, p_idbook);
END;
DELIMITER $$
# -------------------------------------------------------
DELIMITER ;
CREATE PROCEDURE sp_bookmarkedbooks_readall()
BEGIN
    SELECT * FROM bookmarkedbooks;
END;
DELIMITER $$
# -------------------------------------------------------
DELIMITER ;
CREATE PROCEDURE sp_bookmarkedbooks_read(
    IN p_id INT
)
BEGIN
    SELECT * FROM bookmarkedbooks WHERE idbookmarkedbooks = p_id;
END;
DELIMITER $$
# -------------------------------------------------------
DELIMITER ;
CREATE PROCEDURE sp_bookmarkedbooks_update(
    IN p_id INT,
    IN p_iduser INT,
    IN p_idbook INT
)
BEGIN
    UPDATE bookmarkedbooks SET iduser = p_iduser, idbook = p_idbook WHERE idbookmarkedbooks = p_id;
END;
DELIMITER $$
# -------------------------------------------------------
DELIMITER ;
CREATE PROCEDURE sp_bookmarkedbooks_delete(
    IN p_id INT
)
BEGIN
    DELETE FROM bookmarkedbooks WHERE idbookmarkedbooks = p_id;
END;
DELIMITER $$
# -------------------------------------------------------