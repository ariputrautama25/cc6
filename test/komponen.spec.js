const supertest = require("supertest");
const app = require("../app.js");
const truncate = require("../utils/truncate");

truncate.komponen();

const komponen = {
  komponen_id: "1",
  nama_komponen: "buku",
};

// Komponen
describe("TEST /auth/komponen endpoint", () => {
  // positive
  test("Komponen berhasil : menampilkan komponen", () => {
    return supertest(app)
      .post("/auth/komponen")
      .send(komponen)
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
        expect(res.body.message).toBe("user created komponen");
      });
  });

  // negative
  test("Komponen gagal : menampilkan komponen", () => {
    return supertest(app)
      .post("/auth/komponen")
      .send(komponen)
      .then((res) => {
        console.log(res.body);

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("data");
        expect(res.body.status).toBe(false);
        expect(res.body.message).toBe("komponen already used!");
      });
  });
});
