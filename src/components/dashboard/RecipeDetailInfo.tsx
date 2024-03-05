import { useLocation, useNavigate } from "react-router-dom"
import { getRecipeByRcpNm } from "../../service";
import { useDispatch } from "react-redux";
import { dialogOpen } from "../../actions/dialogAction";
import { useEffect, useState } from "react";
import { RecipeDetail } from "../../types";
import { Card, CardContent, Chip, Typography, Box, Container, Stack, Alert, Button, Skeleton } from "@mui/material";
import '../../assets/css/recipedetailinfo.scss'
import _ from 'lodash'

export default function RecipeDetailInfo(){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const location = useLocation();
    const state = {...location.state};
    const rcpNm = state.RCP_NM;

    const [ isShow, setIsShow ] = useState<boolean>(false);

    const [ data, setData ] = useState<RecipeDetail>({

        ATT_FILE_NO_MAIN: '',
        ATT_FILE_NO_MK: '',
        HASH_TAG: '',
        INFO_CAR: '',
        INFO_ENG: '',
        INFO_FAT: '',
        INFO_NA: '',
        INFO_PRO: '',
        INFO_WGT: '',
        MANUAL01: '',
        MANUAL02: '',
        MANUAL03: '',
        MANUAL04: '',
        MANUAL05: '',
        MANUAL06: '',
        MANUAL07: '',
        MANUAL08: '',
        MANUAL09: '',
        MANUAL10: '',
        MANUAL11: '',
        MANUAL12: '',
        MANUAL13: '',
        MANUAL14: '',
        MANUAL15: '',
        MANUAL16: '',
        MANUAL17: '',
        MANUAL18: '',
        MANUAL19: '',
        MANUAL20: '',
        MANUAL_IMG01: '',
        MANUAL_IMG02: '',
        MANUAL_IMG03: '',
        MANUAL_IMG04: '',
        MANUAL_IMG05: '',
        MANUAL_IMG06: '',
        MANUAL_IMG07: '',
        MANUAL_IMG08: '',
        MANUAL_IMG09: '',
        MANUAL_IMG10: '',
        MANUAL_IMG11: '',
        MANUAL_IMG12: '',
        MANUAL_IMG13: '',
        MANUAL_IMG14: '',
        MANUAL_IMG15: '',
        MANUAL_IMG16: '',
        MANUAL_IMG17: '',
        MANUAL_IMG18: '',
        MANUAL_IMG19: '',
        MANUAL_IMG20: '',
        RCP_NA_TIP: '',
        RCP_NM: '',
        RCP_PARTS_DTLS: '',
        RCP_PAT2: '',
        RCP_SEQ: '',
        RCP_WAY2: ''

    });
    
    useEffect(() => {

        getRecipeData();        

        return () => {
            setIsShow(false);
        }

    }, [])

    /**
     * 레시피 데이터 호출
     */
    const getRecipeData = async () => {

        try {
            
            const response = await getRecipeByRcpNm(rcpNm);
            const data = response.COOKRCP01.row[0];
            setData(data);
            setIsShow(true);

        } catch (error) {
            
            dispatch(dialogOpen(error.message));
            navigate(-1);

        }

    }

    /**
     * 레시피 상세내용 정렬해서 그리기
     * @returns 
     */
    const renderRecipeOder = () => {

        const renderArr = [];
        const manualArr = [];
        const manualImgArr = [];
        const key = "MANUAL";
        const imgKey = "MANUAL_IMG";
        
        const dataArr = Object.keys(data);


        for(const item of dataArr){
            
            if(item.indexOf(key) != -1){

                const value = data[item];                

                if(!_.isEmpty(value)){

                    if(item.indexOf(imgKey) == -1){

                        manualArr.push(value);

                    }else{

                        manualImgArr.push(value);

                    }

                }

            }

        }

        manualArr.sort();
        manualImgArr.sort();

        for(let i = 0; i < manualArr.length; i++){

            const manualItem = manualArr[i];
            const manualImgItem = manualImgArr[i];

            renderArr.push(
                <Card key={i}>
                    <Box sx={{ width: '100%', height: 'auto' }}>
                        <img src={ manualImgItem } className="recipe_image"/>
                    </Box>
                    <CardContent>
                        <Typography variant="body1" fontWeight="bold" fontFamily="Roboto" color="textPrimary" gutterBottom>{ manualItem }</Typography>
                    </CardContent>
                </Card>
            )

        }

        return renderArr;

    }
    
   
    return (
        <Container sx={{ padding: '30px' }}>
            { !isShow &&
                <Box sx={{ display: 'flex', width: '100%', flexWrap: 'wrap'}}>
                    <Skeleton variant="rounded" width={930} height={500} className="recipe_skeleton" sx={{ bgcolor: 'rgb(253, 204, 171)'}}/>
                    <Skeleton variant="rounded" width={930} height={200} className="recipe_skeleton" sx={{ bgcolor: 'rgb(253, 204, 171)'}}/>
                    <Skeleton variant="rounded" width={930} height={50} className="recipe_skeleton" sx={{ bgcolor: 'rgb(253, 204, 171)'}}/>
                </Box>
            }
            { isShow && 
                <>
                <Card className="recipe_item_card">
                    <Box sx={{ width: '100%', height: 'auto' }}>
                        <img src={ data.ATT_FILE_NO_MK } className="recipe_image"/>
                    </Box>
                    <CardContent>
                        <Box>
                            <Typography variant="h4" fontWeight="bold" fontFamily="Roboto" color="textPrimary" gutterBottom>{ data.RCP_NM }</Typography>
                        </Box>
                        <Box>
                            <Box>
                                <Chip label={ `요리종류: ${ data.RCP_PAT2 }` } color="primary" className="chip_item"/> 
                                <Chip label={ `열량: ${ data.INFO_ENG }kcal`}  color="secondary" className="chip_item"/>
                            </Box>
                            <Box>
                                <Chip label={ `탄수화물: ${ data.INFO_CAR }g` } color='success' className="chip_item"/> 
                                <Chip label={ `단백질: ${ data.INFO_PRO }g` }  color='error' className="chip_item"/> 
                                <Chip label={ `지방: ${ data.INFO_FAT }g` } color='warning' className="chip_item"/> 
                                <Chip label={ `나트륨: ${ data.INFO_NA }mg` } color='primary' className="chip_item"/>
                            </Box>
                            <Box>
                                <Typography variant="body1" fontWeight="bold" fontFamily="Roboto" color="textPrimary" gutterBottom>준비재료</Typography>
                                <Typography variant="body2" fontWeight="default" fontFamily="Roboto" color="textPrimary" gutterBottom>{ data.RCP_PARTS_DTLS }</Typography>
                            </Box>                        
                        </Box>
                    </CardContent>
                </Card>
                <Box>
                    <Alert variant="filled" severity="warning">
                        { data.RCP_NA_TIP }
                    </Alert>
                </Box>
                </>
            }
            <Stack>
                {  renderRecipeOder() }
            </Stack>
            <Box className="back_to_recipelist">
                <Button onClick={ () => { navigate(-1) } }>
                    <Typography variant="body1" fontWeight="bold" fontFamily="Roboto" color="white" gutterBottom>목록으로</Typography>
                </Button>
            </Box>
        </Container>
    );
}