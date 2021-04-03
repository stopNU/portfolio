const BlogPostCreatorPlugin = {
    __type: 'content-creator',
    fields: [
      {
        label: 'Title',
        name: 'title',
        component: 'text',
        validation(title) {
          if (!title) return "Required."
        }
      },
      {
        label: 'Date',
        name: 'date',
        component: 'date',
        description: 'The default will be today.',
      },
      {
        label: 'Author',
        name: 'author_name',
        component: 'text',
        description: 'Who wrote this, yo?',
      },
    ],
    async onSubmit(form, cms) {
      const fileRelativePath = await this.filename(form)
      const frontmatter = await this.frontmatter(form)
      const markdownBody = await this.body(form)
  
      cms.api.github
        .commit(
          fileRelativePath,
          getCachedFormData(fileRelativePath).sha,
          toMarkdownString({
            fileRelativePath,
            frontmatter,
            markdownBody,
          }),
          'Update from TinaCMS'
        )
        .then(response => {
          setCachedFormData(fileRelativePath, {
            sha: response.content.sha,
          })
          if (this.afterCreate) {
            this.afterCreate(response)
          }
        })
        .catch(e => {
          return { [FORM_ERROR]: e }
        })
    }
  }

export default BlogPostCreatorPlugin