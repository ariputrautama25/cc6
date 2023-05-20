const supertest = require("supertest");
const app = require("../app.js");
const truncate = require("../utils/truncate");

truncate.component();

const komponen = {
  komponen_id: "1",
  nama_komponen: "buku",
};
describe("TEST /komponen endpoint", () => {
  // positive
  test("Tambah komponen", async () => {
    try {
      const res = await supertest(app).get("/komponen");

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.data).toHaveProperty("id");
      expect(res.body.data).toHaveProperty("name");
      expect(res.body.data).toHaveProperty("email");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe("user created komponen");
    } catch (error) {
      expect(error).toBe("error");
    }
  });

  // negative
  test("Tambah Komponen negativ", async () => {
    try {
      const res = await supertest(app).post("/komponen").send(komponen);

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe("email already used!");
    } catch (error) {
      expect(error).toBe("error");
    }
  });
});
