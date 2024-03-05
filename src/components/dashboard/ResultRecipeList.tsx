import _ from 'lodash'
import '../../assets/css/resultrecipelist.scss'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { Box, Chip, Container, Pagination, Skeleton, Stack, Typography } from "@mui/material";
import { getRecipeList } from "../../service";
import { useDispatch } from "react-redux";
import { dialogOpen } from "../../actions/dialogAction";
import { RecipeShortInfo } from "../../types";

export default function ResultRecipeList(){

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const state = {...location.state};   
    const keyword = state.keyword;

    const pageGuide = 5;
    const totalCount = parseInt(state.totalCount);
    const totalPage = Math.ceil( totalCount / 5);

    const [ renderDataArr, setRenderDataArr ] = useState<RecipeShortInfo[]>([]);
    const [ currentPage, setCurrentPage ] = useState<number>(1);
    const [ isShow, setIsShow ] = useState<boolean>(false);

    useEffect(() => {

        if(_.isEmpty(keyword)){
        
            navigate('/');
    
        }

        requestRecipeList(currentPage);
        
        return () => {
            setIsShow(false);
        };

    }, [navigate, currentPage])

    /**
     * 현재 페이지 변경
     * @param event 
     * @param page 
     */
    const handleChange = (event: ChangeEvent<unknown>, page: number) => {
        
        setCurrentPage(page);       

    }

    /**
     * 레시피 리스트 호출
     * @param page 
     */
    const requestRecipeList = async (page: number) => {

        try {
            
            const min = (page - 1) * pageGuide + 1;
            const max = min >= totalCount ? totalCount : page * pageGuide;

            const response = await getRecipeList(keyword, min, max);
            const data = response.COOKRCP01.row;

            setRenderDataArr(data);
            scrollToTop();  
            setIsShow(true);          

        } catch (error) {
            
            dispatch(dialogOpen(error.message));

        }

    }
   
    /**
     * 스크롤 상단으로 옮기기
     */
    const scrollToTop = () => {
        
        const stackTopElement = document.getElementById("stack_top");

        if(stackTopElement){

            stackTopElement.scrollIntoView(true);

        }         

    }

    /**
     * 레시피 리스트 렌더링
     * @returns 
     */
    const recipeListRendering = () => {

        const renderArr = [];

        for(let i = 0; i < renderDataArr.length; i++){

            const item = renderDataArr[i];

            renderArr.push(               
                <Box sx={{ display: 'flex', width: '100%'}} key={i}>
                    <Box className="result_box_image">
                        <img src={ item.ATT_FILE_NO_MAIN }/>
                    </Box>
                    <Box className="result_box_info">
                        <Box sx={{ width: '70%' }}>
                            <Link to="/recipe/datail" state={{ RCP_NM: item.RCP_NM }}>
                                <Typography variant="h4" fontWeight="bold" fontFamily="Roboto" color="textPrimary" gutterBottom className="detail_link">{item.RCP_NM}</Typography>
                            </Link>
                        </Box>
                        <Box sx={{ width: '100%' }}>
                            <Box>
                                <Chip label={ `요리종류: ${item.RCP_PAT2 }` } color="primary" className="chip_item"/> 
                                <Chip label={ `열량: ${ item.INFO_ENG }kcal`}  color="secondary" className="chip_item"/>
                            </Box>
                            <Box>
                                <Chip label={ `탄수화물: ${ item.INFO_CAR }g` } color='success' className="chip_item"/> 
                                <Chip label={ `단백질: ${ item.INFO_PRO }g` }  color='error' className="chip_item"/> 
                                <Chip label={ `지방: ${ item.INFO_FAT }g` } color='warning' className="chip_item"/> 
                                <Chip label={ `나트륨: ${ item.INFO_NA }mg` } color='primary' className="chip_item"/>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            );

        }

        return renderArr;

    }

    return (
        <Stack id="stack_top">
            <Container>
                { !isShow &&
                    <Box sx={{ display: 'flex', width: '100%', flexWrap: 'wrap'}}>
                        <Skeleton variant="rounded" width={900} height={200} className="result_box_skeleton" sx={{ bgcolor: 'rgb(190, 224, 240)'}}/>
                        <Skeleton variant="rounded" width={900} height={200} className="result_box_skeleton" sx={{ bgcolor: 'rgb(190, 224, 240)'}}/>
                        <Skeleton variant="rounded" width={900} height={200} className="result_box_skeleton" sx={{ bgcolor: 'rgb(190, 224, 240)'}}/>
                        <Skeleton variant="rounded" width={900} height={200} className="result_box_skeleton" sx={{ bgcolor: 'rgb(190, 224, 240)'}}/>
                        <Skeleton variant="rounded" width={900} height={200} className="result_box_skeleton" sx={{ bgcolor: 'rgb(190, 224, 240)'}}/>
                    </Box>
                }
                { recipeListRendering() }
                { isShow && 
                    <Box className="result_pagination">
                        <Pagination count={ totalPage } variant="text" shape="rounded" color='primary' sx={{ color : 'black'}} onChange={ handleChange }/>
                    </Box>        
                }        
            </Container>
        </Stack>
    );
}