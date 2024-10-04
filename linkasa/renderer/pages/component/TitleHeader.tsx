import theme from "../../lib/theme"
import { Box, Typography } from "@mui/material";

const TitleHeader = ({title}) => {
    
    return (
        <Box sx={{
            bgcolor: theme.palette.secondary.main,
            color: theme.palette.primary.contrastText,
            minWidth: '100%',
            minHeight: '100',
            borderRadius: '16px',
            padding: theme.spacing(2),
            position: 'relative',
            zIndex: '5'
        }}>
            <Typography variant="h5" sx={{fontWeight: 550}}>{title}</Typography>
        </Box>
    )
}

export default TitleHeader;