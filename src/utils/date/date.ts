export const generateDateLocale = (dateValue: string) => {
  switch (dateValue) {
    case "hourly":
      return new Date(dateValue).toLocaleTimeString("id-ID", {
        hour: "numeric",
      });
    case "daily":
      return new Date(dateValue).toLocaleString("id-ID");
    case "monthly":
      return new Date(dateValue).toLocaleString("id-ID", {
        month: "long",
      });
    case "yearly":
      return new Date(dateValue).toLocaleString("id-ID", {
        year: "numeric",
      });
    default:
      return new Date(dateValue).toLocaleTimeString("id-ID");
  }
};
