<template>
<div class="container">
  <div class="panel panel-default">
    <div class="panel-heading">
      <h3>Add quiz questions</h3>
    </div>
    <div class="panel-body">
      <form id="form" class="form" v-on:submit.prevent="addQuestion">
        <div class="form-group">
          <textarea rows="4"  id="title" class="form-control" v-model="newQuestion.title" placeholder="Title">
          </textarea>
        </div>
        <div class="form-group">
          <textarea type="text" id="answers" class="form-control" v-model="newQuestion.answers" placeholder="answers">
          </textarea>
          <div class="btn">Add more</div>
        </div>
        <div class="form-group">
          <input type="text" id="right_answer" class="form-control" v-model="newQuestion.rightAnswer" placeholder="Right Answer">

        </div>
        <br>
        <br>
        <input type="submit" class="btn btn-primary" value="Add Book">
      </form>
    </div>
  </div>
</div>
</template>
<script>
  import {db} from '../firebase'
  let jsQuizRef = db.ref('jsquiz')
  export default {
    name: 'js-quiz',
    firebase: {
      questions: jsQuizRef
    },
    data () {
      return {
        newQuestion: {
          title: '',
          answers: [],
          rightAnswer: null
        }
      }
    },
    methods: {
      addQuestion () {
        if (this.newQuestion.title.length) {
          jsQuizRef.push(this.newQuestion)
          this.newQuestion.title = ''
          this.newQuestion.answers = []
          this.newQuestion.rightAnswer = null
        }
      }
    }
  }
</script>
