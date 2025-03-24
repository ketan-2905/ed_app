"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { dummyQuiz } from "@/lib/dummy";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizAttempt {
  questionId: number;
  timeSpent: number;
  isCorrect: boolean;
  selectedAnswer: number;
}

interface QuizParams {
  topic: string;
  fileid: string[];
  difficulty: string;
  numberOfQuestions: number;
}

interface QuizStats {
  totalTime: number;
  correctAnswers: number;
  incorrectAnswers: number;
  accuracyRate: number;
  averageTimePerQuestion: number;
  fastestQuestion: QuizAttempt;
  slowestQuestion: QuizAttempt;
}

interface QuizContextType {
  quizState: QuizQuestion[];
  currentQuestion: number;
  selectedAnswer: number | null;
  attempts: QuizAttempt[];
  showResults: boolean;
  isReview: boolean;
  currentTime: number;
  progress: number;
  handleGenerateQuiz: (params: QuizParams) => void;
  handleAnswerSelect: (optionIndex: number) => void;
  handleNext: () => void;
  handlePrevious: () => void;
  startNewQuiz: () => void;
  startReview: () => void;
  calculateQuizStats: () => QuizStats;
  getPieChartData: () => any[];
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [quizState, setQuizState] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());
  const [isReview, setIsReview] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [quizStartTime, setQuizStartTime] = useState<number>(Date.now());

  // Timer effect
  useEffect(() => {
    if (!showResults && !isReview) {
      const timer = setInterval(() => {
        setCurrentTime(Math.round((Date.now() - questionStartTime) / 1000));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [questionStartTime, showResults, isReview]);

  const progress = ((currentQuestion + 1) / quizState.length) * 100;

  const handleGenerateQuiz = async (params: QuizParams) => {
    // Here you would make your API call
    // For now using dummy data
    console.log(params);
    setQuizState(dummyQuiz);
    resetQuiz();
  };

  const handleAnswerSelect = (optionIndex: number) => {
    setSelectedAnswer(optionIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === null && !isReview) return;

    const timeSpent = currentTime;

    if (!isReview) {
      const isCorrect = selectedAnswer === quizState[currentQuestion].correctAnswer;
      setAttempts([
        ...attempts,
        {
          questionId: currentQuestion,
          timeSpent,
          isCorrect,
          selectedAnswer: selectedAnswer!,
        },
      ]);
    }

    if (currentQuestion + 1 < quizState.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setQuestionStartTime(Date.now());
      setCurrentTime(0);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      if (!isReview) {
        setSelectedAnswer(attempts[currentQuestion - 1]?.selectedAnswer ?? null);
      }
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAttempts([]);
    setShowResults(false);
    setIsReview(false);
    setQuestionStartTime(Date.now());
    setQuizStartTime(Date.now());
    setCurrentTime(0);
  };

  const startNewQuiz = () => {
    setQuizState([]);
    resetQuiz();
  };

  const startReview = () => {
    setIsReview(true);
    setCurrentQuestion(0);
    setShowResults(false);
  };

  const getPieChartData = () => {
    return attempts.map((attempt, index) => ({
      name: `Question ${index + 1}`,
      value: attempt.timeSpent,
      questionNum: index + 1,
      isCorrect: attempt.isCorrect,
    }));
  };

  const calculateQuizStats = (): QuizStats => {
    const totalTime = attempts.reduce((sum, attempt) => sum + attempt.timeSpent, 0);
    const correctAnswers = attempts.filter((a) => a.isCorrect).length;
    const incorrectAnswers = attempts.length - correctAnswers;
    const accuracyRate = Math.round((correctAnswers / attempts.length) * 100);
    const averageTimePerQuestion = Math.round(totalTime / attempts.length);
    const fastestQuestion = [...attempts].sort((a, b) => a.timeSpent - b.timeSpent)[0];
    const slowestQuestion = [...attempts].sort((a, b) => b.timeSpent - a.timeSpent)[0];

    return {
      totalTime,
      correctAnswers,
      incorrectAnswers,
      accuracyRate,
      averageTimePerQuestion,
      fastestQuestion,
      slowestQuestion,
    };
  };

  return (
    <QuizContext.Provider
      value={{
        quizState,
        currentQuestion,
        selectedAnswer,
        attempts,
        showResults,
        isReview,
        currentTime,
        progress,
        handleGenerateQuiz,
        handleAnswerSelect,
        handleNext,
        handlePrevious,
        startNewQuiz,
        startReview,
        calculateQuizStats,
        getPieChartData,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
}