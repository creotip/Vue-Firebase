<template>
  <div class="quiz container">
    <div class="page-header">
      <h1 style="text-align: center">
        Quiz App
      </h1>
    </div>
    <div class="wrap-quiz">
      <div v-for="(question, index) in questions" v-if="quizIndex === index"
           class="question-container panel panel-default">
        <div class="panel-heading">
          <h5>{{question.title}} ... {{index}}</h5>
        </div>

        <div class="answers list-group">
          <ul class="list-group">
            <li class="list-group-item"  v-for="(answer, index) in question.answers" @click="clickedAnswer(index); toggleClass();" :key="index">
              <span :class="{active: activeItem}" @click="toggleClass(answer)">
                {{index}}. {{answer}}
              </span>
            </li>
          </ul>
        </div>
        <div @click="prev" class="btn btn-default" v-if="quizIndex > 0">
          Prev
        </div>
        <div @click="next" class="btn btn-default">
          Next
        </div>
      </div>
      <div v-if="quizLength <= quizIndex" class="panel panel-default">
        <div class="panel-body">
          <div>
            Total score: {{ computeScore() }} / {{ quizLength }}
          </div>
          <button @click="restart" class="btn btn-default">
            Restart quiz
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  const questions = [
    {
      title: 'first questions',
      answers: [
        'right answer',
        'answer two',
        'answer three',
        'answer four'
      ],
      rightAnswer: 0
    },
    {
      title: 'second questions',
      answers: [
        'answer one',
        'answer two',
        'right answer',
        'answer four'
      ],
      rightAnswer: 2
    },
    {
      title: 'third questions',
      answers: [
        'answer one',
        'right answer',
        'answer three',
        'answer four'
      ],
      rightAnswer: 1
    }
  ]
  export default {
    name: 'quizApp',
    data () {
      return {
        quizIndex: 0,
        quizLength: questions.length,
        activeItem: false,
        questions,
        checkedAnswers: Array(questions.length).fill('')
      }
    },
    computed: {},
    methods: {
      next: function (e) {
        this.quizIndex++
      },
      prev: function (e) {
        this.quizIndex--
      },
      clickedAnswer: function (index) {
//        this.activeItem = false
        this.checkedAnswers.splice(this.quizIndex, 1, index)
      },
      toggleClass: function (event) {
        this.activeItem = !this.activeItem
      },
      // Return "true" count in userResponses
      computeScore: function (e) {
        let rightAnswers = 0
        let quizObj = this.questions
        this.checkedAnswers.map(function (value, index) {
          if (value === quizObj[index].rightAnswer) {
            rightAnswers++
          }
        })
        return rightAnswers
      },
      restart: function () {
        this.score = 0
        this.quizIndex = 0
        this.checkedAnswers = Array(questions.length).fill('')
      }
    }
  }
</script>
<style>
  .answers li {
    cursor: pointer;
  }

  .answers li:hover {
    background: #f9f9f9;
  }
</style>
