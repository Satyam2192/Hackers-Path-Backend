## Frontend Deployed At: [VERCEL](https://hackers-path.vercel.app)
#### Frontend Repository: [GITHUB](https://github.com/Satyam2192/Hackers-Path/)
#### Backend Deployed At: [RENDER](https://sk-hackers-path.onrender.com/api/v1/modules) || [POSTMAN](https://documenter.getpostman.com/view/31555061/2s9YsRaTXV)

# Hackers Path 

a learning website,
-> various learning path
-> For each path Variouls Learning Modules will be there

AUTH
#1 isAdmin and isStudent
#2 Student can register with Email, Username, Password, Conform passowrd and Login with username Or email and passowrd

WEBSITE
#3 Admin-have track and progress of all students, And Student have track and progress of itself only.
#4 Admin can add Path, and for each path there is a corresponding learning modules and all activity of admin is done on Admin dashboard
#5 Viewrs and student can learn and read path and modules and keep track of their progress


## GET Modules:
Request URL: Make requests to /api/v1/modules with optional query parameters page and limit.
Example:
/api/v1/modules (gets the first 5 modules)
/api/v1/modules?page=2 (gets the second page of 5 modules)
/api/v1/modules?limit=10 (gets the first 10 modules)
/api/v1/modules?page=3&limit=10 (gets the third page of 10 modules)
