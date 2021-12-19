export const renderErrorMessage = (errs: string[]) => {
  return errs.map((err) => {
    return <div> {err} </div>;
  });
};
