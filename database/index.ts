import Account from "./account.model";
import Answer from "./answer.model";
import Collection from "./collection.model";
import Interaction from "./interaction.model";
import Question from "./question.model";
import tagQuestion from "./tag-question.model";
import Tags from "./tags.model";
import User from "./user.model";
import Vote from "./vote.model";

let models = {
  Account,
  Vote,
  User,
  Interaction,
  Question,
  Tags,
  tagQuestion,
  Answer,
  Collection,
};

export default models;
