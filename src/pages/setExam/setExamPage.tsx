import "./setExamStyle.css";
import addButton from "../../assets/add_button_logo copy.png";
import nextArrow from "../../assets/next_section_arrow copy.png";
import FormRowAndSelection from "./formRow";
import SideBar from "../../components/sidebar/sideBar";
import { Link } from "react-router-dom";

function SetExamPage() {
  let count = 1;
  const increaseCount = () => {
    return count++;
  };

  return (
    <>
    {/* Sidebar */}
    <div className="text-wrapper-2">Dashboard</div>
      <SideBar>
        {{
          sidebarElement: (
            <>
              <div className="feature-2">
                <img
                  className="img-feat"
                  src="https://c.animaapp.com/IX1zE9E9/img/vuesax-bulk-menu.svg"
                />
                <Link to="/" className="text-wrapper-6">
                  Dashboard
                </Link>
              </div>
              <div className="feature-2">
                <img
                  className="img-2"
                  src="https://c.animaapp.com/IX1zE9E9/img/vuesax-bulk-book-square.svg"
                />
                <Link to="/" className="text-wrapper-6">
                  Courses
                </Link>
              </div>
              <div className="feature-2">
                <img
                  className="img-2"
                  src="https://c.animaapp.com/IX1zE9E9/img/vuesax-bulk-sort.svg"
                />
                <Link to="/" className="text-wrapper-6">
                  Set Exams
                </Link>
              </div>
              <div className="feature-2">
                <img
                  className="img-2"
                  src="https://c.animaapp.com/IX1zE9E9/img/vuesax-bulk-sort.svg"
                />
                <Link to="/" className="text-wrapper-6">
                  Grade Exams
                </Link>
              </div>
              <div className="feature-2">
                <img className="img-2" src="./img/refresh-square-2.png" />
                <Link to="/" className="text-wrapper-6">
                  Results
                </Link>
              </div>
            </>
          ),
        }}
      </SideBar>
      {/* Main content */}
    <main className="set-exams-page-main-section">
      <div className="set-exams-page-main-section-title-container">
        <h1 className="set-exams-page-main-section-title">Set Exams</h1>
      </div>

      <div className="set-exams-page-all-forms">
        <div className="set-exams-page-top-form">
          <div className="set-exams-page-session-form-container">
            <form className="set-exams-page-session-form">
              <div className="set-exams-page-session-form-row">
                <div className="set-exams-page-form-label-and-inputs">
                  <label
                    className="set-exams-page-session-form-label"
                    htmlFor="sessionInput"
                  >
                    Session
                  </label>
                  <br />
                  <select
                    className="set-exams-page-session-form-input"
                    name="session"
                    id="sessionInput"
                  >
                    <option value="2022/2023">2022/2023</option>
                    <option value="2021/2022">2021/2022</option>
                    <option value="2020/2021">2020/2021</option>
                    <option value="2019/2020">2019/2020</option>
                    <option value="2018/2019">2018/2019</option>
                    <option value="2017/2018">2017/2018</option>
                  </select>
                </div>

                <div className="set-exams-page-form-label-and-inputs">
                  <label
                    className="set-exams-page-session-form-label"
                    htmlFor="semesterInput"
                  >
                    Semester
                  </label>
                  <br />
                  <select
                    className="set-exams-page-session-form-input"
                    name="semester"
                    id="semesterInput"
                  >
                    <option value="">Select</option>
                    <option value="first">First</option>
                    <option value="second">Second</option>
                    <option value="third">Third</option>
                  </select>
                </div>

                <div className="set-exams-page-form-label-and-inputs">
                  <label
                    className="set-exams-page-session-form-label"
                    htmlFor="facultyInput"
                  >
                    Faculty
                  </label>
                  <br />
                  <input
                    className="set-exams-page-session-form-input"
                    placeholder="Faculty of Social Science"
                    type="text"
                    id="faculty"
                    name="faculty"
                  />
                </div>

                <div className="set-exams-page-form-label-and-inputs">
                  <label
                    className="set-exams-page-session-form-label"
                    htmlFor="departmentInput"
                  >
                    Department
                  </label>
                  <br />
                  <input
                    className="set-exams-page-session-form-input"
                    placeholder="Department of Arts"
                    type="text"
                    id="departmentInput"
                    name="department"
                  />
                </div>
              </div>

              <div className="set-exams-page-session-form-row">
                <div className="set-exams-page-form-label-and-inputs">
                  <label
                    className="set-exams-page-session-form-label"
                    htmlFor="courseCodeInput"
                  >
                    Course Code
                  </label>
                  <br />
                  <select
                    className="set-exams-page-session-form-input"
                    name="courseCode"
                    id="courseCodeInput"
                  >
                    <option value="">Select</option>
                    <option value="CE 522">CE 522</option>
                    <option value="Chem 211">Chem 211</option>
                    <option value="Chem 404">Chem 404</option>
                  </select>
                </div>

                <div className="set-exams-page-form-label-and-inputs">
                  <label
                    className="set-exams-page-session-form-label"
                    htmlFor="courseTitleInput"
                  >
                    Course Title
                  </label>
                  <br />
                  <input
                    className="set-exams-page-session-form-input"
                    placeholder="Introduction to Land"
                    type="text"
                    id="courseTitleInput"
                    name="courseTitle"
                  />
                </div>

                <div className="set-exams-page-form-label-and-inputs">
                  <label
                    className="set-exams-page-session-form-label"
                    htmlFor="totalScoreInput"
                  >
                    Total Score
                  </label>
                  <br />
                  <input
                    className="set-exams-page-session-form-input"
                    placeholder="Type Obtainable Score"
                    type="number"
                    id="totalScoreInput"
                    name="totalScore"
                  />
                </div>

                <div className="set-exams-page-form-label-and-inputs">
                  <label
                    className="set-exams-page-session-form-label"
                    htmlFor="timeAllowedInput"
                  >
                    Time allowed
                  </label>
                  <br />
                  <input
                    className="set-exams-page-session-form-input"
                    placeholder="60 mins"
                    type="text"
                    id="timeAllowedInput"
                    name="timeAllowed"
                  />
                </div>
              </div>

              <div className="set-exams-page-session-form-instruction-row">
                <label
                  className="set-exams-page-session-form-label"
                  htmlFor="instructionsInput"
                >
                  Instructions
                </label>{" "}
                <br />
                <input
                  className="set-exams-page-session-form-instructions-input"
                  placeholder="Type Instructions"
                  type="text"
                  id="instructionsInput"
                  name="instructions"
                />
              </div>

              <div className="set-exam-page-session-form-button-container">
              <form className="set-exam-page-session-form-button-form" action="#" method="post">
                  <button className="set-exam-page-session-form-button" type="submit"> + </button>
              </form>
              </div>

            </form>
          </div>
        </div>

        <div className="set-exams-page-bottom-form">
          <div className="set-exams-page-add-section-button-container">
            <form
              className="set-exams-page-add-section-button-form"
              action="#"
              method="post"
            >
              <button className="set-exams-page-add-section-button">
                {" "}
                <img src={addButton} />
                <span className="set-exams-page-add-section-button-text">
                  {" "}
                  Add Section
                </span>
              </button>
            </form>
          </div>

          <div className="set-exams-page-questions-section-container">
            <div className="set-exams-page-questions-section-header-and-marks">
              <h1 className="set-exams-page-questions-section-title">
                Section A{" "}
                <span className="set-exams-page-questions-section-header-subtitle">
                  (Multiple Choice Question)
                </span>
              </h1>
              <hr />
              <p className="set-exams-page-questions-section-marks">40 Marks</p>
            </div>

            <div className="set-exams-page-questions-form-container">
              <div>
                <FormRowAndSelection count={count} />
              </div>
              
            </div>
          </div>
        </div>
      </div>

      <div className="set-exams-page-next-section-and-save-button-container">
        <a href="#" className="set-exams-page-next-section-link">
          <span className="set-exams-page-next-section-text">Next Section</span>
          <img src={nextArrow} className="set-exams-page-next-section-arrow" />
        </a>
        <form
          className="set-exams-page-save-button-form"
          action="#"
          method="post"
        >
          <button className="set-exams-page-save-button">Save</button>
        </form>
      </div>
    </main>
    </>
  );
}

export default SetExamPage;

//  <div className="hiddenfunction">{increaseCount()}</div>
// <div className="hiddenfunction">{increaseCount()}</div>
