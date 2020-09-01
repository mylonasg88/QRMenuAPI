// init mock database
// const mongoUnit = require('mongo-unit')

// mongoUnit.start().then(() => {
//   console.log('fake mongo is started: ', mongoUnit.getUrl())
//   process.env.DATABASE_URL = mongoUnit.getUrl() // this var process.env.DATABASE_URL = will keep link to fake mongo
//   run() // this line start mocha tests
// })

// after(() => {
//   const dao = require('./dao')
//   console.log('stop')
//   dao.close()
//   return mongoUnit.stop()
// })

const itemsController = require("../../src/controllers/Items.js");

describe("Items Controller", () => {
  test("/GET all Items", (done) => {
    const res = {};
    res.ok = function (data, cache, extraData) {
      const item = data[0];
      expect(data.length).toBeGreaterThan(1);
      expect(item).toHaveProperty("_id");
      expect(item).toHaveProperty("name");
      expect(item).toHaveProperty("image");
      expect(item).toHaveProperty("category");
      expect(item).toHaveProperty("createdAt");
      done();
    };

    var req = {};
    req.query = {};
    itemsController.list(req, res);
  });

  it.only("/GET one Item", (done) => {
    const res = {};
    res.notFound = () => {
      done();
    }; //jest.mock();

    res.ok = function (data, cache, extraData) {
      console.log(data);
      // expect ...
      expect(res.notFound.mock.calls.length).toBe(0);
      done();
    };

    var req = {};
    req.params = { _id: "5f3bf44fe0625a1de047ddf6" };
    itemsController.findOne(req, res);
  });
});
