//DEV Libraries
import ReactDOM from "react-dom/client";
import {useState} from "react";

//CSS
import "./css/front-page.scss";

//COMPONENTS
import Nav from "./assets/nav.jsx";
import Credit from "./assets/credit.jsx";
import FrontPage from "./front-page.jsx";
import Story from "./story.jsx";
const App = () => {

  const [storyState, setStory] = useState("firstPaint");

  return(
    <div id="content">
      <header>
        <Nav />
      </header>
      <main>
        <article>
          {
            (()=>{
              switch(storyState){
                case("firstPaint"):
                  return(
                    <FrontPage 
                  setStory={setStory}
                    />
                  )
                case("beginning"):
                  return(
                    <Story
                      setStory={setStory}
                    />
                  )
              }

              //Changing Goose
              switch(storyState){
                case("firstPaint"):
                  return(
                    <pre id="print_div">{`
                                  ___
                              ,-""   \`.
                            ,'  _   • )\`-._
                           /  ,' \`-._:.===-'
                          /  /
                         /  ;
             _.--.__    /   ;
(\`._    _.-""       "--'    |
(_  \`-""                     \\
 (\`-                          :
  (__   (__.                  ;
    \`-.   '-.__.      _.'    /
       \\      \`-.__,-'    _,'
        \`._    ,    /__,-'
           ""._\\__,'| |____
                | |  \`----.\`.
                | |        \\ \`.
                ; |___      \\-\`\`
                \\   --)
                 \`.\`.)

           Goose. (not a duck.)
                        `}
                    </pre>
                  )
                case("pizza"):
                  return(
                    <pre id="print_div">{`
                                  ___
                              ,-""   \`.
                            ,'  _   • )\`-._
                           /  ,' \`-._:.===-'
                          /  /              ^
                         /  ;              /c\
             _.--.__    /   ;             /o~.\
(\`._    _.-""       "--'    |           /~.0 ~\
(_  \`-""                     \\         (^^^^^^^)
 (\`-                         :          """"""" 
  (__   (__.                  ;
    \`-.   '-.__.      _.'    /
       \\      \`-.__,-'    _,'
        \`._    ,    /__,-'
           ""._\\__,'| |____
                | |  \`----.\`.
                | |        \\ \`.
                ; |___      \\-\`\`
                \\   --)
                 \`.\`.)      🍕

               Goose with Pizza.
      (neither goose nor pizza are ducks.)
                        `}
                    </pre>
                )
              }

            })()
          }
        <div className="hidden_ascii">
         <pre className="ascii_animal bonus_egg" id="frog">{`
       _   _
      (•)_(•)
   _ (   _   ) _
  / \\/'-----'\\/ \\
__\\ ( (     ) ) /__
)   /\\ \\___/ /\\   (
 )_/ /|\\   /|\\ \\_(
           `}

        </pre>
              <pre className="ascii_animal bonus_egg" id="dog">{`
     __
(___()•\`;
/,    /\`
\\\\\`--\\\\
                `}
        </pre>
              <pre className="ascii_animal bonus_egg" id="hog">{`
^..^_____  
(00)     \\9
  \\______/ 
   WW  WW
                `}
        </pre>
        <pre className="ascii_animal bonus_egg" id="eggnog">{`
 ____
|____|      
/___/_\\      
|   | |      
|nog| |      
|   | |      
|___|_|      
          `}
        </pre>
        </div>
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
