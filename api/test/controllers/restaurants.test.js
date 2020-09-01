const request = require("supertest");
var fs = require("fs");

const server = require("../../src/server");
const { MongoClient } = require("mongodb");
const config = require("../../src/config/index");

describe("Restaraunts Controller", () => {
  let connection;
  let db;
  // id for item manipulation
  let _id = "5f35011241221a0d62d8b098";

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

  test("/POST a restaurant", (done) => {
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
        expect(response.body).toHaveProperty("_id");
        _id = response.body._id;

        done();
      });
  });

  test("/GET all restaurants", (done) => {
    return request(server)
      .get("/restaurants")
      .then((response) => {
        const item = response.body.data[0];

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

  test("/PATCH a restaurant", (done) => {
    return request(server)
      .patch(`/restaurants/${_id}`)
      .send({
        name: "Awesome restaurant 2",
      })
      .expect(200, done);
  });

  test("/PATCH a restaurant", (done) => {
    const _idThatDoesntExist = "5f35011241221a0d62d8b090";

    return request(server)
      .patch(`/restaurants/${_idThatDoesntExist}`)
      .send({
        name: "Awesome restaurant 2",
      })
      .expect(404, done);
  });
});

function base64_encode(file) {
  // read binary data
  var bitmap = "data:image/jpeg;base64," + fs.readFileSync(file, "base64");
  // console.log(bitmap);
  return bitmap;
}
