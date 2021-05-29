const axios = require("axios");

const getHome = (req, res, next) => {
  res.render("index", { title: "Express" });
};

const getBranches = async (req, res, next) => {
  const { owner, repo } = req.query;
  const url = `https://api.github.com/repos/${owner}/${repo}/branches`;
  try {
    const response = await axios.get(url);
    const branches = response.data.map(branch => branch.name);
    res.status(201).json({ branches });
  } catch (error) {
    res.status(404).send();
    console.log("the github project do not exist");
  }
};

const getCommits = async (req, res, next) => {
  const { owner, repo, branch } = req.query;
  const url = `https://api.github.com/repos/${owner}/${repo}/commits?sha=${branch}`;
  try {
    const response = await axios.get(url);
    const commits = response.data.map(item => ({
      shaId: item.sha.substring(0, 7),
      url: item.html_url,
      daysAgo: Math.round(
        (new Date().getTime() -
          new Date(item.commit.committer.date).getTime()) /
          (1000 * 60 * 60 * 24)
      ),
      commitMessage: item.commit.message,
      author: item.commit.author.name,
    }));
    res.status(201).json({ commits });
  } catch (error) {
    res.status(404).send();
    console.log("Error fetching commits from this branch in this project");
  }
};

module.exports = {
  getHome,
  getBranches,
  getCommits,
};
