import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useMemo } from "react";
import { StyleData } from "../types/dataTypes";
import { getValueForLabelStyleLanguage } from "../utils/mainHelpersFunc";

interface LanguageTableProps {
  language: {
    code: string;
    name: string;
  };
  labels: string[];
  styleCodes: string[];
  styles: StyleData[];
  isFullscreen?: boolean;
  onEnterFullscreen?: (code: string) => void;
  onExitFullscreen?: () => void;
  onSwitchLanguage?: (direction: "prev" | "next") => void;
}

export const LanguageTable = ({
  language,
  labels,
  styleCodes,
  styles,
  isFullscreen = false,
  onEnterFullscreen,
  onExitFullscreen,
  onSwitchLanguage,
}: LanguageTableProps) => {
  const tableData = useMemo(() => {
    return labels.map((label) => ({
      label,
      values: styleCodes.map((styleCode) =>
        getValueForLabelStyleLanguage(styles, label, styleCode, language.code)
      ),
    }));
  }, [labels, styleCodes, styles, language.code]);

  return (
    <Box
      sx={{
        mb: 4,
        position: isFullscreen ? "fixed" : "relative",
        top: isFullscreen ? 0 : "auto",
        left: isFullscreen ? 0 : "auto",
        width: isFullscreen ? "100vw" : "auto",
        height: isFullscreen ? "100vh" : "auto",
        zIndex: isFullscreen ? 1300 : "auto",
        backgroundColor: isFullscreen ? "background.default" : "transparent",
        overflow: isFullscreen ? "auto" : "visible",
        p: isFullscreen ? 3 : 0,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", display: "flex", alignItems: "center" }}>
          <Box
            component="span"
            sx={{
              backgroundColor: "#1976d2",
              color: "white",
              borderRadius: "2px",
              px: 1.5,
              py: 0.5,
              mr: 1,
              cursor: "pointer",
            }}
            onClick={() => (isFullscreen ? onExitFullscreen?.() : onEnterFullscreen?.(language.code))}
          >
            {language.code}
          </Box>
          
        </Typography>

        {isFullscreen && (
          <Box>
            <IconButton onClick={() => onSwitchLanguage?.("prev")}> <ArrowBackIosIcon /> </IconButton>
            <IconButton onClick={() => onSwitchLanguage?.("next")}> <ArrowForwardIosIcon /> </IconButton>
            <IconButton onClick={onExitFullscreen}> <CloseIcon /> </IconButton>
          </Box>
        )}
      </Box>

      <TableContainer component={Paper} sx={{ maxHeight: "60vh", borderRadius: 1 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", borderRight: "1px solid #e0e0e0" }}>Label</TableCell>
              {styleCodes.map((styleCode) => (
                <TableCell
                  key={styleCode}
                  align="left"
                  sx={{ fontWeight: "bold", borderRight: "1px solid #e0e0e0" }}
                >
                  {styleCode}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row) => (
              <TableRow key={row.label}>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ fontWeight: "bold", borderRight: "1px solid #e0e0e0" }}
                >
                  {row.label}
                </TableCell>
                {row.values.map((value, index) => (
                  <TableCell
                    key={`${row.label}-${styleCodes[index]}`}
                    align="left"
                    sx={{ borderRight: "1px solid #e0e0e0" }}
                  >
                    {value || <span style={{ color: "#999" }}>—</span>}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {!isFullscreen && <Divider sx={{ my: 3 }} />}
    </Box>
  );
};
