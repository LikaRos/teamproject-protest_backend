const { Question } = require("../../models/question");
const { RequestError } = require("../../helpers");

const getResults = async (req, res) => {
  const answers = req.body;

  if (!Object.keys(answers).length) {
    throw RequestError(404);
  }

  const ids = answers.map(({ id }) => id);

  const questions = await Question.find({ _id: { $in: ids } });

  const writeAnswersQuantity = answers.reduce((acc, answer) => {
    const checkAnswer = questions.find((question) => String(question._id) === answer.id);

    if (checkAnswer && checkAnswer.rightAnswer === answer.answer) {
      acc += 1;
    }
    return acc;
  }, 0);

  const result = {
    questionsQuantity: questions.length,
    writeAnswersQuantity,
  };

  res.json(result);
};

module.exports = getResults;