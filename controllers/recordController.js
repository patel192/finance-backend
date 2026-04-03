import Record from "../models/Record.js";
export const createRecord = async (req, res) => {
  try {
    const { amount, type, category, date, notes } = req.body;
    if (!amount || !type || !category || !date) {
      return res.status(400).json({
        message: "Required fields are missing",
      });
    }
    const record = await Record.create({
      amount,
      type,
      category,
      date,
      notes,
      createdBy: req.user._id,
    });
    res.status(201).json({
      message: "Record created successfully",
      record,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const getRecords = async (req, res) => {
  try {
    const { type, category, startDate, endDate } = req.query;
    const filter = {};
    if (type) {
      filter.type = type;
    }
    if (category) {
      filter.category = category;
    }
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) {
        filter.date.$gte = new Date(startDate);
      }
      if (endDate) {
        filter.date.$lte = new Date(endDate);
      }
    }
    const records = await Record.find(filter).sort({ date: -1 });
    res.status(200).json({
      count: records.length,
      records,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const updateRecord = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);
    if (!record) {
      return res.status(404).json({
        message: "Record not found",
      });
    }
    const updatedRecord = await Record.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );
    res.status(200).json({
      message: "record updated successfully",
      updateRecord,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const deleteRecord = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);
    if (!record) {
      return res.status(404).json({
        message: "Record not found",
      });
    }
    await record.deleteOne();
    res.status(200).json({
      message: "Record deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
