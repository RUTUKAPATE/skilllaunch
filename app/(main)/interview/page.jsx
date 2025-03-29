import { getAssessments } from '@/actions/interview'
import React from 'react'
import StatsCards from './_components/stats-card';
import PerformanceChart from './_components/performance-chart';
import QuizList from './_components/quiz-list';

const InterviewPage = async () => {

  const assessments = await getAssessments();
  return (
    <div>
      <div>
        <h1 className='text-6xl bg-gradient-to-b from-gray-400 via-gray-200 to-gray-600 font-extrabold tracking-tighter text-transparent bg-clip-text pb-2 pr-2 mb-5'>Interview Preparation</h1>

        <div className='space-y-6'>
          <StatsCards assessments={assessments} />
          <PerformanceChart assessments={assessments} />
          <QuizList assessments={assessments} />
        </div>
      </div>
    </div>
  )
}

export default InterviewPage