import fs from 'fs'
import path from 'path'

export async function getAllProjectSlugs() {
    const dirRelativeToPublicFolder = 'content/projects'
    const dir = path.resolve('./', dirRelativeToPublicFolder);
    const fileNames = fs.readdirSync(dir)
  
    // Returns an array that looks like this:
    // [
    //   {
    //     params: {
    //       id: 'ssg-ssr'
    //     }
    //   },
    //   {
    //     params: {
    //       id: 'pre-rendering'
    //     }
    //   }
    // ]
    return fileNames.map(fileName => {
      return {
        params: {
          slug: fileName.replace(/\.json$/, '')
        }
      }
    })
  }