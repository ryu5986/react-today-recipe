import Header from "./Hearder";
import '../../assets/css/layout.scss'
import { Routes, Route } from "react-router-dom";
import ResultRecipeList from "../dashboard/ResultRecipeList";
import SearchRecipe from "../dashboard/SearchRecipe";
import Footer from "./Footer";
import RecipeDetailInfo from "../dashboard/RecipeDetailInfo";

export default function layout(){

    return (
        <>
            <Header/>
            <main>
                <Routes>
                    <Route path="/" element={ <SearchRecipe/> } /> 
                    <Route path="/recipe/list" element={ <ResultRecipeList/> } />
                    <Route path="/recipe/datail" element={ <RecipeDetailInfo/> } />
                </Routes>
            </main>
            <Footer/>
        </>
    );

}