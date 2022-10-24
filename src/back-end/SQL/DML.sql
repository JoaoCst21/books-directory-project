# DML
USE books_directory;

# DML book(title, author, description, pages, release_date)
CALL sp_book_create('The Lord of the Rings', 'J.R.R. Tolkien',
                    'The Lord of the Rings is an epic high fantasy novel written by English author and scholar J. R. R. Tolkien. The story began as a sequel to Tolkien\'s 1937 fantasy novel The Hobbit, but eventually developed into a much larger work. Written in stages between 1937 and 1949, The Lord of the Rings is one of the best-selling novels ever written, with over 150 million copies sold.',
                    800, NOW());
CALL sp_book_create('The Hobbit', 'J.R.R. Tolkien',
                    'The Hobbit, or There and Back Again is a children\'s fantasy novel by English author J. R. R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction. The book remains popular and is recognized as a classic in children\'s literature.',
                    300, NOW());
CALL sp_book_create('The Silmarillion', 'J.R.R. Tolkien',
                    'The Silmarillion is a collection of tales set in the world of Arda, written by J. R. R. Tolkien. The book was published in 1977, compiled and edited by Christopher Tolkien from material that had been left by his father after his death in 1973. The Silmarillion is a collection of myths and legends, set in the world of Arda, which was created by the Vala Aulë, and which was later inhabited by Elves)',
                    400, NOW());
CALL sp_book_create('The Fellowship of the Ring', 'J.R.R. Tolkien',
                    'The Fellowship of the Ring is the first volume of J. R. R. Tolkien\'s epic adventure The Lord of the Rings. It was published on 29 July 1954 in the United Kingdom by George Allen & Unwin, and in the United States by Houghton Mifflin Company on 21 October 1954. The book is 423 pages long and is followed by The Two Towers and The Return of the King.',
                    400, NOW());