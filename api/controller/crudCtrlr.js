/** @format */

const Crud = require("../model/crudModel");

const Insert = async (req, res) => {
  try {
    const crud = await Crud.create(req.body);
    return res.status(501).send({ msg: "Success..." });
  } catch (error) {
    return res.status(501).send({ msg: "Server failed..." });
  }
};

const Delete = async (req, res) => {
  try {
    const crud = await Crud.findByIdAndDelete(req.params.id);
    return res.status(501).send({ msg: "Success..." });
  } catch (error) {
    return res.status(501).send({ msg: "Server failed..." });
  }
};

const Update = async (req, res) => {
  try {
    const crud = await Crud.findByIdAndUpdate(req.params.id, req.body);
    return res.status(501).send({ msg: "Success..." });
  } catch (error) {
    return res.status(501).send({ msg: "Server failed..." });
  }
};

const GetData = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  try {
    const crud = await Crud.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
    return res.status(501).send({ page, limit, data: crud });
  } catch (error) {
    return res.status(501).send({ msg: "Server failed..." });
  }
};
module.exports = { Insert, Delete, Update, GetData };

// API Route http://localhost:3000/api?page=3
