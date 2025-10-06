import { useSearch } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { U as UseContextAPI } from './Provider-DRuE0d-A.mjs';

const useDocsApproval = () => {
  const [docsApprove, setDocsApprove] = useState(false);
  const search = useSearch({ strict: false });
  const sub_stage = search.sub_stage;
  const { allDocsData, allDocsIsFetching } = UseContextAPI();
  useEffect(() => {
    if (allDocsIsFetching) {
      setDocsApprove(false);
      return;
    }
    const docsArray = Array.isArray(allDocsData) ? allDocsData : [];
    if (docsArray.length === 0) {
      setDocsApprove(false);
      return;
    }
    if (sub_stage === "ONBD#EKYC") {
      const docwithcategory = docsArray.filter((record) => (record == null ? void 0 : record.category) !== null).every((record) => (record == null ? void 0 : record.verification_status) === "APPROVED");
      const docswithoutCategory = docsArray.filter((record) => (record == null ? void 0 : record.category) === null).some((record) => (record == null ? void 0 : record.verification_status) === "APPROVED");
      setDocsApprove(docwithcategory && docswithoutCategory);
      return;
    }
    const hasApproved = docsArray.some(
      (record) => (record == null ? void 0 : record.verification_status) === "APPROVED"
    );
    const allNonPending = docsArray.every(
      (record) => (record == null ? void 0 : record.verification_status) !== "PENDING"
    );
    setDocsApprove(hasApproved && allNonPending);
  }, [allDocsData, allDocsIsFetching]);
  return docsApprove;
};

export { useDocsApproval as u };
//# sourceMappingURL=useDocsApproval-CzCEMiQ5.mjs.map
