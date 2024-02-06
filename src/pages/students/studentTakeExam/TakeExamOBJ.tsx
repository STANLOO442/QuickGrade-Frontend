import { Link, useParams, useNavigate } from "react-router-dom";
import SideBar from "../../../components/sidebar/sideBar";
import "./TakeExamOBJ.css";
import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../components/protectedRoutes/protectedRoute";
interface Question {
  questionText: string;
  questionType: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  questionId: string;
  scoreObtainable: string;
  sectionAlphabet: string;
}
interface ExamsDetail {
  examDuration: string;
  courseTitle: string;
  courseCode: string;
  examInstruction: string;
  semester: string;
  session: string;
  faculty: string;
  department: string;
  examDate: string;
  totalScore: string;
  totalNoOfQuestions: string;
  examId: string;
  firstSection: string;
  secondSection: string;
  thirdSection: string;
}

interface SelectedOption {
  questionId: string;
  questionText: string;
  typedAnswer?: string;
}

const TakeExamOBJ = () => {
  const { courseCode } = useParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [examsDetail, setExamDetails] = useState<ExamsDetail>();
  const { studentData } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(
        `http://localhost:3000/students/dashboard/take-exams/${courseCode}`,
        {
          withCredentials: true,
        }
      );

      // checking the response
      if (
        res.status === 200 &&
        (res.data.questionNotAvailable || res.data.internalServerError)
      ) {
        navigate("/students/signin");
        // window.location.reload();
      } else if (
        res.status === 200 &&
        res.data.questions &&
        res.data.examsDetail
      ) {
        setQuestions(res.data.questions);
        setExamDetails(res.data.examsDetail);
      }
    }
    fetchData();
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // State to store the selected options for each question
  const [selectedOptions, setSelectedOptions] = useState<SelectedOption[]>([]);

  // Function to handle radio button changes
  // const handleRadioChange = (questionId: string, selectedOption: string) => {
  //   const updatedOptions = [
  //     ...selectedOptions.filter((item) => item.questionId !== questionId),
  //     { questionId, selectedOption },
  //   ];
  //   setSelectedOptions(updatedOptions);
  // };

  // Function to handle text input changes for fill-in-the-blanks and theory questions
  const handleTextChange = (
    questionId: string,
    typedAnswer: string,
    questionText: string
  ) => {
    const updatedOptions = [
      ...selectedOptions.filter((item) => item.questionId !== questionId),
      { questionId, typedAnswer, questionText },
    ];
    setSelectedOptions(updatedOptions);
  };

  // Function to handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Assemble questions array`
    const assembledQuestions = questions.map((question) => {
      const selectedOption = selectedOptions.find(
        (item) => item.questionId === question.questionId
      );
      console.log("Selected Option:", selectedOption);
      return {
        questionId: question.questionId,
        questionType: question.questionType,
        questionText: selectedOption ? selectedOption.questionText : null,
        typedAnswer: selectedOption ? selectedOption.typedAnswer : null,
      };
    });

    console.log("Assembled Questions:", assembledQuestions);
    const courseCode = examsDetail?.courseCode;
    const studentId = studentData?.studentId;
    const examId = examsDetail?.examId;
    const sendStudentResponse = await axios.post(
      `http://localhost:3000/lecturers/grade-exam-objectives/${courseCode}`,
      {
        examId,
        studentId,
        courseCode,
        assembledQuestions,
      }
    );
    if (
      sendStudentResponse.status === 200 &&
      sendStudentResponse.data.objectivesAutoGradedSuccessfully
    ) {
      console.log("Student response sent successfully");
      navigate("/students/dashboard");
    } else if (
      sendStudentResponse.status === 200 &&
      sendStudentResponse.data.error
    ) {
      console.log("Student response not sent successfully");
    }

    // You can send assembledQuestions to the backend server here
  };
  return (
    <div className="examContainer">
      <section className="hero">
        <div className="hero-content">
          <img
            className="img"
            src="https://c.animaapp.com/IX1zE9E9/img/notification.svg"
            alt="Notification"
          />
          <div className="text-wrapper">Welcome, {studentData?.firstName}</div>
        </div>
      </section>

      <SideBar>
        {{
          sidebarElement: (
            <>
              <div className="feature-2">
                <img
                  className="img-feat"
                  src="https://c.animaapp.com/IX1zE9E9/img/vuesax-bulk-menu.svg"
                />
                <Link to="/students/dashboard" className="text-wrapper-6">
                  Dashboard
                </Link>
              </div>
              <div className="feature-2">
                <img
                  className="img-2"
                  src="https://c.animaapp.com/IX1zE9E9/img/vuesax-bulk-book-square.svg"
                />
                <Link
                  to="/students/dashboard/enrolled-courses"
                  className="text-wrapper-6"
                >
                  Enrolled Courses
                </Link>
              </div>
              <div className="feature-2">
                <img
                  className="img-2"
                  src="https://c.animaapp.com/IX1zE9E9/img/vuesax-bulk-sort.svg"
                />
                <Link
                  to="/students/dashboard/results"
                  className="text-wrapper-6"
                >
                  Results
                </Link>
              </div>
            </>
          ),
        }}
      </SideBar>
      <div className="takeExamTimer">
        <p className="tagBold">TAKE EXAM</p>

        <div className="timer-container">
          <div className="circle-box">
            <div className="timer-circle">
              <p>118</p>
            </div>
            <div className="dot">
              <p>:</p>
            </div>
            <div className="timer-circle">
              <p>32</p>
            </div>
          </div>
          <div className="minute-seconds">
            <p>Minutes</p>
            <p>Seconds</p>
          </div>
        </div>
      </div>

      {questions && (
        <div className="main-container">
          <form className="take-exam-container" onSubmit={handleSubmit}>
            <div className="div-for-first-form">
              <div className="first-form">
                <div>
                  <label htmlFor="session">Session</label>
                  <br />
                  <input
                    type="text"
                    value={examsDetail?.session}
                    className="input-form-1"
                  />
                </div>

                <div>
                  <label htmlFor="Semester">Semester</label>
                  <br />
                  <input
                    type="text"
                    value={examsDetail?.semester}
                    className="input-form-1"
                  />
                </div>

                <div>
                  <label htmlFor="Faculty">Faculty</label>
                  <br />
                  <input
                    type="text"
                    value={examsDetail?.faculty}
                    className="input-form-1"
                  />
                </div>

                <div>
                  <label htmlFor="Department">Department</label>
                  <br />
                  <input
                    type="text"
                    value={examsDetail?.department}
                    className="input-form-1"
                  />
                </div>

                <div>
                  <label htmlFor="Course Code">Course Code</label>
                  <br />
                  <input
                    type="text"
                    value={examsDetail?.courseCode}
                    className="input-form-1"
                  />
                </div>

                <div>
                  <label htmlFor="Course Title">Course Title</label>
                  <br />
                  <input
                    type="text"
                    value={examsDetail?.courseTitle}
                    className="input-form-1"
                  />
                </div>

                <div>
                  <label htmlFor="Total Score">Total Score</label>
                  <br />
                  <input
                    type="text"
                    value={examsDetail?.totalScore}
                    className="input-form-1"
                  />
                </div>

                <div>
                  <label htmlFor="Time allowed">Time Allowed</label>
                  <br />
                  <input
                    type="text"
                    value={examsDetail?.examDuration}
                    className="input-form-1"
                  />
                </div>
              </div>

              <div className="lower-part-of-first-form">
                <p>Instructions</p>
                <p className="second-p">{examsDetail?.examInstruction}</p>
              </div>
            </div>
            <div className="div-student-id-section">
              <p>
                ID: <span>{examsDetail?.examId}</span>
              </p>
              <div className="sub-div">
                <p>Total score</p>
                <div className="green-circle">{examsDetail?.totalScore}</div>
              </div>
            </div>

            <div className="all-sections-wrapper">
              <>
                <p id="section-p">
                  Section
                  {examsDetail?.firstSection.split("|")[0]}
                  {/* Section{" "}
                  {questions
                    .filter((question) => {
                      return question.questionType === "Objective";
                    })[0]
                    .sectionAlphabet?.toString()} */}
                </p>
              </>

              <p id="section-p2">
                {/* {questions
                  .filter((question) => {
                    return question.questionType === "Objective";
                  })[0]
                  .sectionAlphabet?.toString()}{" "} */}
                {examsDetail?.firstSection.split("|")[1]}
                Marks
              </p>
              {/* <div className="section-score">
                <p>Section score</p>
                <div className="brown-circle"></div>
              </div> */}

              {/* objectives questions */}
              {questions
                .filter((question) => {
                  return (
                    question.questionType === "Objective"
                    // examsDetail?.firstSection.split("|")[2]
                  );
                })
                .map((question, index) => (
                  <>
                    <div className="second-form" key={index}>
                      <span>{index + 1}</span>
                      <p>{question.questionText}</p>
                      <label htmlFor="option1">
                        A. <span>{question.optionA}</span>
                        <input
                          type="radio"
                          name={question.questionId}
                          id="option1"
                          className="option"
                          onChange={() =>
                            handleTextChange(
                              question.questionId,
                              question.optionA,
                              question.questionText
                            )
                          }
                          // onChange={() =>
                          //   handleRadioChange(
                          //     question.questionId,
                          //     question.optionA
                          //   )
                          // }
                        />
                      </label>

                      <label htmlFor="option1">
                        B. <span>{question.optionB}</span>
                        <input
                          type="radio"
                          name={question.questionId}
                          id="option1"
                          className="option"
                          onChange={() =>
                            handleTextChange(
                              question.questionId,
                              question.optionB,
                              question.questionText
                            )
                          }
                          // onChange={() =>
                          //   handleRadioChange(
                          //     question.questionId,
                          //     question.optionB
                          //   )
                          // }
                        />
                      </label>

                      <label htmlFor="option1">
                        C. <span>{question.optionC}</span>
                        <input
                          type="radio"
                          name={question.questionId}
                          id="option1"
                          className="option"
                          onChange={() =>
                            handleTextChange(
                              question.questionId,
                              question.optionC,
                              question.questionText
                            )
                          }
                          // onChange={() =>
                          //   handleRadioChange(
                          //     question.questionId,
                          //     question.optionC
                          //   )
                          // }
                        />
                      </label>

                      <label htmlFor="option1">
                        D. <span>{question.optionD}</span>
                        <input
                          type="radio"
                          name={question.questionId}
                          id="option1"
                          className="option"
                          onChange={() =>
                            handleTextChange(
                              question.questionId,
                              question.optionD,
                              question.questionText
                            )
                          }
                          // onChange={() =>
                          //   handleRadioChange(
                          //     question.questionId,
                          //     question.optionD
                          //   )
                          // }
                        />
                      </label>
                    </div>
                  </>
                ))}
              {/* fill in the blanks questions */}
              <div className="fill-in-the-blanks-wrapper">
                <>
                  <p id="section-p">
                    Section
                    {examsDetail?.secondSection.split("|")[0]}
                    {/* Section{" "}
                  {questions
                    .filter((question) => {
                      return question.questionType === "Objective";
                    })[0]
                    .sectionAlphabet?.toString()} */}
                  </p>
                </>

                <p id="section-p2">
                  {/* {questions
                  .filter((question) => {
                    return question.questionType === "Objective";
                  })[0]
                  .sectionAlphabet?.toString()}{" "} */}
                  {examsDetail?.secondSection.split("|")[1]}
                  Marks
                </p>
                {questions
                  .filter((question) => {
                    return question.questionType === "fill-in-the-blank";
                  })
                  .map((question, index) => (
                    <>
                      <div className="second-form" key={index}>
                        <span>
                          {questions.filter((question) => {
                            return question.questionType === "Objective";
                          }).length +
                            index +
                            1}
                        </span>
                        <p>{question.questionText}</p>

                        <label htmlFor="your Answer">
                          <input
                            type="text"
                            name={question.questionId}
                            placeholder="Your Answer"
                            className="option"
                            value={
                              selectedOptions.find(
                                (option) =>
                                  option.questionId === question.questionId
                              )?.typedAnswer || ""
                            }
                            onChange={(e) =>
                              handleTextChange(
                                question.questionId,
                                e.target.value,
                                question.questionText
                              )
                            }
                          />
                        </label>
                      </div>
                    </>
                  ))}
              </div>
              {/* theory */}
              <div className="theory-question-wrapper">
                <>
                  <p id="section-p">
                    Section
                    {examsDetail?.thirdSection.split("|")[0]}
                    {/* Section{" "}
                  {questions
                    .filter((question) => {
                      return question.questionType === "Objective";
                    })[0]
                    .sectionAlphabet?.toString()} */}
                  </p>
                </>

                <p id="section-p2">
                  {/* {questions
                  .filter((question) => {
                    return question.questionType === "Objective";
                  })[0]
                  .sectionAlphabet?.toString()}{" "} */}
                  {examsDetail?.thirdSection.split("|")[1]}
                  Marks
                </p>
                {questions
                  .filter((question) => {
                    return question.questionType === "Theory";
                  })
                  .map((question, index) => (
                    <>
                      <div className="second-form" key={index}>
                        <span>
                          {questions.filter((question) => {
                            return question.questionType === "Objective";
                          }).length +
                            questions.filter((question) => {
                              return (
                                question.questionType === "fill-in-the-blank"
                              );
                            }).length +
                            index +
                            1}
                        </span>
                        <p>{question.questionText}</p>

                        <label htmlFor="your Answer">
                          <input
                            type="text"
                            name={question.questionId}
                            id="option1"
                            placeholder="Your Answer"
                            value={
                              selectedOptions.find(
                                (option) =>
                                  option.questionId === question.questionId
                              )?.typedAnswer || ""
                            }
                            onChange={(e) =>
                              handleTextChange(
                                question.questionId,
                                e.target.value,
                                question.questionText
                              )
                            }
                            className="option"
                          />
                        </label>
                      </div>
                    </>
                  ))}
              </div>
            </div>
            <button id="submit-btn" type="submit">
              Submit
            </button>
            <div className="anchor-div">
              <a href="./take-exam-obj" id="first-anchor">
                &larr; Previous Section
              </a>
              <button id="button1" type="button">
                1
              </button>
              <button type="button">2</button>
              <button type="button">3</button>
              <button type="button">4</button>
              <button type="button">5</button>
              <button type="button">6</button>
              <a href="./take-exam-theory" id="second-anchor">
                Next Section &rarr;
              </a>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default TakeExamOBJ;