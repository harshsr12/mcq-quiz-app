import React, { useState } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";

const initialMcqs = [
  {
    question: "Which vitamin is also known as ascorbic acid?",
    options: ["Vitamin A", "Vitamin B12", "Vitamin C", "Vitamin D"],
    answer: "Vitamin C",
  },
  {
    question: "Which of the following is a beta-lactam antibiotic?",
    options: ["Vancomycin", "Penicillin", "Chloramphenicol", "Erythromycin"],
    answer: "Penicillin",
  },
];

export default function App() {
  const [mcqs, setMcqs] = useState(initialMcqs);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState("");
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [newOptions, setNewOptions] = useState(["", "", "", ""]);
  const [newAnswer, setNewAnswer] = useState("");

  const handleSubmit = () => {
    if (selected === mcqs[current].answer) {
      setScore(score + 1);
    }
    if (current + 1 < mcqs.length) {
      setCurrent(current + 1);
      setSelected("");
    } else {
      setCompleted(true);
    }
  };

  const handleAddQuestion = () => {
    if (newQuestion && newOptions.every(opt => opt) && newAnswer) {
      const newMcq = {
        question: newQuestion,
        options: newOptions,
        answer: newAnswer,
      };
      setMcqs([...mcqs, newMcq]);
      setNewQuestion("");
      setNewOptions(["", "", "", ""]);
      setNewAnswer("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-100 via-white to-pink-100 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-10 tracking-tight">MCQ Quiz App</h1>

      <div className="bg-white shadow-2xl rounded-2xl p-6 w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-4 text-indigo-700">Admin: Add New Question</h2>
        <input
          type="text"
          placeholder="Enter question"
          value={newQuestion}
          onChange={e => setNewQuestion(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full mb-2"
        />
        {newOptions.map((opt, idx) => (
          <input
            key={idx}
            type="text"
            placeholder={`Option ${idx + 1}`}
            value={opt}
            onChange={e => {
              const newOpts = [...newOptions];
              newOpts[idx] = e.target.value;
              setNewOptions(newOpts);
            }}
            className="border border-gray-300 p-2 rounded w-full mb-2"
          />
        ))}
        <input
          type="text"
          placeholder="Correct Answer"
          value={newAnswer}
          onChange={e => setNewAnswer(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full mb-4"
        />
        <Button onClick={handleAddQuestion} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded transition">Add Question</Button>
      </div>

      <div className="mt-10 w-full max-w-3xl">
        {!completed ? (
          <Card className="bg-white shadow-xl rounded-xl p-6">
            <CardContent>
              <p className="text-xl font-semibold mb-4 text-gray-700">{mcqs[current].question}</p>
              <div className="grid grid-cols-1 gap-3">
                {mcqs[current].options.map((opt, i) => (
                  <Button
                    key={i}
                    className={`w-full py-2 rounded text-lg border transition-all duration-200 ${
                      selected === opt ? 'bg-indigo-600 text-white' : 'bg-gray-100 hover:bg-indigo-100'
                    }`}
                    onClick={() => setSelected(opt)}
                  >
                    {opt}
                  </Button>
                ))}
              </div>
              <Button
                className="mt-6 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
                disabled={!selected}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-white shadow-xl rounded-xl p-6 text-center">
            <CardContent>
              <p className="text-2xl font-bold text-indigo-700">Quiz Completed!</p>
              <p className="text-xl mt-4 text-gray-800">Your Score: {score} / {mcqs.length}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
