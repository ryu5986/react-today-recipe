import { BottomNavigation, BottomNavigationAction, Box } from "@material-ui/core";
import { useState } from "react";
import GitHub from '@material-ui/icons/GitHub';
import MenuBook from '@material-ui/icons/MenuBook';
import Home from '@material-ui/icons/Home';
import { useNavigate } from "react-router-dom";

export default function Footer(){

    const [value, setValue] = useState(0);
    const navigate = useNavigate();

    return (
        <footer>
            <Box>
                <BottomNavigation className="footer_navigation"
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        
                        if(newValue == 0){
                            navigate('/');
                        }else if(newValue == 1){
                            console.log(newValue)
                        }else if(newValue == 2){
                            window.open('https://www.foodsafetykorea.go.kr/main.do', "_blank", "noopener, noreferrer");
                        }

                        setValue(newValue);
                    }}
                    >
                    <BottomNavigationAction label="Home" icon={<Home />}/>      
                <BottomNavigationAction label="GitHub" icon={<GitHub />} />
                <BottomNavigationAction label="식품안전나라" icon={<MenuBook />} />
                </BottomNavigation>
            </Box>
        </footer>
    );
}