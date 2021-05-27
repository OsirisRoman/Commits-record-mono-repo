import { useState, useEffect } from "react";

import axios from "axios";

import DropDownList from "../DropDownList";
import Commit from "../Commit";

import { Container, Record, RepoUrlContainer } from "./Commits.styles";

const CommitsRecord = () => {
  const options = ["main", "develop"];
  const defaultText = "Branches";

  const commitList = [
    {
      shaId: "0e40e4a...",
      url: "https://github.com/OsirisRoman/chat-app-nodejs/commit/0e40e4a12d75a71c8c7c98ea6ffe14351c14e182",
      daysAgo: "3",
      commitMessage:
        "Adding The Project Description The project description and some notes in the landing page were added. The user session was modified to expire after 5 hours of being created.",
      author: "Osiris Román",
    },
    {
      shaId: "37c39ea...",
      url: "https://github.com/OsirisRoman/chat-app-nodejs/commit/37c39ea2300d8ba8a277ab2b7bc2d941421e9126",
      daysAgo: "4",
      commitMessage:
        "Removing .env example file from the main directory Updating the README file to show the project live demo url. Removing the constants file because it is not necessary anymore",
      author: "Osiris Román",
    },
    {
      shaId: "1704892...",
      url: "https://github.com/OsirisRoman/chat-app-nodejs/commit/17048924e1f3381991b09941bc422d8d057e4cd1",
      daysAgo: "5",
      commitMessage:
        "Environmental Variables Added and Readme Updated *The database connection was removed from its own file to the main app. *Environmental variables were implemented to avoid using hardcoded values. *The Readme file was updated to decribe this project in a better way. *Some minor designs(HTML/CSS) were enhanced",
      author: "Osiris Román",
    },
    {
      shaId: "b8f00ba...",
      url: "https://github.com/OsirisRoman/chat-app-nodejs/commit/b8f00ba354361c4e8d6ded79167fb6b0db7da59a",
      daysAgo: "6",
      commitMessage: "Updating dependencies",
      author: "Osiris Román",
    },
  ];

  const [value, setValue] = useState(defaultText);

  const handleChange = e => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (value !== defaultText) {
      try {
        axios.get(`/commits/${value}`);
      } catch (error) {
        console.log(error);
      }
    }
  }, [defaultText, value]);

  return (
    <Container className="row justify-content-center">
      <div className="col-sm-6">
        <div className="card text-center">
          <h1 className="card-header">Commits Record</h1>
          <div className="card-header">
            <RepoUrlContainer>
              <input
                className="w-100 text-center mb-2"
                type="text"
                placeholder="Your Github Repository Here"
              />
              <button type="button" className="btn btn-secondary btn-sm">
                Set Default/Test Repo
              </button>
              <button type="button" className="btn btn-primary btn-sm">
                Get Commits
              </button>
            </RepoUrlContainer>
            <DropDownList
              defaultText={value}
              handleChange={handleChange}
              options={options}
            />
          </div>
          <Record className="card-body text-start">
            <div className="list-group">
              {commitList.map((commit, index) => (
                <Commit key={index} commit={commit} />
              ))}
            </div>
          </Record>
        </div>
      </div>
    </Container>
  );
};

export default CommitsRecord;
