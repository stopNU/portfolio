import fs from 'fs'
import path from 'path'

export async function getAllProjectSlugs() {
    const dirRelativeToPublicFolder = 'content/projects'
    const dir = path.resolve('./', dirRelativeToPublicFolder);
    const fileNames = fs.readdirSync(dir)
    
    /*

    function getProjectsData(names) {
        return Promise.all(
          names.map(async (name) => {
            const data = await readData(name);
            return data;
          })
        );
      }
      
      
      async function readData(name) {
        const data = await fs.promises.readFile('./content/projects/' + name, "utf8");
        return JSON.parse(data);
      }
      
      async function getResults(names) {
        const files = await getProjectsData(names);
        return files
      }
      
      return getResults(fileNames);

      */
    

    return fileNames.map(fileName => {
      return {
        params: {
          slug: fileName.replace(/\.json$/, '')
        }
      }
    })
  }