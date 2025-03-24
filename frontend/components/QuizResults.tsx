"use client";

import { Trophy, Clock, CheckCircle, Timer, ArrowRight, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { CustomTooltip } from "./QuizPage";
import { useQuiz } from "./QuizContext";

export function QuizResults() {
  const {
    quizState,
    attempts,
    startReview,
    startNewQuiz,
    calculateQuizStats,
    getPieChartData,
  } = useQuiz();

  const stats = calculateQuizStats();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Trophy className="w-16 h-16 mx-auto text-yellow-500" />
        <h2 className="text-2xl font-bold mt-4">Quiz Complete!</h2>
        <p className="text-xl mt-2">
          You scored {attempts.filter((a) => a.isCorrect).length} out of {quizState.length}
        </p>
      </div>

      {attempts.length > 0 && (
        <div className="mt-6 space-y-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-center">
              Time Distribution per Question
            </h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={getPieChartData()}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={90}
                    innerRadius={40}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    paddingAngle={4}
                    animationBegin={0}
                    animationDuration={1500}
                    animationEasing="ease-in-out"
                  >
                    {getPieChartData().map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.isCorrect ? "#4CAF50" : "#F44336"}
                        stroke="#fff"
                        strokeWidth={1}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                    payload={[
                      { value: "Correct", type: "square", color: "green" },
                      { value: "Incorrect", type: "square", color: "red" },
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-6 bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-6 text-center">
              Quiz Performance Summary
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                <Clock className="w-6 h-6 text-blue-500 mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-300">Total Time</p>
                <p className="text-xl font-bold">{stats.totalTime}s</p>
              </div>
              <div className="flex flex-col items-center p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                <CheckCircle className="w-6 h-6 text-green-500 mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-300">Accuracy</p>
                <p className="text-xl font-bold">{stats.accuracyRate}%</p>
              </div>
              <div className="flex flex-col items-center p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                <Timer className="w-6 h-6 text-purple-500 mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-300">Avg. Time</p>
                <p className="text-xl font-bold">{stats.averageTimePerQuestion}s</p>
              </div>
              <div className="flex flex-col items-center p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                <Trophy className="w-6 h-6 text-yellow-500 mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-300">Score</p>
                <p className="text-xl font-bold">
                  {stats.correctAnswers}/{quizState.length}
                </p>
              </div>
              <div className="flex flex-col items-center p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                <ArrowRight className="w-6 h-6 text-teal-500 mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-300">Fastest Q</p>
                <p className="text-xl font-bold">Q{stats.fastestQuestion.questionId + 1}</p>
              </div>
              <div className="flex flex-col items-center p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                <XCircle className="w-6 h-6 text-red-500 mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-300">Incorrect</p>
                <p className="text-xl font-bold">{stats.incorrectAnswers}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex w-full gap-2">
        <Button onClick={startReview} variant="outline">
          Review Answers
        </Button>
        <Button onClick={startNewQuiz}>Start New Quiz</Button>
      </div>
    </div>
  );
}