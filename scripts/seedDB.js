const mongoose = require("mongoose");
const { User, LynksAddress } = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/lynksdb"
);

const locationSeed = [
    {
        "address": "11592 Celine St. El Monte CA, 91732",
        "latitude": 34.098130,
        "longitude": -118.011160,
        "location": [-118.011160, 34.098130]
    },
    {
        "address" : "18315 brookhurst st. #1 fountain valley ca 92708",
        "longitude" : -117.954298,
        "latitude" : 33.695969,
        "location" : [ 
            -117.954298, 
            33.695969
        ],
    },
    {
        "address" : "298 Live Oak Ave, Arcadia ca 91006",
        "longitude" : -118.023469,
        "latitude" : 34.108332,
        "location" : [ 
            -118.023469, 
            34.108332
        ]
    },
    {
        "address" : "10601 e valley blvd El Monte ca 91731",
        "longitude" : -118.039738,
        "latitude" : 34.076684,
        "location" : [ 
            -118.039738, 
            34.076684
        ],
    },
    {
        "address" : "810 e valley blvd Alhambra ca 91801",
        "longitude" : -118.114547,
        "latitude" : 34.079025,
        "location" : [ 
            -118.114547, 
            34.079025
        ],
    },
    {
        "address" : "1430 s fairfax Ave Los Angeles ca 90019",
        "longitude" : -118.366731,
        "latitude" : 34.050565,
        "location" : [ 
            -118.366731, 
            34.050565
        ],
    }
];

const createTestUser = {
    "firstName": "Wilson",
    "lastName": "Lam",
    "username": "test",
    "address": "500 Baldwin Ave. Temple City CA, 91780",
    "password": "test1234",
    "gender": "male",
    "phoneNumber": "555-555-5555",
    "email": "w@l.com",
    "description": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis quam dolor laudantium dolorum molestiae exercitationem officiis quisquam consequuntur? Laborum in rerum temporibus numquam. Consequatur sed corrupti voluptatibus vel ea ut nulla iusto nemo laborum quae, earum facilis possimus placeat ratione.",
    "age": "33"
}

const seedUserAndAddresses = async () => {
    User.create(createTestUser);
    LynksAddress
        .remove({})
        .then(() => LynksAddress.collection.insertMany(locationSeed))
        .then(data => {
            console.log(`${data.result.n} records inserted!`);
            process.exit(0);
        })
        .catch(err => {
            console.error(err);
            process.exit(1);
        })
};

seedUserAndAddresses();

