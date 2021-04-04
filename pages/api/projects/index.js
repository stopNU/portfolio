import fs from 'fs'
import path from 'path'

export default (req, res) => {
  const dirRelativeToPublicFolder = 'content/projects'

  const dir = path.resolve('./', dirRelativeToPublicFolder);

  const filenames = fs.readdirSync(dir);

  const projects = filenames.map(name => {
    return {
      slug: name.replace('.json','')
    }
  })
  const final = {
    "projects": projects
  }

  res.statusCode = 200
  res.json(final);
}