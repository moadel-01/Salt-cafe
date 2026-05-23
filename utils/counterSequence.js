const Counter = require("../tempModels/counter");

async function getNextSequenceValue(sequenceName) {
  const sequenceDocument = await Counter.findByIdAndUpdate(
    sequenceName,
    {
      $inc: { sequence_value: 1 },
    },
    {
      new: true,
      upsert: true,
    },
  );

  return sequenceDocument.sequence_value;
}

module.exports = getNextSequenceValue;