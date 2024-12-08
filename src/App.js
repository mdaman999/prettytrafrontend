import './App.css';
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function App() {

  const showToastMessage = (msg) => {
    toast.info(msg, {
      position: process.env.REACT_APP_NOTIFICATION_POSITION,
      autoClose: 20000
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var p1 = e.target.correctTRA.value;
    var p2 = e.target.wrongTRA.value;

    if (p1.includes(".txt") && p2.includes(".txt")) {
      var paths = { p1, p2 };
      try {
        const myAxios = axios.create({baseURL : process.env.REACT_APP_BASEURL});
        myAxios.post("/align", paths).then((resp) => {
          console.log("Reply from back-end : ", resp.data);
          showToastMessage(resp.data);
        });
        console.log("Data send to back-end successfully : ", paths);
      } catch (exp) {
        console.log("Error in sending data to backend :", exp);
        showToastMessage("Error in sending data to backend : ", exp);
      }
    }else{
      showToastMessage("Please enter correct file name with .txt");
    }
  };

  return (
    <>
      <ToastContainer style={{ width: 700 }} />
      <div className="App">
        <form onSubmit={(event) => handleSubmit(event)} method="post">
          <div className="mb-3">
            <label htmlFor="correctTRA" className="form-label">
              Correct TRA local path with file name.txt
            </label>
            <input
              type="text"
              className="form-control"
              id="correctTRA"
              name="correctTRA"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="wrongTRA" className="form-label">
              Wrong TRA local path with file name.txt
            </label>
            <input
              type="text"
              className="form-control"
              id="wrongTRA"
              name="wrongTRA"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Align TRA
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
