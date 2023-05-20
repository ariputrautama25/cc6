const supertest = require("supertest");
const app = require("../app.js");
const truncate = require("../utils/truncate");

truncate.pemasok();

const pemasok = {
  pemasok_id: "1",
  nama: "yanto",
};

// Pemasok
describe("TEST /auth/pemasok endpoint", () => {
  // positive
  test("pemasok berhasil : menampilkan pemasok", () => {
    return supertest(app)
      .post("/auth/pemasok")
      .send(pemasok)
      .then((res) => {
        console.log(res.body);

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("data");
        expect(res.body.data).toHaveProperty("id");
        expect(res.body.data).toHaveProperty("name");
        expect(res.body.data).toHaveProperty("email");
        expect(res.body.status).toBe(true);
        expect(res.body.message).toBe("user created pemasok");
      });
  });

  // negative
  test("pemasok gagal : menampilkan pemasok", () => {
    return supertest(app)
      .post("/auth/pemasok")
      .send(pemasok)
      .then((res) => {
        console.log(res.body);

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("data");
        expect(res.body.status).toBe(false);
        expect(res.body.message).toBe("pemasok already used!");
      });
  });
});
