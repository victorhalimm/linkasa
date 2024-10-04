import React from "react"
import TitleHeader from "../component/TitleHeader"
import Image from "next/image";
import AirportMap from "../../../resources/airport_map.jpg"
import { Box } from "@mui/material";

const ViewTerminalMap = () => {
    return (
        <React.Fragment>
            <TitleHeader title={"Terminal Maps"}/>
            <Box sx={{width: '100%', height: '100vh', position: 'relative'}}>
                <Image src={AirportMap} layout='fill'></Image>
            </Box>
        </React.Fragment>
    )
}

export default ViewTerminalMap;