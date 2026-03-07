import "../styles/home.scss";
import { FiUploadCloud } from "react-icons/fi";

const Home = () => {
  return (
    <>
      <header className="page-header">
        <h1>
          Create Your Custom <span className="highlight">Interview Plan</span>
        </h1>
      </header>

      <main className="home">
        <div className="interview-input-group">
          <div className="left">
            <label htmlFor="jobDescription">Job Description</label>
            <textarea
              name="jobDescription"
              id="jobDescription"
              placeholder="Enter job description here..."
            ></textarea>
          </div>
          <div className="right">
            <div className="input-group">
              <p>
                Resume{" "}
                <small className="highlight">
                  (Use resume and self description together for best results)
                </small>
              </p>
              <label className="file-label" htmlFor="resume">
                <FiUploadCloud size={24} color="#e1034d" /> Click to upload
              </label>
              <input
                hidden
                type="file"
                name="resume"
                id="resume"
                accept=".pdf"
              />
            </div>

            <div className="input-group">
              <label htmlFor="selfDescription">Self Description</label>
              <textarea
                name="selfDescription"
                id="selfDescription"
                placeholder="Describe yourself here..."
              ></textarea>
            </div>
            <button className="button primary-button">
              Generate Interview Report
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
