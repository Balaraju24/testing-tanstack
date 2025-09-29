import LoadingComponent from "@/components/core/Loading";
import { useLitigationLogic } from "@/utils/hooks/useLitigationLogic";
import { IssueGrid } from "./IssueGrid";
import { IssueTypeGrid } from "./IssueTypeGrid";
import { OrganizationGrid } from "./OrganizationGrid";
import { SearchInput } from "./SearchInput";
import { StepHeader } from "./StepHeader";
import { SubIssueGrid } from "./SubissueGrid";
import { SubmitButtonComponent } from "./SubmitButtonComponent";

const CreateLitigation = () => {
  const {
    selectedService,
    selectedIssueType,
    selectedSubIssue,
    selectedOrganization,
    currentStep,
    searchTerm,
    debouncedSearchTerm,
    isLoading,
    isOrganizationLoading,
    isPending,
    isFetchingNextPage,
    hasNextPage,
    isManager,
    isAdmin,
    getMainIssues,
    getIssueTypes,
    getSubIssues,
    getOrganizations,
    getCurrentStep,
    getTotalSteps,
    getStepTitle,
    canSubmit,
    handleServiceClick,
    handleIssueTypeClick,
    handleSubIssueClick,
    handleOrganizationSelect,
    handleBackClick,
    handleSubmit,
    handleLoadMore,
    setSearchTerm,
  } = useLitigationLogic();

  const showSubmitButton =
    (currentStep === "organization" && selectedOrganization) ||
    (currentStep === "issue" &&
      selectedService &&
      selectedService.issue !== "Notices" &&
      !isManager &&
      !isAdmin) ||
    (currentStep === "subIssue" && selectedSubIssue && !isManager && !isAdmin);

  const searchComponent =
    currentStep === "organization" && (isManager || isAdmin) ? (
      <SearchInput
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="Search by organization"
      />
    ) : null;

  return (
    <div className="h-[calc(100vh-120px)] mt-10 py-6 px-4">
      <div className="max-w-7xl xl:ml-16 mx-auto">
        {isLoading ? (
          <LoadingComponent loading={isLoading} message="New Case..." />
        ) : (
          <>
            <StepHeader
              onBackClick={handleBackClick}
              currentStep={getCurrentStep()}
              totalSteps={getTotalSteps()}
              title={getStepTitle()}
              searchComponent={searchComponent}
            />

            <div className=" mb-8 mt-4">
              {currentStep === "issue" && (
                <IssueGrid
                  issues={getMainIssues()}
                  selectedIssue={selectedService}
                  onIssueSelect={handleServiceClick}
                />
              )}

              {currentStep === "issueType" && selectedService && (
                <IssueTypeGrid
                  issueTypes={getIssueTypes(selectedService.issue)}
                  selectedIssueType={selectedIssueType}
                  onIssueTypeSelect={handleIssueTypeClick}
                />
              )}

              {currentStep === "subIssue" &&
                selectedService &&
                selectedIssueType && (
                  <SubIssueGrid
                    subIssues={getSubIssues(
                      selectedService.issue,
                      selectedIssueType
                    )}
                    selectedSubIssue={selectedSubIssue}
                    onSubIssueSelect={handleSubIssueClick}
                    showChevron={isManager || isAdmin}
                  />
                )}

              {currentStep === "organization" && (isManager || isAdmin) && (
                <OrganizationGrid
                  organizations={getOrganizations()}
                  selectedOrganization={selectedOrganization}
                  onOrganizationSelect={handleOrganizationSelect}
                  isLoading={isOrganizationLoading}
                  hasNextPage={hasNextPage}
                  isFetchingNextPage={isFetchingNextPage}
                  onLoadMore={handleLoadMore}
                  searchTerm={debouncedSearchTerm}
                />
              )}
            </div>

            {showSubmitButton && (
              <SubmitButtonComponent
                canSubmit={canSubmit()}
                isPending={isPending}
                onSubmit={handleSubmit}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CreateLitigation;
