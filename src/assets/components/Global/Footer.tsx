import { FC, ReactElement } from "react";
import { Box, Typography, Link } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

export const Footer: FC = (): ReactElement => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        backgroundColor: "##DCDCDC",
        padding: "1rem",
        marginTop: "2%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderTop: "1px solid #D3D3D3",
      }}
    >
      <Typography color="#00AEED" variant="subtitle1">
        {`${new Date().getFullYear()} | @cmdsouza`}
      </Typography>

      <Link
        href="https://github.com/cmdsouza/consumo-api"
        target="_blank"
        rel="noopener noreferrer"
        color="#00AEED"
      >
        <GitHubIcon />
      </Link>
    </Box>
  );
};

export default Footer;
