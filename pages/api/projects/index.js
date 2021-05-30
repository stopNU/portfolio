import fs from 'fs'
import path from 'path'

export default async (req, res) => {
  const dirRelativeToPublicFolder = 'content/projects'

  const dir = path.resolve('./', dirRelativeToPublicFolder);

  const filenames = fs.readdirSync(dir);
    
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

  async function getResults() {
    const files = await getProjectsData(filenames);
    const final = files

    res.statusCode = 200
    res.json(final);
  }

  getResults();
  
}