# Server

## Auth_api

### Root url

<https://agile-badlands-98142.herokuapp.com>
  
### register

>>${root_url}/api/users
>>post
>>json: name, email, password
  
### login

>${root_url}/api/auth
>post
>json:email, password
  
### load_user

>${root_url}/api/auth
>get
>headers:{
> 'x-auth-token':token
>}
  
## Search api

### business search

>${root_url}/api/yelp
>post
>json: term,location
>e.g. term:Chinese Medicine, location: Boston

### business detail search

>${root_url}/api/yelp/detail
>post
>json: alias
>(You could get alias from business search res data)

### business reviews search

>${root_url}/api/yelp/reviews
>post
>json: alias
  
## Profile api

### get current user profile

>${root_url}/api/profile/me
>get
>headers:{
> 'x-auth-token':token
>}
  
### get user profile by userId

>${root_url}/api/profile/${userId}
>get
>headers:{
> 'x-auth-token':token
>}
  
### create profile

>${root_url}/api/profile
>post
>json: business name, business size, website, location, services