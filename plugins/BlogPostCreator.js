const BlogPostCreatorPlugin = {
    __type: 'content-creator',
    name: 'Add new project',
    fields: [
      {
        label: 'Name/client',
        name: 'name',
        component: 'text',
        validation(title) {
          if (!title) return "Required."
        }
      },
      {
        label: 'Short description',
        name: 'short_description',
        component: 'textarea'
      },
      {
        label: 'Slug',
        name: 'slug',
        component: 'text',
        validation(title) {
          if (!title) return "Required."
        }
      },
      {
        label: 'Thumbnail',
        name: 'thumbnail',
        component: 'image',
        parse: media => `/static/${media.filename}`,
        uploadDir: () => '/static/',
        previewSrc: fullSrc => fullSrc.replace('', ''),
      },
      {
        name: 'finished_at',
        label: 'Finished At',
        component: 'date',
        dateFormat: 'MMMM DD YYYY',
        timeFormat: false,
      }
    ],
    onSubmit(form, cms) {
      /*const fileRelativePath = await this.filename(form)
      const frontmatter = await this.frontmatter(form)
      const markdownBody = await this.body(form)*/

        let jsonBody = {
            "name": form.name,
            "short_description": form.short_description,
            "slug": form.slug,
            "thumbnail": form.thumbnail
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