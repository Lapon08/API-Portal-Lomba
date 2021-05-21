# 2021-IT-Pemrograman-Integratif-Project-2 
- Nama : Naufal Aprilian Marsa Mahendra
- NRP : 05311940000007
# API Portal Lomba IT
Portal Lomba IT merupakan API yang dibuat dengan tujuan supaya para IT enthusiast terfasilitasi ketika ingin mencari perlombaan yang diinginkannya dengan terintegrasi dalam satu API. IT enthusiast akan diberikan informasi tekait perlombaan IT dengan sangat jelas mulai dari penyelenggara, situs lomba, harga, dan jadwal.

#### Link API : https://stark-savannah-75310.herokuapp.com

# How to set up on your own device
## Requirement
- [NodeJs](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/try/download/community)
## Setup Step
- Melakukan Clone repository dari github ```https://github.com/2021-IT-Pemrograman-Integratif/project-2-Lapon08.git```
- Melakukan Setup Database
- Melakukan ```npm install``` pada direktori repository
- Melakukan setup Environment yang dibutuhkan

| Environment | Description|
|------------ |------------|
| portallomba_jwtPrivateKey | Masukkan Secret Key yang ingin digunakan untuk JWT|
|MONGODB_URI|Masukkan URL untuk Mengkoneksikan ke MongoDB kalian|

Pengguna windows dapat menggunakan ```set```, pengguna Linux dan Mac dapat menggunakan ```export```
- Untuk menjalankan ```npm start```
- Jika ingin menambahkan User sebagai Admin dapat melakukan penambahan data pada collection database dengan tambahan ```isAdmin```:```true``` dengan format ```boolean``` pada user yang telah terdaftar
# How to Use
Cara menggunakan API ini tinggal pertama yang harus user lakukan adalah register pada endpoint ```/api/users ```menggunakan ```POST``` dengan parameter yang dikirimkan ```name, email, dan password``` berupa ```string``` dengan format ```JSON```

```Request```

Body
```
{
    "name":"user",
    "email": "user@gmail.com",
    "password":"password"
}
```
user akan mendapatkan token yang dapat di set pada header dengan key ```x-auth-token``` dengan melakukan authentikasi melalui endpoint ```/api/auth```.
```Request```

Body
```
{
    "email": "user@gmail.com",
    "password":"password"
}
```
```Response```

Body
```
{
    "x-auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGEwOWJiMDE3M2NlZDRhN2MwNmM0OWEiLCJpYXQiOjE2MjExNTc3MjJ9.eauwET1UBHhUPE7Tis5THQOzK7mSXiWchHp_YhuHaBc"
}
```
Setelah mendapatkan token user sudah dapat menggunakan Endpoint ini. 
- User dapat melihat kategori lomba

```endpoint : /api/categories```  
```method : GET```  
```Response```
```
[
    {
        "_id": "609e6604accae61980b214f4",
        "name": "Competitive Programming",
        "__v": 0
    },
    {
        "_id": "60a09b6d173ced4a7c06c499",
        "name": "Capture The Flag",
        "__v": 0
    }
]
```
- User dapat melihat informasi lomba

```endpoint : /api/competitions```  
```method : GET```  
```Response```
```
[
    {
        "_id": "60a1db2c7221e8143c06f833",
        "name": "A Renewal Agent",
        "category": {
            "_id": "60a09b6d173ced4a7c06c499",
            "name": "Capture The Flag"
        },
        "organizer": "Intitut Teknologi Sepuluh Nopember",
        "competition_site": "http://aractf2021.tech/",
        "schedule": [
            {
                "_id": "60a1db2c7221e8143c06f835",
                "start_date": 1620744167,
                "end_date": 1620744167,
                "description": "Pendaftaran"
            }
        ],
        "prices": [],
        "__v": 0
    },
    {
        "_id": "60a1dfc60ff0884654d2f69a",
        "name": "A Renewal Agent",
        "category": {
            "_id": "60a09b6d173ced4a7c06c499",
            "name": "Capture The Flag"
        },
        "organizer": "Intitut Teknologi Sepuluh Nopember",
        "competition_site": "http://aractf2021.tech/",
        "prices": [
            {
                "_id": "60a1dfc60ff0884654d2f69c",
                "price": 50000,
                "start_date": 1620744167,
                "end_date": 1620744167,
                "description": "Batch 1"
            }
        ],
        "schedule": [
            {
                "_id": "60a1dfc60ff0884654d2f69d",
                "start_date": 1620744167,
                "end_date": 1620744167,
                "description": "Pendaftaran"
            }
        ],
        "__v": 0
    }
]
```
```start_date dan end_date merupakan Unix Timestamp```

Jangan lupa untuk menambahkan header ```x-auth-token``` dengan JWT yang dimiliki.

# Endpoint
API ini memliki beberapa Endpoint didalamnya yang dapat diakses oleh Admin ataupun User

## /api/users
### ```METHOD POST```
User dapat melakukan register pada endpoint ini dengan menggunakan method ```POST``` dengan mengirimkan beberapa parameter berupa ```JSON``` yaitu ```name , email, password```. 
##### How to Use
Berikut adalah contoh penggunaan

```Request```
```
{
    "name":"user",
    "email": "user@gmail.com",
    "password":"password"
}
```
```Response```
```
{
    "name": "user",
    "email": "user@gmail.com"
}
```
## /api/auth
### ```METHOD POST```
User yang telah melakukan register pada endpoint ini dapat mendapatkan token JWT untuk bisa memanggil API utama dari Portal Lomba IT. Token ini dapat diset pada header dengan key ```x-auth-token``` ketika melakukan pemanggilan API utama. pada pemanggilan /api/auth menggunakan method ```POST``` dengan mengirimkan beberapa parameter berupa ```JSON``` yaitu ```email, dan password```. 

##### How to Use
Berikut adalah contoh penggunaan

```Request```
```
{
    "email": "user@gmail.com",
    "password":"password"
}
```
```Response```
```
{
    "x-auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGEwOWJiMDE3M2NlZDRhN2MwNmM0OWEiLCJpYXQiOjE2MjExNTc3MjJ9.eauwET1UBHhUPE7Tis5THQOzK7mSXiWchHp_YhuHaBc"
}
```
## /api/users/me
### ```METHOD GET```
User yang telah melakukan register pada endpoint ini dapat mendapatkan informasi tentang ```name, email, dan _id user```. Dalam pemanggilan API ini diperlukan set header ```x-auth-token``` dan memasukkan JWT user.

##### How to Use
Berikut adalah contoh penggunaan

```Request```

Header
```
x-auth-token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGEwOWJiMDE3M2NlZDRhN2MwNmM0OWEiLCJpYXQiOjE2MjExNTc3MjJ9.eauwET1UBHhUPE7Tis5THQOzK7mSXiWchHp_YhuHaBc
```
```Response```

Body
```
{
    "_id": "60a09bb0173ced4a7c06c49a",
    "name": "user",
    "email": "user@gmail.com",
    "__v": 0
}
```
## /api/categories
### ```METHOD GET```
User yang telah melakukan register pada ```/api/users``` dapat memanggil ```/api/categories``` dengan melakukan set pada header ```x-auth-token``` dan mengisi dengan JWT yang didapat. Endpoint ini ketika dipanggil menggunakan method ```GET``` maka user akan mendapatkan informasi mengenai kategori lomba

##### How to Use
Berikut adalah contoh penggunaan

```Request```
Header
```
x-auth-token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGEwOWJiMDE3M2NlZDRhN2MwNmM0OWEiLCJpYXQiOjE2MjExNTc3MjJ9.eauwET1UBHhUPE7Tis5THQOzK7mSXiWchHp_YhuHaBc
```
```Response```

Body
```
[
    {
        "_id": "609e6604accae61980b214f4",
        "name": "Competitive Programming",
        "__v": 0
    },
    {
        "_id": "60a09b6d173ced4a7c06c499",
        "name": "Capture The Flag",
        "__v": 0
    }
]
```
### ```METHOD POST```
Hanya ```Admin``` yang dapat menggunakan Endpoint ini. Endpoint ini ketika dipanggil menggunakan method ```POST``` maka admin akan dapat menambahkan Kategori pada Portal Lomba. Perlu diketahui method ```POST``` pada API ```/api/categories``` hanya dapat dilakukan dengan menggunakan ```Admin```. User biasa tidak dapat melakukannya ketika melakukkannya akan mendapatkan response 403. Parameter yang dikirimkan melalui API ini adalah ```name```

##### How to Use
Berikut adalah contoh penggunaan

```Request```
Header
```
x-auth-token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGEwOWJiMDE3M2NlZDRhN2MwNmM0OWEiLCJpYXQiOjE2MjExNTc3MjJ9.eauwET1UBHhUPE7Tis5THQOzK7mSXiWchHp_YhuHaBc
```
Body
```
{
    "name": "UI/UX"
}
```
```Response```

Body
```
{
    "_id": "60a0f0b4de3882229c55991f",
    "name": "UI/UX",
    "__v": 0
}
```
### ```METHOD PUT (/api/categories/:id)```
Hanya ```Admin``` yang dapat menggunakan Endpoint ini.. Endpoint ini ketika dipanggil menggunakan method ```PUT``` diikuti dengan :id dari category maka admin akan dapat mengubah atau mengupdate Kategori pada Portal Lomba dengan _id tersebut. Perlu diketahui method ```PUT``` pada API ```/api/categories``` hanya dapat dilakukan dengan menggunakan ```Admin```. User biasa tidak dapat melakukannya, ketika melakukkannya akan mendapatkan response 403. Parameter yang dikirimkan melalui API ini adalah ```name``` pada body dan mengirimkan ```_id``` kategori pada URL

##### How to Use
Berikut adalah contoh penggunaan

```Request```

/api/categories/:id

dimana :id adalah _id dari kategori yang akan diupdate

Header
```
x-auth-token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGEwOWJiMDE3M2NlZDRhN2MwNmM0OWEiLCJpYXQiOjE2MjExNTc3MjJ9.eauwET1UBHhUPE7Tis5THQOzK7mSXiWchHp_YhuHaBc
```
Body
```
{
    "name": "UI/UX"
}
```
```Response```

Body
```
{
    "_id": "60a0f0b4de3882229c55991f",
    "name": "UI/UX",
    "__v": 0
}
```
### ```METHOD DELETE (/api/categories/:id)```
Hanya ```Admin``` yang dapat menggunakan Endpoint ini. Endpoint ini ketika dipanggil menggunakan method ```DELETE``` diikuti dengan :id dari category maka admin akan dapat menghapus Kategori pada Portal Lomba dengan _id tersebut. Perlu diketahui method ```DELETE``` pada API ```/api/categories``` hanya dapat dilakukan dengan menggunakan ```Admin```. User biasa tidak dapat melakukannya, ketika melakukkannya akan mendapatkan response 403 . Perlu mengirimkan ```_id``` kategori pada URL untuk menghapus kategori dengan _id tersebut

##### How to Use
Berikut adalah contoh penggunaan

```Request```

/api/categories/:id

dimana :id adalah _id dari kategori yang akan diupdate

Header
```
x-auth-token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGEwOWJiMDE3M2NlZDRhN2MwNmM0OWEiLCJpYXQiOjE2MjExNTc3MjJ9.eauwET1UBHhUPE7Tis5THQOzK7mSXiWchHp_YhuHaBc
```
```Response```

Body
```
{
    "_id": "60a0f0b4de3882229c55991f",
    "name": "UI/UX",
    "__v": 0
}
```
## /api/competitions
### ```METHOD GET```
User yang telah melakukan register pada ```/api/users``` dapat memanggil ```/api/competitions``` dengan melakukan set pada header ```x-auth-token``` dan mengisi dengan JWT yang didapat. Endpoint ini ketika dipanggil menggunakan method ```GET``` maka user akan mendapatkan informasi mengenai perlombaan IT.

##### How to Use
Berikut adalah contoh penggunaan

```Request```
Header
```
x-auth-token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGEwOWJiMDE3M2NlZDRhN2MwNmM0OWEiLCJpYXQiOjE2MjExNTc3MjJ9.eauwET1UBHhUPE7Tis5THQOzK7mSXiWchHp_YhuHaBc
```

```Response```

Body
```
[
    {
        "_id": "60a1db2c7221e8143c06f833",
        "name": "A Renewal Agent",
        "category": {
            "_id": "60a09b6d173ced4a7c06c499",
            "name": "Capture The Flag"
        },
        "organizer": "Intitut Teknologi Sepuluh Nopember",
        "competition_site": "http://aractf2021.tech/",
        "schedule": [
            {
                "_id": "60a1db2c7221e8143c06f835",
                "start_date": 1620744167,
                "end_date": 1620744167,
                "description": "Pendaftaran"
            }
        ],
        "prices": [],
        "__v": 0
    },
    {
        "_id": "60a1dfc60ff0884654d2f69a",
        "name": "A Renewal Agent",
        "category": {
            "_id": "60a09b6d173ced4a7c06c499",
            "name": "Capture The Flag"
        },
        "organizer": "Intitut Teknologi Sepuluh Nopember",
        "competition_site": "http://aractf2021.tech/",
        "prices": [
            {
                "_id": "60a1dfc60ff0884654d2f69c",
                "price": 50000,
                "start_date": 1620744167,
                "end_date": 1620744167,
                "description": "Batch 1"
            }
        ],
        "schedule": [
            {
                "_id": "60a1dfc60ff0884654d2f69d",
                "start_date": 1620744167,
                "end_date": 1620744167,
                "description": "Pendaftaran"
            }
        ],
        "__v": 0
    }
]
```
### ```METHOD POST```
Hanya ```Admin``` yang dapat menggunakan Endpoint ini. Endpoint ini ketika dipanggil menggunakan method ```POST``` maka admin akan dapat menambahkan informasi perlombaan IT pada Portal Lomba. Perlu diketahui method ```POST``` pada API ```/api/competitions``` hanya dapat dilakukan dengan menggunakan ```Admin```. User biasa tidak dapat melakukannya ketika melakukkannya akan mendapatkan response 403. Parameter yang dikirimkan melalui API ini adalah ```name```

##### How to Use
Berikut adalah contoh penggunaan

```Request```
Header
```
x-auth-token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGEwOWJiMDE3M2NlZDRhN2MwNmM0OWEiLCJpYXQiOjE2MjExNTc3MjJ9.eauwET1UBHhUPE7Tis5THQOzK7mSXiWchHp_YhuHaBc
```
Body
```
{
        "name": "A Renewal Agent",
        "categoryId": "60a09b6d173ced4a7c06c499",
        "organizer": "Intitut Teknologi Sepuluh Nopember",
        "competition_site": "http://aractf2021.tech/",
        "prices": [
            {
                "price": 50000,
                "start_date": 1620744167,
                "end_date": 1620744167,
                "description": "Batch 1"
            }
        ],
        "schedule": [
            {
                "start_date": 1620744167,
                "end_date": 1620744167,
                "description": "Pendaftaran"
            }
        ]
}
```
```Response```

Body
```
{
    "_id": "60a1dfc60ff0884654d2f69a",
    "name": "A Renewal Agent",
    "category": {
        "_id": "60a09b6d173ced4a7c06c499",
        "name": "Capture The Flag"
    },
    "organizer": "Intitut Teknologi Sepuluh Nopember",
    "competition_site": "http://aractf2021.tech/",
    "prices": [
        {
            "_id": "60a1dfc60ff0884654d2f69c",
            "price": 50000,
            "start_date": 1620744167,
            "end_date": 1620744167,
            "description": "Batch 1"
        }
    ],
    "schedule": [
        {
            "_id": "60a1dfc60ff0884654d2f69d",
            "start_date": 1620744167,
            "end_date": 1620744167,
            "description": "Pendaftaran"
        }
    ],
    "__v": 0
}
```
### ```METHOD PUT (/api/competitions/:id)```
Hanya ```Admin``` yang dapat menggunakan Endpoint ini. Endpoint ini ketika dipanggil menggunakan method ```PUT``` diikuti dengan :id dari competitions maka admin akan dapat mengubah atau mengupdate informasi perlombaan pada Portal Lomba dengan _id tersebut. Perlu diketahui method ```PUT``` pada API ```/api/competitions``` hanya dapat dilakukan dengan menggunakan ```Admin```. User biasa tidak dapat melakukannya, ketika melakukkannya akan mendapatkan response 403. Parameter yang dikirimkan melalui API ini adalah ```name``` pada body dan mengirimkan ```_id``` kompetisi pada URL

##### How to Use
Berikut adalah contoh penggunaan

```Request```

/api/competitions/:id

dimana :id adalah _id dari kompetisi yang akan diupdate

Header
```
x-auth-token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGEwOWJiMDE3M2NlZDRhN2MwNmM0OWEiLCJpYXQiOjE2MjExNTc3MjJ9.eauwET1UBHhUPE7Tis5THQOzK7mSXiWchHp_YhuHaBc
```
Body
```
{
        "name": "A Renewal Agent ITS",
        "categoryId": "60a09b6d173ced4a7c06c499",
        "organizer": "Intitut Teknologi Sepuluh Nopember",
        "competition_site": "http://aractf2021.tech/",
        "prices": [
            {
                "price": 50000,
                "start_date": 1620744167,
                "end_date": 1620744167,
                "description": "Batch 1"
            }
        ],
        "schedule": [
            {
                "start_date": 1620744167,
                "end_date": 1620744167,
                "description": "Pendaftaran"
            }
        ]
    }  "name": "UI/UX"
}
```
```Response```

Body
```
{
    "_id": "60a1dfc60ff0884654d2f69a",
    "name": "A Renewal Agent ITS",
    "category": {
        "_id": "60a09b6d173ced4a7c06c499",
        "name": "Capture The Flag"
    },
    "organizer": "Intitut Teknologi Sepuluh Nopember",
    "competition_site": "http://aractf2021.tech/",
    "prices": [
        {
            "_id": "60a1dfc60ff0884654d2f69c",
            "price": 50000,
            "start_date": 1620744167,
            "end_date": 1620744167,
            "description": "Batch 1"
        }
    ],
    "schedule": [
        {
            "_id": "60a1dfc60ff0884654d2f69d",
            "start_date": 1620744167,
            "end_date": 1620744167,
            "description": "Pendaftaran"
        }
    ],
    "__v": 0
}
```
### ```METHOD DELETE (/api/competitions/:id)```
Hanya ```Admin``` yang dapat menggunakan Endpoint ini. Endpoint ini ketika dipanggil menggunakan method ```DELETE``` diikuti dengan :id dari competitions maka admin akan dapat menghapus informasi lomba pada Portal Lomba dengan _id tersebut. Perlu diketahui method ```DELETE``` pada API ```/api/competitions``` hanya dapat dilakukan dengan menggunakan ```Admin```. User biasa tidak dapat melakukannya, ketika melakukkannya akan mendapatkan response 403 . Perlu mengirimkan ```_id``` kompetisi pada URL untuk menghapus kompetisi dengan _id tersebut
##### How to Use
Berikut adalah contoh penggunaan

```Request```

/api/competitions/:id

dimana :id adalah _id dari kompetisi yang akan diupdate

Header
```
x-auth-token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGEwOWJiMDE3M2NlZDRhN2MwNmM0OWEiLCJpYXQiOjE2MjExNTc3MjJ9.eauwET1UBHhUPE7Tis5THQOzK7mSXiWchHp_YhuHaBc
```
```Response```

Body
```
{
    "_id": "60a1dfc60ff0884654d2f69a",
    "name": "A Renewal Agent ITS",
    "category": {
        "_id": "60a09b6d173ced4a7c06c499",
        "name": "Capture The Flag"
    },
    "organizer": "Intitut Teknologi Sepuluh Nopember",
    "competition_site": "http://aractf2021.tech/",
    "prices": [
        {
            "_id": "60a1dfc60ff0884654d2f69c",
            "price": 50000,
            "start_date": 1620744167,
            "end_date": 1620744167,
            "description": "Batch 1"
        }
    ],
    "schedule": [
        {
            "_id": "60a1dfc60ff0884654d2f69d",
            "start_date": 1620744167,
            "end_date": 1620744167,
            "description": "Pendaftaran"
        }
    ],
    "__v": 0
}
```
# Roles
- Admin

Roles admin memiliki lebih banyak hal yang dapat dilakukan,diantaranya

```endpoint : /api/users```  
```method : POST```

```endpoint : /api/users/me```  
```method : GET```

```endpoint : /api/auth```  
```method : POST```

```endpoint : /api/categories```  
```method : GET, POST, PUT, DELETE```

```endpoint : /api/competitions```  
```method : GET, POST, PUT, DELETE```

- User

Roles user dapat melakukan beberapa hal dalam pemanggilan API Portal Lomba IT. diantaranya

```endpoint : /api/users```  
```method : POST```

```endpoint : /api/users/me```  
```method : GET```

```endpoint : /api/auth```  
```method : POST```

```endpoint : /api/categories```  
```method : GET```

```endpoint : /api/competitions```  
```method : GET```

# Status Code

```200 OK - the request was successful```

```400 Bad Request - You’ve made an invalid request```

```401 Unauthorized - invalid x-auth-token in header```

```403 Forbidden - Not Admin```

```404 Not Found - Resource not found```

```500 Internal Server Error - omething is not working on our end```