const supertest = require("supertest");
const app = require("../app.js");
const truncate = require("../utils/truncate");

truncate.komponen();

const komponen = {
  komponen_id: "1",
  nama_komponen: "buku",
};

// index
describe("TEST /auth/index endpoint", () => {
  // positive
  test("Komponen berhasil : menampilkan komponen", () => {
    return supertest(app)
      .post("/auth/index")
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
      .post("/auth/index")
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

// show
describe("TEST /auth/show endpoint", () => {
  test("Login berhasil : email dan password valid", () => {
    return supertest(app)
      .post("/auth/show")
      .send(user)
      .then((res) => {
        console.log(res.body);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("data");
        expect(res.body.data).toHaveProperty("token");
        expect(res.body.status).toBe(true);
        expect(res.body.message).toBe("login success!");

        user.token = res.body.data.token;
      });
  });

  test("Login gagal : email dan password tidak valid", () => {
    return supertest(app)
      .post("/auth/show")
      .send({
        email: user.email,
        password: `${user.password}45`,
      })
      .then((res) => {
        console.log(res.body);

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("data");
        expect(res.body.status).toBe(false);
        expect(res.body.message).toBe("credential is not valid!");
      });
  });
});
