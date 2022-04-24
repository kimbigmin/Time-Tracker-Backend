const { Schema } = require("mongoose");

const UserSchema = new Schema(
  {
    userId: String,
    timeData: [
      {
        type: Schema.Types.ObjectId,
        ref: "Time",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = UserSchema;
