import { DocRecord } from "@/lib/interfaces/manage";
import { useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { UseContextAPI } from "../../components/context/Provider";

const useDocsApproval = () => {
  const [docsApprove, setDocsApprove] = useState<boolean>(false);
  const search = useSearch({ strict: false }) as {
    sub_stage?: string;
  };
  const sub_stage = search.sub_stage;
  const { allDocsData, allDocsIsFetching } = UseContextAPI();

  useEffect(() => {
    if (allDocsIsFetching) {
      setDocsApprove(false);
      return;
    }

    const docsArray: DocRecord[] = Array.isArray(allDocsData)
      ? allDocsData
      : [];

    if (docsArray.length === 0) {
      setDocsApprove(false);
      return;
    }

    if (sub_stage === "ONBD#EKYC") {
      const docwithcategory = docsArray
        .filter((record: any) => record?.category !== null)
        .every((record: any) => record?.verification_status === "APPROVED");
      const docswithoutCategory = docsArray
        .filter((record: any) => record?.category === null)
        .some((record: any) => record?.verification_status === "APPROVED");

      setDocsApprove(docwithcategory && docswithoutCategory);
      return;
    }

    const hasApproved = docsArray.some(
      (record) => record?.verification_status === "APPROVED"
    );
    const allNonPending = docsArray.every(
      (record) => record?.verification_status !== "PENDING"
    );

    setDocsApprove(hasApproved && allNonPending);
  }, [allDocsData, allDocsIsFetching]);

  return docsApprove;
};

export default useDocsApproval;
