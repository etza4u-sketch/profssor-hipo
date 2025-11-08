import { AnswerOption, Category } from './types';
import { TFunction } from './i18n/translations';

export const getAnswerOptions = (t: TFunction): AnswerOption[] => [
  { value: 0, text: t('answerOptions.0') },
  { value: 1, text: t('answerOptions.1') },
  { value: 2, text: t('answerOptions.2') },
  { value: 3, text: t('answerOptions.3') },
  { value: 4, text: t('answerOptions.4') },
];

const questionIdsByCategoryId: { [key: number]: number[] } = {
  1: Array.from({ length: 35 }, (_, i) => i + 1),
  2: Array.from({ length: 25 }, (_, i) => i + 36),
  3: Array.from({ length: 20 }, (_, i) => i + 61),
  4: Array.from({ length: 15 }, (_, i) => i + 81),
  5: Array.from({ length: 10 }, (_, i) => i + 96),
  6: Array.from({ length: 15 }, (_, i) => i + 106),
};

export const getCategories = (t: TFunction): Category[] => {
  return [1, 2, 3, 4, 5, 6].map(categoryId => ({
    id: categoryId,
    title: t(`categories.${categoryId}.title`),
    explanation: t(`categories.${categoryId}.explanation`),
    questions: questionIdsByCategoryId[categoryId].map(questionId => ({
      id: questionId,
      text: t(`questions.${questionId}`),
    })),
  }));
};
