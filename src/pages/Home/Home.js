import { useEffect, useContext, useRef } from "react"
import { IsLoadingContext } from "../../Contexts/IsLoadingContextProvider";
import { ScreenWidthContext } from "../../Contexts/ScreenWidthContextProvider";
import { useSyntheticMediaQuery } from "../../hooks/useSyntheticMediaQuery";


import { CoverImage } from "../../components/HomeBlocks/1-CoverImage/CoverImage";
import { CollectionsTitle } from "../../components/HomeBlocks/2-CollectionsTitle/CollectionsTitle"
import { Collection1 } from "../../components/HomeBlocks/3-Collection1/Collection1"
import { Collection1Title } from "../../components/HomeBlocks/4-Collection1Title/Collection1Title"
import { Collection2 } from "../../components/HomeBlocks/5-Collection2/Collection2"
import { Collection2Title } from "../../components/HomeBlocks/6-Collection2Title/Collection2Title"
import { Collection3 } from "../../components/HomeBlocks/7-Collection3/Collection3"
import { Collection3Title } from "../../components/HomeBlocks/8-Collection3Title/Collection3Title"
import { WeParagraphTitle } from "../../components/HomeBlocks/9-WeParagraphTitle/WeParagraphTitle"
import { WeParagraph1 } from "../../components/HomeBlocks/10-WeParagraph1/WeParagraph1"
import { WeParagraph2 } from "../../components/HomeBlocks/11-WeParagraph2/WeParagraph2"
import { OurCommunityTitle } from "../../components/HomeBlocks/12-OurCommunityTitle/OurCommunityTitle"
import { OurCommunityImage } from "../../components/HomeBlocks/13-OurCommunityImage/OurCommunityImage"
import { FoundationImage } from "../../components/HomeBlocks/14-FoundationImage/FoundationImage"
import { FoundationParagraph1 } from "../../components/HomeBlocks/15-FoundationParagraph1/FoundationParagraph1"
import { FoundationParagraph2 } from "../../components/HomeBlocks/16-FoundationParagraph2/FoundationParagraph2"

import { Ellipsis } from 'react-spinners-css';
import "./Home.css"

export const Home = ()=>{

  const { isLoading, setIsLoading } = useContext(IsLoadingContext)  
  const { screenWidth } = useContext(ScreenWidthContext)
  const componentsLoaded = useRef([])  
    
  const { wasTriggeredMediaQuery } = useSyntheticMediaQuery()
  
  const currentAndPreviousWidthRef = useRef([])


  useEffect(()=>{

    if(currentAndPreviousWidthRef.current.length < 2){
      currentAndPreviousWidthRef.current.push(screenWidth)
    }
    else{
      currentAndPreviousWidthRef.current[0] = currentAndPreviousWidthRef.current[1]
      currentAndPreviousWidthRef.current[1] = screenWidth
    }       

    const currentWidth  = currentAndPreviousWidthRef.current[1]
    const lastWidth     = currentAndPreviousWidthRef.current[0]    



    //console.log("disparo media query", wasTriggeredMediaQuery(currentWidth, lastWidth))
    wasTriggeredMediaQuery(currentWidth, lastWidth) === true && setIsLoading(true)

    //wasTriggeredMediaQuery(screenWidth) && 
  },[screenWidth])    

  const onLoadHandler = (e)=>{    
    //setIsLoading(true) 
    const elementJustLoaded = e.target.classList[0]    
    
    const isVeryImportantComponent = (elementJustLoaded)=>{
      if(elementJustLoaded === "coleccionesImagenes"){
        return true
      } 
      else if(elementJustLoaded === "portadaMobile" ||  elementJustLoaded === "portada375" ||  elementJustLoaded === "portadaDesktop"){      
        if(componentsLoaded.current.some((element)=>element === "portadaMobile" ||  element === "portada375" ||  element === "portadaDesktop")){
          return false
        }
        else return true
      }  
      return false         		
    }

    isVeryImportantComponent(elementJustLoaded) && componentsLoaded.current.push(elementJustLoaded)
    
    componentsLoaded.current.length === 4 && setIsLoading(false)     
  }
    
  return(
    <>             
      <div className="homeContainer">
        <div className={isLoading === true ? "spinnerContainer" : "hidden"} >
          <Ellipsis animation="border" role="status" className="spinner" color="#5c5c5c" size={70}></Ellipsis> 
        </div>     

        <div className={isLoading === false ? "homeGrid" : "hidden"} onLoad={onLoadHandler} >
          <CoverImage />
          <CollectionsTitle  />
          <Collection1  /> 
          <Collection1Title  /> 
          <Collection2 /> 
          <Collection2Title /> 
          <Collection3 /> 
          <Collection3Title /> 
          <WeParagraphTitle /> 
          <WeParagraph1 /> 
          <WeParagraph2 /> 
          <OurCommunityTitle /> 
          <OurCommunityImage /> 
          <FoundationImage /> 
          <FoundationParagraph1 /> 
          <FoundationParagraph2 />            
        </div>        
      </div>             
    </>
  ) 
} 