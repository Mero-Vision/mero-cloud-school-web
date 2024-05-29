import { Box } from "@mui/material";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  useGetCompanyFoldersQuery,
  useGetFoldersQuery,
  useGetSingleFolderQuery,
} from "../../../apis/folderApi";
import CustomLoader from "../CustomLoader/CustomLoader";
import DocumentNav from "./DocumentNav";
import NoFiles from "./NoFiles";
import SingleDocument from "./SingleDocument/SingleDocument";
import styles from "./styles";

const array = [
  {
    name: "Firm Folder",
    isNotEditable: 1,
  },
  {
    name: "Company Folder",
    isNotEditable: 1,
  },
];

const DocumentContent = ({ IsCompany }) => {
  const classes = styles();
  const [selected, setSelected] = useState({});
  const [breadcrumbs, setBreadCrumbs] = useState([{ name: "Root Directory" }]);
  const [folderId, setFolderId] = useState();
  const [documentArray, setDocumentArray] = useState();
  const firm_id = JSON.parse(localStorage.getItem("user"))
    ?.accounting_firms?.[0]?.id;
  const company_id = JSON.parse(localStorage.getItem("company"))?.id;
  const { data: companyFolders } = useGetCompanyFoldersQuery(
    {
      model_type: "accounting_firm",
      model_id: firm_id,
    },
    { skip: IsCompany }
  );
  const { data: firmFolders } = useGetFoldersQuery(
    {
      model_type: "accounting_firm",
      model_id: firm_id,
    },
    { skip: IsCompany }
  );
  const { data: currentCompany, isFetching } = useGetFoldersQuery(
    {
      model_type: "company",
      model_id: company_id,
    },
    { skip: !IsCompany }
  );
  useEffect(() => {
    if (currentCompany?.data?.id && IsCompany) {
      setFolderId(currentCompany?.data?.id);
    }
  }, [IsCompany, currentCompany?.data?.id]);
  const handleBreadCrumbs = (data) => {
    !data?.extension &&
      setBreadCrumbs((prev) => {
        return [...prev, data];
      });
  };
  useEffect(() => {
    !IsCompany && setDocumentArray(array);
  }, [IsCompany]);

  const params = {
    id: folderId,
  };
  const { data: folders, isFetching: folderLoading } = useGetSingleFolderQuery(
    params,
    {
      skip: !folderId,
    }
  );

  const handleFolderSelect = (folder) => {
    if (folder?.id) {
      setFolderId(folder?.id);
    }
    if (folder?.name?.toLowerCase() === "firm folder") {
      setFolderId(firmFolders?.data?.id);
    }
    setSelected(folder);
    handleBreadCrumbs(folder);
  };

  useEffect(() => {
    if (selected?.name?.toLowerCase() === "company folder") {
      setDocumentArray(
        companyFolders?.data?.map((item) => {
          return { ...item, isNotEditable: 1 };
        })
      );
      setFolderId("");
    }
  }, [selected, companyFolders?.data]);
  useEffect(() => {
    if (selected?.name?.toLowerCase() === "root directory" && IsCompany) {
      setFolderId(currentCompany?.data?.id);
    }
    if (selected?.name?.toLowerCase() === "root directory" && !IsCompany) {
      setDocumentArray(array);
      setFolderId("");
    }
  }, [selected, currentCompany?.data?.id]);
  useEffect(() => {
    if (selected?.name?.toLowerCase() === "firm folder") {
      const foldersAndFiles = [
        ...(firmFolders?.data?.sub_folders || []),
        ...(firmFolders?.data?.files || []),
      ];
      setDocumentArray(foldersAndFiles);
    }
  }, [selected, firmFolders?.data]);
  console.log({ documentArray, folderLoading, isFetching });
  useLayoutEffect(() => {
    if (folderId) {
      const foldersAndFiles = [
        ...(folders?.data?.sub_folders || []),
        ...(folders?.data?.files || []),
      ];
      setDocumentArray(foldersAndFiles);
    }
  }, [folderId, folders?.data]);
  console.log({ selected });

  return (
    <>
      <DocumentNav
        selected={selected}
        breadcrumbs={breadcrumbs}
        setBreadCrumbs={setBreadCrumbs}
        id={folderId}
        handleFolderSelect={handleFolderSelect}
      />
      {isFetching || folderLoading ? (
        <CustomLoader />
      ) : documentArray?.length ? (
        <Box className={classes.documentContainer}>
          {documentArray?.map((item, index) => (
            <Box key={index}>
              <SingleDocument
                item={item}
                handleFolderSelect={handleFolderSelect}
                id={folderId}
              />
            </Box>
          ))}
        </Box>
      ) : (
        <NoFiles id={folderId} />
      )}
    </>
  );
};

export default DocumentContent;
