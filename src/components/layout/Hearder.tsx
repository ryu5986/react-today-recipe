import RestaurantIcon from '@material-ui/icons/Restaurant';
import FastfoodIcon from '@material-ui/icons/Fastfood';

export default function Header(){
    return (
        <header>
            <h1><RestaurantIcon fontSize='large'/> 오늘 뭐 먹지? <FastfoodIcon fontSize='large'/></h1>
        </header>
    );
}