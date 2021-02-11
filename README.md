# traweb
 Social web-portal associating travelers from all over the world

## API
Project's API is designed with **REST** protocol

Endpoints are arranged in 3 controllers:

 1. Authentication Controller -  with leading url - **/api/auth**
 2. User Controller - with leading url - **/api/users**
 3. Travel Controller - with leading url - **/api/travels**

### Authentication Controller

 - POST  *api/auth/token/login* 
	 - sends request to get authentication token for current session
	 - *body*: 
`{    "password": string,    "username": string	}`
	 - *response*: 
`{    "auth_token": string	}`
	- *permission*: Anyone

  - POST  *api/auth/token/logout* 
	 - sends request to kill user's current session
	 - *permission*: Authenticated

### User Controller
 - POST  *api/users* 
	 - sends request to add new user
	 - *body*: 
        `{
        "email": string,
    	   "password": string,
        "first_name": string,
        "last_name": string,
        "country": string,
        "city": string,
        "zip_code": string,
        "friends": string
    }`
	 - *response* - userJson:
	 `{  "id": number, "email": string,  "password": string (hashed),  "first_name": string,  "last_name": string,  "country": string, "city": string,  "zip_code": string,  "last_login": date,  "date_joined": date, "friends": string }`
    - *permission*: Anyone
    
 - GET  *api/users* 
	 - retrives list of all users
	 - *response (described above)*:
	 `[{user1Json}, {user2Json}, ...]`
    - *permission*: Authenticated

 - GET  *api/users/{id}* 
	 - retrives user with specified id
	 - *response (described above)*:
	 `{userJson}`
    - *permission*: Authenticated

 - GET  *api/users/current* 
	 - retrives user for current session (logged in)
	 - *response (described above)*:
	 `{userJson}`
   - *permission*: Authenticated

 - PUT/PATCH  *api/users/{id}* 
	 - updates user with specific id
	 - *body (described above)*:
	 `{userJson}`
	 - *response (described above)*:
	 `{userJson}`
    - *permission*: Owner

 - DELETE  *api/users/{id}* 
	 - deletes user with specific id
    - *permission*: Owner
    
### Travel Controller
 - POST  *api/travels* 
	 - sends request to add new travel
	 - *body*: 
        `{
    "user": number,
    "name": string,
    "begin_date": date,
    "end_date": date,
    "country_codes": string,
    "cities": string,
    "positions": [position1CreateJson, position2CreateJson, ...],
    "opinions": [string, string, ...]
	}`
  
		positionCreateJson:
		`{"coordinates": {"lat": number, "lng": number}, "name": string, "type": number, "rating": number, "description": string, "main_image": string, "pictures": string, "city": string, "country_code": string}`
	 - *response* - travelJson:
	 `{  "id": number, "user":  {userJson},  "name":  string,  "begin_date": string,  "end_date":  string,  "country_codes":  string,  "cities":  string,  "positions":  [{position1Json, position2Json, ...}],  "opinions":  [string, string, ...]  
	}`
  
		positionJson: `{  "id":  number,  "name":  string,  "coordinates":  {  "lat":  number,  "lng":  number },  "type":  number,  "rating":  number,  "description":  string,  "main_image":  string,  "pictures":  string,  "country_code":  string,  "city":  string }`
    - *permission*: Owner
    
 - GET  *api/travels* 
	 - retrives list of all travels
	 - *response (described above)*:
	 `[{travel1Json}, {travel2Json}, ...]`
    - *permission*: Authenticated

 - GET  *api/travels/{id}* 
	 - retrives travel with specified id
	 - *response (described above)*:
	 `{travelJson}`
    - *permission*: Authenticated

 - PUT/PATCH  *api/travels/{id}* 
	 - updates travel with specific id
	 - *body (described above)*:
	 `{travelJson}`
	 - *response (described above)*:
	 `{travelJson}`
    - *permission*: Owner

 - DELETE  *api/travels/{id}* 
	 - deletes travel with specific id
    - *permission*: Owner
