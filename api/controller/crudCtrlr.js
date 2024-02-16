/** @format */

const Crud = require("../model/crudModel");

const Insert = async (req, res) => {
  try {
    const crud = await Crud.insertMany(req.body, { ordered: false });
    return res.status(200).send({ msg: "Success..." });
  } catch (error) {
    return res.status(501).send({ msg: "Server failed..." });
  }
};

const Delete = async (req, res) => {
  try {
    const crud = await Crud.findByIdAndDelete(req.params.id);
    return res.status(200).send({ msg: "Success..." });
  } catch (error) {
    return res.status(501).send({ msg: "Server failed..." });
  }
};

const Update = async (req, res) => {
  try {
    const crud = await Crud.findByIdAndUpdate(req.params.id, req.body);
    return res.status(200).send({ msg: "Success..." });
  } catch (error) {
    return res.status(501).send({ msg: "Server failed..." });
  }
};

const GetData = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const totalItems = await Crud.countDocuments();
  const totalPages = Math.ceil(totalItems / limit);

  try {
    let query = {};

    if (req.query.category) {
      query = { Category: req.query.category };
    }

    const crud = await Crud.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    if (!crud || crud.length === 0) {
      return res.status(404).send({ msg: "No more data available" });
    }

    const categories = await Crud.distinct("Category");

    const categoryTotals = await Promise.all(
      categories.map(async (category) => {
        const total = await Crud.countDocuments({ Category: category });
        return { category: category, total: total };
      })
    );

    return res.status(200).send({
      currentPage: page,
      totalPages: totalPages,
      limit: limit,
      totalItems: totalItems,
      data: crud,
      totalCategories: categoryTotals,
    });
  } catch (error) {
    return res.status(501).send({ msg: "Server failed..." });
  }
};
module.exports = { Insert, Delete, Update, GetData };
