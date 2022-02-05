# API documentation

## /student

-   GET /verify?username&password  
    this endpoint takes username and password as query params, sends  
    `{success: true, student: studentObj, message: ''}` on success  
    `{success: false, message: 'respective error msg'}` on failure

-   GET /:id  
    This endpoint returns a student obj consisting of his name, photo, etc..,
    Returns:
    `{success: true, student: studentObj}` on success
    `{success: false, message: 'Error message'}` on failure
-   PUT /:id
-   This endpoint modifies a student's non text fields
-
-   POST /  
    This helps us create a new student, but this takes only the non-text params.
-   PUT /putphoto/:id  
    This endpoints takes a photo as input, make sure to include the file under the name `photo`, and change the form type to 'multipart/form-data'. This endpoint modifies the respective student's photo, given his id
-   PUT /putgradecards/:id  
    This endpoints takes a photo as input, make sure to include the file under the name `gradecards`, and change the form type to 'multipart/form-data'. This endpoint modifies the respective student's grade cards, given his id. (make sure to include 8)
-   DEL /:id  
    This endpoint deletes a student, given his id.

## /admin

-   POST /register  
    This endpoint takes input (username, password) and creates a admin, account. It returns a token which can then be stored in client as a cookie.
-   POST /login  
    This sends a jwt token when given the correct admin credentials. This endpoint returns a token which the client can store in a cookie, for further use. (There is a check in backend, that checks authority when certain operations are commanded)
