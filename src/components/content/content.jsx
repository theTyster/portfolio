//DEV Libraries
import ReactDOM from "react-dom/client";
import {useState} from "react";

//COMPONENTS
import FrontPage from "./landing-page/landing-page.jsx";
import Beginning from "./duck-story/beginning.jsx";
const Content = () => {

  const [storyState, setStory] = useState("firstPaint");

  return(
    <div id="content">
      <main>
        <article>
          {
            (()=>{
              switch(storyState){
                case("firstPaint"):
                  return(<FrontPage setStory={setStory}/>)
                case("beginning"):
                  return(<Beginning setStory={setStory}/>)
                case("more to come"):
                  return(
                    <h1>Thats all for now, folks. Check back later.</h1>
                  )
              }
            })()
          }
        </article>
      </main>
    </div>
  )
}


// RENDERS
const component = ReactDOM.createRoot(document.getElementById("content"));
component.render(<Content />);
