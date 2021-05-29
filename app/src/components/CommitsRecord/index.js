import { useState, useEffect } from "react";

import axios from "axios";

import DropDownList from "../DropDownList";
import Commit from "../Commit";

import { Container, Record, RepoUrlContainer } from "./Commits.styles";

const CommitsRecord = () => {
  const defaultBranch = "Branches";

  const [inputText, setInputText] = useState("");
  const [repo, setRepo] = useState("");
  const [selectedBranch, setSelectedBranch] = useState(defaultBranch);
  const [repoParams, setRepoParams] = useState({ owner: "", repo: "" });
  const [branches, setBranches] = useState(null);
  const [commits, setCommits] = useState([]);
  const [error, setError] = useState(false);

  const getParamsFromUrl = url => {
    //The regex match any string that begins with "https://github.com/"followed
    //by (formatedString)/(anotherFormatedString) and that end with / or empty
    let urlRegex = new RegExp(
      "^https://github.com/[a-zA-Z0-9._-]+/[a-zA-Z0-9._-]+/?$"
    );
    if (urlRegex.test(url)) {
      //The regex match any substring that ends by a composed
      //string: (formatedString)/(anotherFormatedString) and that end with / or empty
      let paramsRegex = new RegExp("[a-zA-Z0-9._-]+/[a-zA-Z0-9._-]+/?$");
      let splittedUrl = paramsRegex.exec(url)[0].split("/");
      return { owner: splittedUrl[0], repo: splittedUrl[1] };
    }
  };

  const checkUrl = () => {
    const urlParams = getParamsFromUrl(inputText);
    if (urlParams) {
      setError(false);
      setRepoParams(urlParams);
      setSelectedBranch(defaultBranch);
      setRepo(inputText);
    } else {
      setError(true);
    }
  };

  const fetchData = (url, parameters) => {
    return axios
      .get(url, {
        params: parameters,
      })
      .then(response => response.data)
      .catch(err => null);
  };

  useEffect(() => {
    if (selectedBranch !== defaultBranch) {
      fetchData("commits", { ...repoParams, branch: selectedBranch }).then(
        response => {
          if (response) {
            setCommits(response.commits);
          }
        }
      );
    }
  }, [selectedBranch]);

  useEffect(() => {
    if (repo.length !== 0) {
      fetchData("branches", repoParams).then(response => {
        if (response) {
          setBranches(response.branches);
        } else {
          setError(true);
          setBranches(null);
        }
      });
    }
  }, [repo]);

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
                value={inputText}
                onChange={e => setInputText(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() =>
                  setInputText(
                    "https://github.com/OsirisRoman/Commits-record-mono-repo"
                  )
                }>
                Set Default/Test Repo
              </button>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={checkUrl}>
                Get Commits
              </button>
            </RepoUrlContainer>
            {error ? (
              <h4>Github repository not found</h4>
            ) : branches === null ? null : branches.length !== 0 ? (
              <DropDownList
                defaultText={selectedBranch}
                setSelectedBranch={setSelectedBranch}
                options={branches}
              />
            ) : (
              <h4>Github project is empty</h4>
            )}
          </div>
          {selectedBranch !== defaultBranch ? (
            <Record className="card-body text-start">
              <div className="list-group">
                {commits.map(commit => (
                  <Commit key={commit.shaId} commit={commit} />
                ))}
              </div>
            </Record>
          ) : null}
        </div>
      </div>
    </Container>
  );
};

export default CommitsRecord;
