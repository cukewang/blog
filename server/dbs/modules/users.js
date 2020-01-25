// server/dbs/modules/user.js
// 导入Monogoose
import mongoose from "mongoose";
// 创建schema
const Schema = mongoose.Schema;
// 创建userSchema
const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  }
});
// 导出user模型
export default mongoose.model("User", UserSchema);
