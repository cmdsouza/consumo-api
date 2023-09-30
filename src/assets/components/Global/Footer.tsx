import { FC, ReactElement } from "react";
import { Box, Typography, Link } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub"; // Importar o ícone do GitHub

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
        justifyContent: "space-between", // Alinhar o texto e o ícone
        alignItems: "center", // Centralizar verticalmente o conteúdo
        borderTop: "1px solid #D3D3D3"
      }}
    >
      <Typography color="#00AEED" variant="subtitle1">
        {`${new Date().getFullYear()} | @cmdsouza`}
      </Typography>

      {/* Adicionar o ícone do GitHub com um link */}
      <Link
        href="https://github.com/cmdsouza/consumo-api" // Substitua pelo seu perfil do GitHub
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
