<template>
  <div class="quiz container">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3>Add question</h3>
      </div>
      <div class="panel-body">
        <form id="form2" class="form2" v-on:submit.prevent="addQuiz">
          <div class="form-group">
            <input type="text" id="quizQuestion" class="form-control" v-model="newQuiz.question" placeholder="Question">
          </div>
          <div class="form-group">

            <div class="wrap-answer">
              <textarea type="text" rows="3" class="form-control" v-model="newQuiz.newAnswerText" placeholder="Answers">
              </textarea>
            </div>

            <div @click="addAnswer" class="btn btn-default  btn-answers">
              Add answer
            </div>
            <ol>
              <li v-for="(answer, index) in newQuiz.answers" :key="answer" :title="answer">
                {{answer}}
              </li>
            </ol>
          </div>
          <div class="form-group">
            <input type="number" id="rightAnswer" class="form-control" v-model="newQuiz.rightAnswer"
                   placeholder="Right answer">
          </div>
          <br>
          <br>
          <input type="submit" class="btn btn-primary" value="Add quiz">
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import { db } from '../firebase'

  let quizRef = db.ref('quiz')

  export default {
    name: 'quiz',
    firebase: {
      quiz: quizRef
    },
    data () {
      return {
        msg: 'This is quiz admin',
        newQuiz: {
          question: '',
          newAnswerText: '',
          answers: [],
          rightAnswer: ''
        }
      }
    },
    methods: {
      addQuiz () {
        quizRef.push(this.newQuiz)
        this.newQuiz.question = ''
        this.newQuiz.newAnswerText = ''
        this.newQuiz.answers = []
        this.newQuiz.rightAnswer = ''
      },
      addAnswer () {
        this.newQuiz.answers.push(this.newQuiz.newAnswerText)
        this.newQuiz.newAnswerText = ''
      }
    }

  }
</script>
