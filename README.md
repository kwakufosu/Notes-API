Use the foloowing methods and links in POSTMAN to test the API.

POST https://notes-apikbf.herokuapp.com/users - Create a user

Accepted fields:name,email,password.
E.g
 {
 "name": "Sam",
 "email":"sam@gmail.com",
 "password: "sam123455"
}

POST https://notes-apikbf.herokuapp.com/users/login - login user

PATCH https://notes-apikbf.herokuapp.com/users -update user

GET https://notes-apikbf.herokuapp.com/users/me -fetch user profile details

DELETE https://notes-apikbf.herokuapp.com/users/ -Delete logged in user's profile

POST https://notes-apikbf.herokuapp.com/users/logout -Logout of current device

POST https://notes-apikbf.herokuapp.com/users/logoutAll -Logout of all devices

To use the following, you must be logged in as a user first:

POST https://notes-apikbf.herokuapp.com/note -create a note

Accepted fields:note

E.g
 {
 "note": "Life is short. Live it well."
 
}

GET https://notes-apikbf.herokuapp.com/(paste id here)- fetch a note by id

GET https://notes-apikbf.herokuapp.com/- fetch all notes created by aparticular user

DELETE https://notes-apikbf.herokuapp.com/(paste id here)- delete a note by id
