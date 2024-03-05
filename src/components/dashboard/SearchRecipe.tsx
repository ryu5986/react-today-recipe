import _ from "lodash";
import '../../assets/css/searchrecipe.scss'
import { Box, Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { dialogOpen } from "../../actions/dialogAction";
import { getRecipe } from "../../service";
import { iconArray } from "../../utils/iconUtil";
import SearchIcon from '@material-ui/icons/Search';
import TextField from "@mui/material/TextField/TextField";
import { SuccessCode } from "../../types";
import { useNavigate } from "react-router-dom";


export default function SearchRecipe(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {

        /**
         * 아이콘 fade in 하기
         */
        const fadeInArray = document.querySelectorAll('.fading-image');

        fadeInArray.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('show');
            }, index * 100);
        })

        /**
         * 아이콘 fade in 해제
         */
        return () => {

            fadeInArray.forEach((item) => {
                item.classList.remove('show');
            })

        }

    }, []);

    /**
     * 아이콘 배열에 담기
     * @returns
     */
    const makeIconList = () => {

        const iconTagArray = [];

        for(let i = 0; i < iconArray.length; i++){

            iconTagArray.push(
                <img key={i} src={iconArray[i]} className={'fading-image'}/>
            );

        }

        return iconTagArray;

    }

    /**
     * 검색창 값 변경 감지
     */
    const [ keyword, setKeyword ] = useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(event.target?.value);
    }

    const checkEnterKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
        
        if (event.key === 'Enter') {

            searchRecipe();

        }

    }

    /**
     * 검색어에 따른 레시비 정보 호출
     */
    async function searchRecipe(){

        try {
           
            if(!_.isEmpty(keyword)){

                const response = await getRecipe(keyword);
            
                if(response.COOKRCP01.RESULT.CODE === SuccessCode){
                    
                    navigate('/recipe/list', {state : { keyword: keyword, totalCount: response.COOKRCP01.total_count}});

                }else{

                    dispatch(dialogOpen('해당 단어의 검색 결과가 없습니다.'));

                }

            }else{

                throw new Error('검색어를 입력해주세요.');

            }

        } catch (err) {

            dispatch(dialogOpen(err.message));

        }

    }

    return (
        <>
            <Box>
                <Box className="search_icons">
                    { makeIconList() }
                </Box>
                <Box className="search_field">
                    <TextField fullWidth label="검색어를 입력하세요" color="info" sx={{ backgroundColor: 'white', borderRadius: '5px', width: '50%' }} 
                        value={ keyword } onChange={ handleChange } onKeyDown={ checkEnterKey }/>
                    <Button variant="text" color='primary' size='large' type='button' onClick={ searchRecipe }>
                        <SearchIcon fontSize='large'/>
                    </Button>
                </Box>
            </Box>
        </>
    );

}