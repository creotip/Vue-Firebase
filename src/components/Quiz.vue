<template>
  <div class="quiz container">
    <div class="page-header">
      <h1 style="text-align: center">This is quiz page</h1>
    </div>
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

    <div v-for="(item, index) in quiz" class="single-quiz-item panel panel-default">
      <div class="panel-heading">
        <h5>
          <span>{{ index + 1 }}. </span>
          {{ item.question }}
          <span class="remove-quiz-item glyphicon glyphicon-trash pull-right" v-on:click="removeQuiz(item)"></span>
        </h5>


      </div>
      <div class="panel-body">
        <ol>
          <li v-for="(answer, index) in item.answers">
            {{ answer }}
          </li>
        </ol>
        <ul>
          <li>
            Right answer <span class="badge">{{item.rightAnswer}}</span>
          </li>
        </ul>
      </div>
      <div v-show="confirm" class="confirm-remove modal fade in" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                aria-hidden="true">&times;</span></button>
              <h4 class="modal-title">Are you sure you want to remove this item ?</h4>
            </div>
            <div class="modal-footer">
              <button @click="closeModal" type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              <button @click="confirmRemove(item)" type="button" class="btn btn-primary">Yes i want</button>
            </div>
          </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
      </div><!-- /.modal -->
    </div>

  </div>
</template>

<script>
  import Firebase from 'firebase'
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
        confirm: false,
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
        let quizValidation = this.newQuiz.question.length && this.newQuiz.answers.length && this.newQuiz.rightAnswer
        if (quizValidation) {
          quizRef.push(this.newQuiz)
          this.newQuiz.question = ''
          this.newQuiz.newAnswerText = ''
          this.newQuiz.answers = []
          this.newQuiz.rightAnswer = ''
        } else {
          console.log('Please fill out the form!')
        }
      },
      addAnswer () {
        if (this.newQuiz.newAnswerText.length) {
          this.newQuiz.answers.push(this.newQuiz.newAnswerText)
          this.newQuiz.newAnswerText = ''
        }
      },
      removeQuiz (item) {
        this.confirm = true
        // quizRef.child(item['.key']).remove()
      },
      confirmRemove (item) {
        quizRef.child(item['.key']).remove()
        this.confirm = false
      },
      closeModal () {
        this.confirm = false
      }
    },
    mounted () {
      Firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          console.log('User is logged in')
        } else {
          console.log('User is not logged in')
        }
      })
    }
  }
</script>
<style>
  .remove-quiz-item {
    cursor: pointer;
  }

  .confirm-remove {
    display: block;
  }
</style>
