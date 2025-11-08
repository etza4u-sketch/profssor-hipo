import { Category, Answers, ScoreDetails } from '../types';
import { TFunction } from '../i18n/translations';

export const getCategoryScoreDetails = (category: Category, answers: Answers, t: TFunction): ScoreDetails => {
    const questions = category.questions;
    const maxScore = questions.length * 4;
    const currentScore = questions.reduce((sum, q) => sum + (answers[q.id] || 0), 0);
    const percentage = maxScore > 0 ? Math.round((currentScore / maxScore) * 100) : 0;

    let severity: 'normal' | 'medium' | 'severe' | 'critical';
    let colorClasses: { bg: string; border: string; text: string; ring: string; };
    let label: string;

    if (percentage <= 25) {
        severity = 'normal';
        label = t('severity.normal');
        colorClasses = { bg: 'bg-green-100', border: 'border-green-500', text: 'text-green-800', ring: 'focus:ring-green-500' };
    } else if (percentage <= 50) {
        severity = 'medium';
        label = t('severity.medium');
        colorClasses = { bg: 'bg-yellow-100', border: 'border-yellow-500', text: 'text-yellow-800', ring: 'focus:ring-yellow-500' };
    } else if (percentage <= 75) {
        severity = 'severe';
        label = t('severity.severe');
        colorClasses = { bg: 'bg-orange-100', border: 'border-orange-500', text: 'text-orange-800', ring: 'focus:ring-orange-500' };
    } else {
        severity = 'critical';
        label = t('severity.critical');
        colorClasses = { bg: 'bg-red-100', border: 'border-red-500', text: 'text-red-800', ring: 'focus:ring-red-500' };
    }

    return { percentage, severity, colorClasses, label };
};