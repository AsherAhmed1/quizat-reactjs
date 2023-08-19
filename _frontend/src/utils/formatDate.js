/// Start helper function ///
const formatDate = date => {
  // get Formal date to work with
  const dateObj = new Date(date);
  const dateStringParsed = dateObj.toLocaleDateString().split("/");
  const distDate = `${dateStringParsed[1]} /
     ${dateStringParsed[0]} /
     ${dateStringParsed[2]}`;
  return distDate;
};
/// End helper function ///
export default formatDate;
