import { useState } from "react";
import QuestionsLayout from "./QuestionsLayout";
import PropTypes from "prop-types";

/* Creats a tab layout for questions.

`tabs`: an array of tab titles

`questionsPerTab`: an map whose key is the index of the tab title in `tabs` and
whose value is a list of question ids to display in that tab

*/
const QuestionsTabLayout = ({ tabs, questionsPerTab }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleActiveTabChange = (e) => {
    e.preventDefault();
    setActiveTab(e.target.tabIndex);
  };

  return (
    <div className="container dashboard-container">
      <div className="container-row tab-container">
        {tabs.map((tabTitle, index) => (
          <div
            key={index}
            className={`tab-button ${
              activeTab === index ? "tab-button-selected" : ""
            }`}
            tabIndex={index}
            onClick={handleActiveTabChange}
          >
            {tabTitle}
          </div>
        ))}
      </div>
      {tabs.map((tabTitle, index) => {
        if (activeTab === index) {
          return (
            <QuestionsLayout key={index} questionIds={questionsPerTab[index]} />
          );
        }
      })}
    </div>
  );
};

QuestionsTabLayout.propTypes = {
  tabs: PropTypes.array.isRequired,
  questionsPerTab: PropTypes.object.isRequired,
};

export default QuestionsTabLayout;
