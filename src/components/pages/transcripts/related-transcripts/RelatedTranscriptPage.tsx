import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import AddIcon from "@mui/icons-material/Add";
import ArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import {
  Badge,
  Breadcrumbs,
  Button,
  CardHeader,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
  tableCellClasses,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useState } from "react";
import { Input } from "@material-tailwind/react";
import { WhiteRedButton, RedButton } from "@/components/commons/Buttons";
import ModalRight from "@/components/commons/ModalRight/ModalRight";
import { FormTranscript } from "@/components/commons/FormTranscript";
import { FormVideoTranscript } from "@/components/commons/FormVideoTranscript";
import { useRouter } from "next/router";
import {
  IDetailTranscriptsResponse,
  ITranscript,
} from "@/lib/types/response/IDetailTranscriptsResponse";
import { IDialogTranscriptResponse } from "@/lib/types/response/IDialogTranscriptResponse";
import { useSearchParams } from "next/navigation";
import { getUrlVideo } from "@/lib/services/detail-process-request";
import VideoPlayer from "@/components/commons/VideoPlayer";

export type TranscriptPageProps = {
  listDialog: IDialogTranscriptResponse[] | [];
  dataProcces: IDetailTranscriptsResponse | null;
};
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#e1e1e1",
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  cursor: "pointer",
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
    cursor: "pointer",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const RelatedTranscriptPage = ({
  listDialog,
  dataProcces,
}: TranscriptPageProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { query } = router;
  const [viewTranscript, setViewTranscript] = useState<ITranscript | null>(
    null
  );
  const [editVideoTranscript, setEditVideoTranscript] = useState<any>(null);
  const [videoRead, setVideoRead] = useState<boolean>(false);
  const [isEditing, setIsEdting] = useState<{}>(false);
  const [videoId, setVideoId] = useState<string | undefined>('')

  let videoIdTest: any = ''

  const transcript = dataProcces?.transcripts.filter(
    (v) => v.transcriptID === searchParams.get("transcriptId")
  );

  React.useEffect(() => {
    setTimeout(() => {
      setVideoRead(true);
    }, 500);
  }, []);

  const handlerEdit = () => {
    if (isEditing) {
      // SAVE
      setIsEdting(false);
    } else {
      setIsEdting(true);
    }
  };

  const getTranscriptById = () => {};

  function openModal() {
    setViewTranscript(null)
  }

  return (
    <>
      <div className="flex flex-row justify-between pb-2 mb-6  border-b border-slate-800">
        <Breadcrumbs aria-label="breadcrumb" className="flex flex-row ">
          <Link
            // underline="hover"
            color="inherit"
            href="/"
          >
            {t("MENU_BREADCUMB")}
          </Link>
          <Link
            // underline="hover"
            color="inherit"
            href={`/transcripts`}
          >
            {t("TRANSCRIPTS_BREADCUMB")}
          </Link>
          <Link
            // underline="hover"
            color="inherit"
            href={`/transcripts/${searchParams.get("processN")}`}
          >
            {searchParams.get("processN") || ""}
          </Link>
          <Typography color="text.primary">
            {searchParams.get("transcriptId") || ""}
          </Typography>
        </Breadcrumbs>
        <div className="flex gap-3">
          <RedButton
            variant="outlined"
            onClick={() =>
              setViewTranscript(
                dataProcces?.transcripts.find(
                  (v) => v.transcriptID === query.slug?.[1]
                ) || null
              )
            }
            startIcon={<EditNoteIcon />}
          >
            {t("VIEW")}
          </RedButton>
        </div>
      </div>
      <Box
        display="flex"
        flexDirection={"row"}
        alignItems="center"
        sx={{ minWidth: 275 }}
      >
        <Grid container spacing={2} columns={8}>
          <Grid xs={8} sm={8} md={4} lg={4}>
            {transcript?.map((trans) => {
              videoIdTest = trans.googleDriveID;
              const summary = trans.summary?.replaceAll("\n", "<br/>");
              const topics = trans.topics?.replaceAll("\n", "<br/>");
              const sentiment = trans.sentimentAnalysis?.replaceAll(
                "\n",
                "<br/>"
              );

              return (
                <Card variant="outlined" sx={{ minWidth: 205 }}>
                  <React.Fragment>
                    <CardContent>
                      {/* {videoRead && <video src={
                            trans.urlSigned ? trans.urlSigned : ""}
                            controls={true}
                            preload="metadata"
                            style={{ maxWidth: "100%" }}>
                      </video>} */}

                      <VideoPlayer videoId={trans.googleDriveID} />

                      <Typography variant="h5" component="div">
                        {/* {item.title} */}
                      </Typography>
                      <Typography
                        color="text.secondary"
                        sx={{
                          fontSize: {
                            lg: 12,
                            md: 11,
                            sm: 10,
                            xs: 10,
                          },
                          wordWrap: "break-word",
                          width: "11rem",
                        }}
                      >
                        {/* {truncate(item.description, 80)} */}
                      </Typography>

                      <div className="flex-col whitespace-normal">
                        <div className="whitespace-normal mt-2 mb-2 w-full" />

                        <div className="text-zinc-600 text-sm mt-4 mb-4">
                          {t("PROCESS.PROCESS_NUMBER")}
                        </div>
                        <div className="text-black">{trans.processNumber}</div>

                        <div className="whitespace-normal mt-2 mb-2 w-full" />
                        <div className="text-zinc-600 text-sm">
                          {t("PROCESS.TOPICS")}
                        </div>
                        <div className="text-black">
                          <div dangerouslySetInnerHTML={{ __html: topics }} />
                        </div>
                        <div className="whitespace-normal mt-2 mb-2 w-full" />
                        <div className="text-zinc-600 text-sm">
                          {t("PROCESS.SENTIMENT_ANALY")}
                        </div>
                        <div className="text-black">
                          <div
                            dangerouslySetInnerHTML={{ __html: sentiment }}
                          />
                        </div>
                        <div className="whitespace-normal mt-2 mb-2 w-full" />
                        <div className="text-zinc-600 text-sm">
                          {t("PROCESS.SUMARY")}
                        </div>
                        <div className="text-black">
                          <div dangerouslySetInnerHTML={{ __html: summary }} />
                        </div>
                      </div>
                    </CardContent>
                  </React.Fragment>
                </Card>
              );
            })}
          </Grid>
          <Grid xs={8} sm={8} md={4} lg={4}>
            <Card variant="outlined" sx={{ minWidth: 205 }}>
              <CardHeader
                title={
                  listDialog?.length ? (
                    <h6>
                      <span className="mr-10" style={{ marginRight: 18 }}>
                        {t("PROCESS.CRONOLOGY")}
                      </span>
                      <Badge
                        color="secondary"
                        overlap="circular"
                        badgeContent={listDialog.length}
                      ></Badge>
                    </h6>
                  ) : (
                    <div />
                  )
                }
              />
              <React.Fragment>
                <CardContent
                  style={{ flexDirection: "row", overflowX: "auto" }}
                >
                  <div className="flex flex-row" style={{ width: "100%" }}>
                    <div className="flex flex-col" style={{ width: "100%" }}>
                      <div className="flex flex-col">
                        <TableContainer component={Paper}>
                          <Table
                            sx={{ minWidth: 200 }}
                            aria-label="customized table"
                          >
                            <TableHead>
                              <TableRow>
                                <StyledTableCell>
                                  {t("PROCESS.START_TIME")}
                                </StyledTableCell>
                                <StyledTableCell>
                                  {t("PROCESS.SPEAKER")}
                                </StyledTableCell>
                                <StyledTableCell>
                                  {t("PROCESS.TEXT")}
                                </StyledTableCell>
                                <StyledTableCell />
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {listDialog?.map((item, index) => {
                                console.log('listDialog',listDialog)
                                return (
                                  <StyledTableRow
                                    onClick={() => setEditVideoTranscript(item)}
                                  >
                                    <StyledTableCell>
                                      {item.start}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                      {item.speaker}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                      {item.text}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                      <ArrowRightIcon />
                                    </StyledTableCell>
                                  </StyledTableRow>
                                );
                              })}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </React.Fragment>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <ModalRight
        open={!!viewTranscript}
        onClose={() => setViewTranscript(null)}
        onSave={() => setViewTranscript(null)}
      >
        <FormTranscript values={viewTranscript} />
      </ModalRight>
      <ModalRight
        title={editVideoTranscript?.id}
        open={!!editVideoTranscript}
        onClose={() => setEditVideoTranscript(null)}
        onSave={() => setEditVideoTranscript(null)}
      >
        <FormVideoTranscript
          fileId={videoIdTest}
          values={editVideoTranscript}
          processNumber={dataProcces?.process[0].processNumber}
        />
      </ModalRight>
    </>
  );
};
