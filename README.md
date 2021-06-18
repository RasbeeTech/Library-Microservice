# Library-Microservice
 API service for keeping track of books.
 
 ### Purpose:
 Practice implementing unit and integrated Mocha Chai-HTTP testing.
 
 ### Usage examples:
 Get all books in library:  
 ```
GET /api/books
 ```
 Get a single book in library:  
 ```
 GET /api/books/{book_id}
```
  
Add book to library:  
```
POST /api/books/ [title: book_title]
```
Add comment to book:  
```
POST /api/books/{book_id} [title: book_title]
```
  
Delete all books in library:  
```
DELETE /api/books
```
Delete one book from library:  
```
Delete /api/books/{bood_id}
```

### Return example:
```
{"comments":[],"_id":"60cd040617f00e9416f1df9d","title":"example book","commentcount":0, "comments": ["good example", "great service"]...}

```
