const app = require("../server");
const mongoose = require("mongoose");
const supertest = require("supertest");
const { TestUser } = require("../models");


beforeEach((done) => {
  mongoose.connect("mongodb://localhost:27017/lynksdb",
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => done());
});

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done())
  });

test("GET /api/users", async () => {
  const testObj = {
    "firstName": "Test",
    "lastName": "Test",
    "username": "test",
    "email": "test@test.com",
    "address": "111 test ave. los angeles los angeles, 90087?",
    "gender": "male",
    "password": "test1234"
  };
  const post = await TestUser.create(testObj);

  await supertest(app).get("/api/users/testuser").expect(200).then(response => {
      expect(response.body._id).toBe(post._id);
  })
});
