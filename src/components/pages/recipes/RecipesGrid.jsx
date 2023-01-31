import React from 'react'

function RecipesGrid (props) {
  return(
    <div className="align-items-center">
      {/* <div className="mt-4 text-center">
        <img
          src={props.data.image}
          alt={props.data.altText}
          className="Recipe-Img"
        />
      </div> */}
      <div className="mt-4 text-center">
        <h6>
          Name: Good Ol' PB&J
        </h6>
        {/* 
          Maybe have a tag list later on for recipes features such as gluten-free or vegan.
          Having tags in the background could allow for easier suggestion making and searches.
        */}
        {/* <h6>
          Tags:
          <ul>

          </ul>
        </h6> */}
        <h6>
          Ingridents:
          <ul>
            <li>2 pieces of Bread &#40;Any Vareity&#41;</li>
            <li>Jelly &#40;Any Vareity&#41;</li>
            <li>Peanut Butter &#40;Any Vareity&#41;</li>
          </ul>
        </h6>
        <h6>
          Tools Needed to Make:
          <ul>
            <li>Knife &#40;one of the butter variety is prefered&#41;</li>
          </ul>
        </h6>
        <h6>
          Recipe:
          <ol type="1">
            <li>Coat one side of one of the bread pieces in jelly</li>
            <li>Coat one side of the other of the bread pieces in peanut butter</li>
            <li>Optional: Remove breadcrust</li>
          </ol>
        </h6>
      </div>
    </div>
  )
}

export default RecipesGrid;