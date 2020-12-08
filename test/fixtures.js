
const users = [
  {
    'id': 1,
    'full_name': 'bobby jackson',
    'email': 'test@test.com',
    'password': 'password123',
    'account_type': 'personal'},

  {
    'id': 2,
    'full_name': 'Michael Jordan',
    'email': 'mj@jordan.com',
    'password': 'password123',
    'account_type': 'organization'},

  {
    'id': 3,
    'full_name': 'Kobe Bryant',
    'email': 'kobe@lakers.com',
    'password': 'password123',
    'account_type': 'personal'},

  {
    'id': 4,
    'full_name': 'Steph Curry',
    'email': 'steph@warriors.com',
    'password': 'password123',
    'account_type': 'personal'},

  {
    'id': 5,
    'full_name': 'clay thompson',
    'email': 'kthompson@warriors.com',
    'password': 'password123',
    'account_type': 'personal'},

  {
    'id': 6,
    'full_name': 'athony davis',
    'email': 'ad@lakers.com',
    'password': 'password123',
    'account_type': 'organization'}
];

const posts = [
    {
        'id': 1,
        "users_id": 1,
        "event_title": "The Block",
        "event_description": "we will rally outside city hall",
        "event_type": "sit in",
        "event_date": "2017-03-26 10:10:10-05:00",
        "event_location": "city hall"
    },
    {
        'id': 2,
        "users_id": 2,
        "event_title": "Target",
        "event_description": "we will rally outside target",
        "event_type": "walk out",
        "event_date": "2018-03-26 10:10:10-05:00",
        "event_location": "target"
    },
    {
        'id': 3,
        "users_id": 3,
        "event_title": "House",
        "event_description": "we will rally outside house",
        "event_type": "sit in",
        "event_date": "2019-03-26 10:10:10-05:00",
        "event_location": "house"
    },
    {
        'id': 4,
        "users_id": 4,
        "event_title": "Police Station",
        "event_description": "we will rally outside police station",
        "event_type": "peaceful protest",
        "event_date": "2020-03-26 10:10:10-05:00",
        "event_location": "downtown metro station"
    },
    {
        'id': 5,
        "users_id": 5,
        "event_title": "Wallgreens",
        "event_description": "we will rally outside walgreens",
        "event_type": "sit in",
        "event_date": "2018-02-26 10:10:10-05:00",
        "event_location": "walgreens"
    },
    {
        'id': 6,
        "users_id": 6,
        "event_title": "7/11",
        "event_description": "we will rally outside 7/11",
        "event_type": "sit in",
        "event_date": "2016-03-26 10:10:10-05:00",
        "event_location": "7/11"
    }
]

const comments = [
    {
        "id": 1,
        "posts_id": 1,
        "content": "HELL YEAh!",
        "date_created": "2017-03-26 10:10:10-05:00"L
    },
    {
        "id": 2,
        "posts_id": 2,
        "content": "woooooooow!!!!",
        "date_created": "2018-03-26 10:10:10-05:00"
    },
    {
        "id": 3,
        "posts_id": 3,
        "content": "this is amazing!",
        "date_created": "2019-03-26 10:10:10-05:00"
    },
    {
        "id": 4,
        "posts_id": 4,
        "content": "positive, positive, positive, only.",
        "date_created": "2020-03-26 10:10:10-05:00"
    },
    {
        "id": 5,
        "posts_id": 5,
        "content": "Great energy and dedication, cannot wait.",
        "date_created": "2018-02-26 10:10:10-05:00"
   },
    {
        "id": 6,
        "posts_id": 6,
        "content": "So proud of this movement!",
        "date_created": "2016-03-26 10:10:10-05:00"
    }
]

const pancakes = [
  {
    'title': 'French Crepes',
    'completed': false
  },
  {
    'title': 'Danish Aebleskiver',
    'completed': true
  },
  {
    'title': 'Italian Crespelle',
    'completed': false
  },
  {
    'title': 'Indonesian Serabi',
    'completed': true
  },
  {
    'title': 'Moroccan Msemen',
    'completed': false
  }
];

module.exports = {
  users,
  pancakes,
  posts,
  comments
}; 