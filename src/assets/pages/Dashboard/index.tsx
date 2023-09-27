import { Box } from "@mui/material";
import Summary from "../../components/Summary";

function Dahsboard() {
  
  return (
    <>
    <Box sx={{
        width: "100%",
        height: "100vh",
        padding: "1% 1% 0% 1%"
      }}
    >
      <h1>Dahsboard</h1>
      <Summary />
    </Box>
      
    </>
  );
}

export default Dahsboard;