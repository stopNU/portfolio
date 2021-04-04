const BlogPostCreatorPlugin = {
    __type: 'content-creator',
    fields: [
      {
        label: 'Name',
        name: 'name',
        component: 'text',
        validation(title) {
          if (!title) return "Required."
        }
      },
      {
        label: 'Subtitle',
        name: 'subtitle',
        component: 'text'
      },
      {
        label: 'Slug',
        name: 'slug',
        component: 'text',
        validation(title) {
          if (!title) return "Required."
        }
      },
    ],
    onSubmit(form, cms) {
      /*const fileRelativePath = await this.filename(form)
      const frontmatter = await this.frontmatter(form)
      const markdownBody = await this.body(form)*/

        let jsonBody = {
            "title": form.name,
            "subtitle": form.subtitle
        }
  
      cms.api.github
        .commit(
            'content/projects/' + form.slug + '.json',
            'Tesx',
            JSON.stringify(jsonBody)
        )
        .then(response => {
          console.log("respons", response)
        })
        .catch(e => {
          return { e }
        })
    }
  }

export default BlogPostCreatorPlugin