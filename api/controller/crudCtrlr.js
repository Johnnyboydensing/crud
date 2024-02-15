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
  try {
    const crud = await Crud.find();
    return res.status(501).send({ entries: crud });
  } catch (error) {
    return res.status(501).send({ msg: "Server failed..." });
  }
};
module.exports = { Insert, Delete, Update, GetData };
