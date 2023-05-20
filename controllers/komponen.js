const { komponen } = require("../models");

module.exports = {
  index: async (req, res, next) => {
    try {
      const komponens = await komponen.findAll();

      return res.status(200).json({
        status: true,
        message: "success",
        data: komponens,
      });
    } catch (error) {
      next(err);
    }
  },

  show: async (req, res, next) => {
    try {
      const { komponen_id } = req.params.id;

      const komponens = await komponen.findOne({ where: { id: komponen_id } });

      if (!komponens) {
        return res.status(404).json({
          status: false,
          message: `can't find komponen with id ${komponen_id}!`,
          data: null,
        });
      }

      return res.status(200).json({
        status: true,
        message: "success",
        data: komponens,
      });
    } catch (error) {
      next(error);
    }
  },

  store: async (req, res, next) => {
    try {
      const { komponen_id, nama_komponen } = req.body;

      const komponens = await komponen.create({
        komponen_id: komponen_id,
        nama_komponen: nama_komponen,
      });

      return res.status(201).json({
        status: true,
        message: "success",
        data: komponens,
      });
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const { komponen_id } = req.params.id;

      const updated = await komponen.update(req.body, {
        where: { id: komponen_id },
      });

      if (updated[0] == 0) {
        return res.status(404).json({
          status: false,
          message: `can't find komponen with id ${komponen_id}!`,
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
      const { komponen_id } = req.params.id;

      const deleted = await komponen.destroy({ where: { id: komponen_id } });

      if (!deleted) {
        return res.status(404).json({
          status: false,
          message: `can't find komponen with id ${komponen_id}!`,
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
