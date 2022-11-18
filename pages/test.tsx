import { Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { types, getSnapshot, cast } from "mobx-state-tree"
import { useStoreQuiz } from '../store/store'
import { Quiz } from '../interfaces/Quiz'

const test = () => {
  return (
    <div>
        <Button type='primary' >test ant desing</Button>
    </div>
  )
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://localhost:3000/api/quizs`)
  const quizs = await res.json()
  const quizStore = useStoreQuiz();
  quizStore.setQuizs(quizs)
  // console.log(getSnapshot(quizStore))
  // Pass data to the page via props
  return { props: { quizs } }
}

export default test