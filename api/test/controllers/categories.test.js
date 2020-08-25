const request = require("supertest");
const server = require("../../src/server");
// const connection = require("../../src/services/db/mongo");
const { MongoClient } = require("mongodb");
const config = require("../../src/config/index");
const Category = require("../../src/models/Category");

// jest.setTimeout(30000);
// const { expect } = require("chai");

describe("Categories Controller", () => {
  let connection;
  let db;

  beforeAll(async (done) => {
    console.log("Before all tests");
    connection = await MongoClient.connect(config.connStr, {
      useNewUrlParser: true,
    });

    db = await connection.db("qrapp");
    done();
  });

  afterAll(async (done) => {
    console.log("After all tests");
    // close connection
    server.close();
    connection.close();
    done();
  });

  test("/GET all categories", (done) => {
    const categories = db.collection("categories");
    // const allCategories = await categories.find();

    // allCategories.forEach((item) => {
    //   // console.log(item);
    // });

    request(server)
      .get("/categories")
      .set("Accept", "application/json")
      .then((response) => {
        expect(response.body.status).toBe("success");
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBeGreaterThan(0);

        const item = response.body.data[0];

        // Test for expected schema
        expect(item).toHaveProperty("_id");
        expect(item).toHaveProperty("name");
        expect(item).toHaveProperty("image");
        expect(item).toHaveProperty("restaurant");
        expect(item).toHaveProperty("createdAt");
        expect(item).toHaveProperty("updatedAt");

        done();
      });
  });

  test("/GET one Category by ID", (done) => {
    // const categories = db.collection("categories");
    // const Category = connection.collection("Category");

    // console.log(Category);
    // console.log("type: ", typeof categories);

    // const c = await categories.find(
    //   { _id: "5f34a1b9839cab013e6163bd" },
    //   function (err, doc) {
    //     console.log("FINISHED===========");
    //     console.log(err, doc);
    //   }
    // );

    const category = new Category({ name: "George", image: "whatever" });
    // await cartegory.save();
    console.log(category);

    return request(server)
      .get("/categories/5f34a1b9839cab013e6163bd")
      .set("Accept", "application/json")
      .then((response) => {
        console.log("RESPONSE RECIEVED");
        expect(response.body.status).toBe("success");
        expect(response.status).toBe(200);
        // expect(response.body.data.length).toBeGreaterThan(0);

        const item = response.body.data;

        // Test for expected schema
        expect(item).toHaveProperty("_id");
        expect(item).toHaveProperty("name");
        expect(item).toHaveProperty("image");
        expect(item).toHaveProperty("restaurant");
        expect(item).toHaveProperty("createdAt");
        expect(item).toHaveProperty("updatedAt");

        done();
      });
    // .end(function (err, res) {
    //   if (err) console.log(err);
    //   else console.log("no errors");
    //   done();
    // });
    // done();
  });
});
