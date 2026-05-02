import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "motion/react";
import { X, Trophy, BrainCircuit, ArrowRight, CheckCircle2, XCircle } from "lucide-react";

type Theme = "Politics" | "Technology" | "Sports" | "Environment";

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const THEME_DATA: Record<Theme, Question[]> = {
  Technology: [
    { id: "t1", text: "What does AI stand for?", options: ["Artificial Intelligence", "Automated Interface", "Advanced Input", "All inclusive"], correctAnswer: 0, explanation: "AI stands for Artificial Intelligence, focusing on creating systems capable of human-like intelligence." },
    { id: "t2", text: "Which company developed the GPT models?", options: ["Google", "Microsoft", "OpenAI", "Meta"], correctAnswer: 2, explanation: "OpenAI is the artificial intelligence research laboratory that developed the GPT series of models." }
  ],
  Politics: [
    { id: "p1", text: "How often are US Presidential elections held?", options: ["2 Years", "4 Years", "5 Years", "6 Years"], correctAnswer: 1, explanation: "US Presidential elections occur every four years." }
  ],
  Sports: [
    { id: "s1", text: "In which sport would you perform a slam dunk?", options: ["Football", "Tennis", "Basketball", "Golf"], correctAnswer: 2, explanation: "A slam dunk is a type of basketball shot that is performed when a player jumps in the air, controls the ball above the horizontal plane of the rim, and scores by putting the ball directly through the basket." }
  ],
  Environment: [
    { id: "e1", text: "Which greenhouse gas is most responsible for global warming?", options: ["Methane", "Carbon Dioxide", "Nitrous Oxide", "Ozone"], correctAnswer: 1, explanation: "Carbon dioxide is the primary greenhouse gas emitted through human activities." }
  ]
};

export function QuizWindow() {
  const [open, setOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const startQuiz = (theme: Theme) => {
    setSelectedTheme(theme);
    setCurrentQuestionIdx(0);
    setIsFlipped(false);
    setSelectedAnswer(null);
    setScore(0);
    setQuizFinished(false);
  };

  const handleAnswer = (idx: number) => {
    if (isFlipped) return;
    
    setSelectedAnswer(idx);
    setIsFlipped(true);
    
    if (selectedTheme) {
      const q = THEME_DATA[selectedTheme][currentQuestionIdx];
      if (idx === q.correctAnswer) {
        setScore(prev => prev + 1);
      }
    }
  };

  const nextQuestion = () => {
    if (!selectedTheme) return;
    
    if (currentQuestionIdx < THEME_DATA[selectedTheme].length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
      setIsFlipped(false);
      setSelectedAnswer(null);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setSelectedTheme(null);
    setQuizFinished(false);
  };

  const currentQuestion = selectedTheme ? THEME_DATA[selectedTheme][currentQuestionIdx] : null;

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-full font-medium shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 transition-all duration-300 flex items-center gap-2">
          <BrainCircuit className="w-5 h-5" />
          <span>Play Quiz</span>
        </button>
      </Dialog.Trigger>
      
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" 
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
              >
                <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50/50">
                  <Dialog.Title className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Trophy className="w-6 h-6 text-yellow-500" />
                    Knowledge Quiz
                  </Dialog.Title>
                  <Dialog.Close asChild>
                    <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                      <X className="w-5 h-5 text-gray-500" />
                    </button>
                  </Dialog.Close>
                </div>

                <div className="p-8 min-h-[400px] flex flex-col justify-center perspective-[1500px]">
                  {!selectedTheme ? (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                      <h2 className="text-2xl font-bold text-gray-800 mb-6">Select a Theme to Begin</h2>
                      <div className="grid grid-cols-2 gap-4">
                        {(Object.keys(THEME_DATA) as Theme[]).map((theme) => (
                          <button
                            key={theme}
                            onClick={() => startQuiz(theme)}
                            className="p-6 bg-white border-2 border-gray-100 rounded-xl shadow-sm hover:border-indigo-400 hover:shadow-md hover:scale-[1.02] transition-all text-lg font-semibold text-gray-700"
                          >
                            {theme}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  ) : quizFinished ? (
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
                      <Trophy className="w-24 h-24 text-yellow-500 mx-auto mb-6" />
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Complete!</h2>
                      <p className="text-xl text-gray-600 mb-8">
                        You scored <span className="font-bold text-indigo-600">{score}</span> out of {THEME_DATA[selectedTheme].length}
                      </p>
                      <button 
                        onClick={resetQuiz}
                        className="bg-indigo-600 text-white px-8 py-3 rounded-full font-medium hover:bg-indigo-700 transition-colors"
                      >
                        Play Another Theme
                      </button>
                    </motion.div>
                  ) : currentQuestion ? (
                    <div className="relative w-full max-w-lg mx-auto h-[350px]" style={{ perspective: "1500px" }}>
                      <motion.div
                        className="w-full h-full relative"
                        style={{ transformStyle: "preserve-3d" }}
                        initial={false}
                        animate={{ rotateY: isFlipped ? 180 : 0 }}
                        transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 20 }}
                      >
                        {/* Front of Card (Question) */}
                        <div 
                          className="absolute inset-0 w-full h-full backface-hidden bg-white border border-gray-200 rounded-2xl shadow-xl p-8 flex flex-col"
                          style={{ backfaceVisibility: "hidden" }}
                        >
                          <div className="flex justify-between items-center mb-6 text-sm font-medium text-gray-500">
                            <span>{selectedTheme}</span>
                            <span>Question {currentQuestionIdx + 1}/{THEME_DATA[selectedTheme].length}</span>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-8">{currentQuestion.text}</h3>
                          <div className="space-y-3 mt-auto">
                            {currentQuestion.options.map((opt, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleAnswer(idx)}
                                disabled={isFlipped}
                                className="w-full text-left px-4 py-3 rounded-xl border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 transition-colors font-medium text-gray-700"
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Back of Card (Answer & Explanation) */}
                        <div 
                          className="absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl shadow-xl p-8 flex flex-col"
                          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                        >
                          <div className="flex flex-col items-center justify-center h-full text-center">
                            {selectedAnswer === currentQuestion.correctAnswer ? (
                              <>
                                <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
                                <h3 className="text-2xl font-bold text-green-700 mb-2">Correct!</h3>
                              </>
                            ) : (
                              <>
                                <XCircle className="w-16 h-16 text-red-500 mb-4" />
                                <h3 className="text-2xl font-bold text-red-700 mb-2">Incorrect</h3>
                                <p className="text-gray-600 mb-4 font-medium">
                                  The correct answer was: <span className="text-indigo-700">{currentQuestion.options[currentQuestion.correctAnswer]}</span>
                                </p>
                              </>
                            )}
                            <p className="text-gray-700 mb-8">{currentQuestion.explanation}</p>
                            <button 
                              onClick={nextQuestion}
                              className="bg-indigo-600 text-white px-8 py-3 rounded-full font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2 mt-auto"
                            >
                              {currentQuestionIdx < THEME_DATA[selectedTheme].length - 1 ? "Next Question" : "See Results"}
                              <ArrowRight className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  ) : null}
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
