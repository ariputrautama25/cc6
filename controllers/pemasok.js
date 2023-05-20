const { pemasok } = require("../models");

module.exports = {
  index: async (req, res, next) => {
    try {
      const pemasoks = await pemasok.findAll();

      return res.status(200).json({
        status: true,
        message: "success",
        data: pemasoks,
      });
    } catch (error) {
      next(error);
    }
  },

  show: async (req, res, next) => {
    try {
      const { pemasok_id } = req.params.id;

      const pemasoks = await pemasok.findOne({ where: { id: pemasok_id } });

      if (!pemasoks) {
        return res.status(404).json({
          status: false,
          message: `can't find pemasok with id ${pemasok_id}!`,
          data: null,
        });
      }

      return res.status(200).json({
        status: true,
        message: "success",
        data: pemasoks,
      });
    } catch (error) {
      next(error);
    }
  },

  store: async (req, res, next) => {
    try {
      const { pemasok_id, nama } = req.body;

      const pemasoks = await pemasok.create({
        pemasok_id: pemasok_id,
        nama: nama,
      });

      return res.status(201).json({
        status: true,
        message: "success",
        data: pemasoks,
      });
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const { pemasok_id } = req.params.id;

      const updated = await pemasok.update(req.body, {
        where: { id: pemasok_id },
      });

      if (updated[0] == 0) {
        return res.status(404).json({
          status: false,
          message: `can't find pemasok with id ${pemasok_id}!`,
          data: null,
        });
      }

      return res.status(201).json({
        status: true,
        message: "success",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  },

  destroy: async (req, res, next) => {
    try {
      const { pemasok_id } = req.params.id;

      const deleted = await pemasok.destroy({ where: { id: pemasok_id } });

      if (!deleted) {
        return res.status(404).json({
          status: false,
          message: `can't find pemasok with id ${pemasok_id}!`,
          data: null,
        });
      }

      return res.status(200).json({
        status: true,
        message: "success",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  },
};
