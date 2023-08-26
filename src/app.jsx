//DEV Libraries
import ReactDOM from "react-dom/client";
import {useState} from "react";

//CSS
import "./css/front-page.scss";

//COMPONENTS
import Nav from "./assets/nav.jsx";
import Credit from "./assets/credit.jsx";
import FrontPage from "./front-page.jsx";
import Beginning from "./beginning.jsx";
import Pizza from "./pizza.jsx";
const App = () => {

  const [storyState, setStory] = useState("firstPaint");


  return(
    <div id="content">
      <header>
        <Nav />
        <h1 className="pageTitle">The Duck Story</h1>
      </header>
      <main>
        <article>
          {
            (()=>{
              switch(storyState){
                case("firstPaint"):
                  return(<FrontPage 
                  setStory={setStory}
                    />)
                case("beginning"):
                  return(<Beginning
                    setStory={setStory}
                    />)
                case("pizza"):
                  return(<Pizza
                    setStory={setStory}
                  />)
              }
            })()
          }
        </article>
      </main>
      <footer>
        <Credit />
      </footer>
    </div>
  )
}


// RENDERS
const app = ReactDOM.createRoot(document.getElementById("app"));
app.render(<App />);
