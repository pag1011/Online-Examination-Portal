const {
  GoogleGenerativeAI,
} = require("@google/generative-ai");

const genAI =
  new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
  );

const localEvaluation =
  (
    expectedAnswer,
    studentAnswer
  ) => {

    const expectedWords =
      expectedAnswer
        .toLowerCase()
        .split(/\s+/)
        .filter(
          (word) =>
            word.length > 2
        );

    const studentWords =
      studentAnswer
        .toLowerCase()
        .split(/\s+/);

    let matchedKeywords = 0;

    expectedWords.forEach(
      (word) => {

        if (
          studentWords.includes(
            word
          )
        ) {
          matchedKeywords++;
        }

      }
    );

    const score =
      Math.min(
        10,
        Math.round(
          (
            matchedKeywords /
            expectedWords.length
          ) * 10
        )
      );

    let feedback =
      "Needs Improvement";

    if (score >= 8) {

      feedback =
        "Excellent answer. Most important concepts are covered.";

    } else if (
      score >= 5
    ) {

      feedback =
        "Good answer. Some important concepts are covered but more details can be added.";

    } else {

      feedback =
        "Answer is incomplete. Try to include more important concepts.";

    }

    return `
Score: ${score}/10
Feedback: ${feedback}
`;
  };

const evaluateAnswer =
  async (
    expectedAnswer,
    studentAnswer
  ) => {

    try {

      const model =
        genAI.getGenerativeModel({
          model:
            "gemini-2.0-flash",
        });

      const prompt = `
You are an examination evaluator.

Expected Answer:
${expectedAnswer}

Student Answer:
${studentAnswer}

Evaluate the answer.

Return ONLY in this format:

Score: X/10
Feedback: Your feedback here
`;

      const result =
        await model.generateContent(
          prompt
        );

      return result.response.text();

    } catch (error) {

      console.log(
        "Gemini Failed. Using Local Evaluation..."
      );

      return localEvaluation(
        expectedAnswer,
        studentAnswer
      );

    }

  };

module.exports = {
  evaluateAnswer,
};