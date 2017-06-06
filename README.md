## File structure
- |- 1. Pages
* |-- 1. Home (The map)
*   |-- 2. RentBike
*   |-- 3. Login
*   |-- 4. ResetPassword
*   |-- 5. Signup
- |- 2. Providers
*   |-- 1. BikeDB
*   |-- 2. PermissionController
*   |-- 3. UserController
*   |-- 4. Auth
- |- 3. Validators
*   |-- 1. email

## Conventions:
Whenever you implement an error-log, please **include the id of the error log at the beginning of the message** like this:
`ERROR AT 23453: ...`
The first two digits describe the location where the error happened and refer to the Folder, and Subfolder respectively (in the example of 23453, it refers to Providers -> UserController). Within the subfolder itself, three random digits should be added (in the example of 23453, 453 is the random digit), such that we can just apply a 'cmd+f' and quickly find the function that causes the error.
