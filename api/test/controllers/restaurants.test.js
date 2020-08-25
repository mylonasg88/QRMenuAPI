const request = require("supertest");
var fs = require("fs");

const server = require("../../src/server");
// const connection = require("../../src/services/db/mongo");
const { MongoClient } = require("mongodb");
const config = require("../../src/config/index");

// const { expect } = require("chai");

describe("Restaraunts Controller", () => {
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

  it.only("/POST a restaurant", (done) => {
    var base64Image = base64_encode("test/_files/athenssparestaurant.jpeg");

    return request(server)
      .post("/restaurants")
      .send({
        name: "Peruvian",
        filename: "peruvian_rest.jpeg",
        image: base64Image,
      })
      .set("Accept", "application/json")

      .expect(200)
      .then((response) => {
        console.log("FINISHED CREATING A RESTAURANT");

        // console.log("resonse", response);
        expect(response.body).toHaveProperty("_id");

        done();
      });
  });

  test("/GET all restaurants", (done) => {
    return request(server)
      .get("/restaurants")
      .then((response) => {
        // console.log(response.body);
        console.log("RESPONSE FINISHED ==============");

        const item = response.body.data[0];
        console.log(item);

        expect(item).toHaveProperty("_id");
        expect(item).toHaveProperty("name");
        expect(item).toHaveProperty("image");
        expect(item).toHaveProperty("createdAt");
        expect(item).toHaveProperty("updatedAt");

        done();
      });
  });

  test("/GET a restaurant", (done) => {
    const restaurantId = "5f34fdeafcaf6b0be53c84fd";
    return request(server)
      .get(`/restaurants/${restaurantId}`)
      .then((response) => {
        console.log("RESPONSE FINISHED");

        // Response structure must be correct
        expect(response.body.status).toBe("success");
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("data");

        const item = response.body.data;

        expect(item).toHaveProperty("_id");
        expect(item).toHaveProperty("name");
        expect(item).toHaveProperty("image");
        expect(item).toHaveProperty("createdAt");
        expect(item).toHaveProperty("updatedAt");

        done();
      });
  });

  // test("/GET all categories", async (done) => {
  //   const categories = db.collection("categories");
  //   const allCategories = await categories.find();

  //   // allCategories.forEach((item) => {
  //   //   // console.log(item);
  //   // });

  //   request(server)
  //     .get("/categories")
  //     .set("Accept", "application/json")
  //     .then((response) => {
  //       expect(response.body.status).toBe("success");
  //       expect(response.status).toBe(200);
  //       expect(response.body.data.length).toBeGreaterThan(0);

  //       const item = response.body.data[0];

  //       expect(item).toHaveProperty("_id");
  //       expect(item).toHaveProperty("name");
  //       expect(item).toHaveProperty("image");
  //       expect(item).toHaveProperty("restaurant");
  //       expect(item).toHaveProperty("createdAt");
  //       expect(item).toHaveProperty("updatedAt");

  //       done();
  //     });
  // });
});

function base64_encode(file) {
  // read binary data
  var bitmap = "data:image/jpeg;base64," + fs.readFileSync(file, "base64");
  // console.log(bitmap);
  return bitmap;
  // convert binary data to base64 encoded string
  // return new Buffer.alloc(bitmap).toString("base64");
}
