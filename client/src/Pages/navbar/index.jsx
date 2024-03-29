import { useState } from "react";
import { IconButton, InputBase, Typography, Select, MenuItem, FormControl, useTheme } from "@mui/material";
import {Search, Message, DarkMode, LightMode, Notifications, Help} from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux";
import {setMode, setLogout} from "../../state"
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";
const NavBar = () => {
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;

    const fullname = `${user.firstName} ${user.lastName}`

    return <FlexBetween padding="1rem 6%" backgroundColor = {alt}>
        <FlexBetween gap="1.5rem">
            <Typography fontWeight="bold" fontSize="clamp(1rem, 2rem,2.25rem)" color="primary" onClick={() => navigate("/home")} sx={{"&:hover":{
                primaryLight, cursor: "pointer"
            }}}>
                Rate My Courses
            </Typography>
            
                <FlexBetween backgroundColor={neutralLight} borderRadius="9px" gap="3rem" padding="0.1rem 1.5rem">
                    <InputBase placeholder="Search.." />
                    <IconButton>
                        <Search/>
                    </IconButton>
                </FlexBetween>
            
        </FlexBetween>
        
        <FlexBetween gap="2rem">
            <IconButton onClick={() => dispatch(setMode())}>
                {(theme.palette.mode === "dark") ? (
                <DarkMode sx={{fontSize: "25px"}} />)
                : (
                <LightMode sx={{color: dark, fontSize: "25px"}}/>
                )}
            </IconButton>
            <Message sx={{fontSize: "25px"}} />
            <Notifications sx={{fontSize: "25px"}} />
            <Help sx={{fontsize: "25px"}}/>
            <FormControl variant="standard" value={fullname}>
                <Select value={fullname} sx ={{backgroundColor: neutralLight, width: "150px", borderRadius: "0.25rem", p: "0.25rem 1 rem", "& .MuiSvgIcon-root":{
                    pr: "0.25rem",
                    width: "3rem"},
                    "& .MuiSelect-select:focus":{
                        backgroundColor: neutralLight
                    }}}
                    input={<InputBase/>}
                    >
                    <MenuItem value={fullname}>
                        <Typography>{fullname}</Typography>
                    </MenuItem>
                    <MenuItem onClick={() => dispatch(setLogout())}>Log out</MenuItem>
                    </Select>
                    
            </FormControl>
        </FlexBetween>

    </FlexBetween>;
}
 
export default NavBar;