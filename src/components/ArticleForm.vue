<template>
  <div class='editor-page'>
    <div class='container page'>
      <div class='row'>
        <div class='col-md-10 offset-md-1 col-xs-12'>
          <mcv-validation-errors v-if='errors' :validation-errors='errors' />

          <form @submit.prevent='onSubmit'>
            <fieldset>

              <fieldset class='form-group'>
                <input
                  v-model='title'
                  name='title'
                  class='form-control form-control-lg'
                  type='text'
                  placeholder='Article Title'
                >
              </fieldset>

              <fieldset class='form-group'>
                <input
                  v-model='description'
                  name='description'
                  class='form-control'
                  type='text'
                  placeholder="What's this article about?"
                >
              </fieldset>

              <fieldset class='form-group'>
            <textarea
              v-model='body'
              name='body'
              class='form-control'
              rows='8'
              placeholder='Write your article (in markdown)'
            ></textarea>
              </fieldset>

              <fieldset class='form-group'>
                <input
                  v-model='tagList'
                  name='tagList'
                  class='form-control'
                  type='text'
                  placeholder='Enter tags'
                >
              </fieldset>

              <button
                :disabled='isSubmitting'
                class='btn btn-lg pull-xs-right btn-primary'
                type='submit'
              >
                Publish Article
              </button>

            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import McvValidationErrors from '@/components/ValidationErrors'

export default {
  name: 'McvArticleForm',
  components: {
    McvValidationErrors
  },
  props: {
    initialValues: {
      required: true,
      type: Object
    },
    errors: {
      required: false,
      type: Object
    },
    isSubmitting: {
      required: true,
      type: Boolean
    }
  },
  data() {
    return {
      title: this.initialValues.title,
      description: this.initialValues.description,
      body: this.initialValues.body,
      tagList: this.initialValues.tagList.join(' '),
    }
  },
  methods: {
    onSubmit() {
      const form = {
        title: this.title,
        description: this.description,
        body: this.body,
        tagList: this.tagList.split(' ')
      }
      this.$emit('articleSubmit', form)
    }
  }
}
</script>
