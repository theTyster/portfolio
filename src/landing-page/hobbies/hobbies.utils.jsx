import react from "react";

const HobbyUtils = {

  hobby:
    function (
      id,           // 0
      category,     // "Self-hosting"
      par,          // "My data is very important to me..."
      examples      // [Nextcloud, Pleroma, ...]
    ){
      this.category = category;
      this.par = par;
      this.examples = examples;
    },

  DetailsTag:
    function ({
      summary,
      details
    }){
      return(
      <>
        <details>
          <summary>{summary}</summary>
           {details}
        </details>
      </>
    );},
}

export default HobbyUtils;
