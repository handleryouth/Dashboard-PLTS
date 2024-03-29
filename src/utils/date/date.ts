export const generateDateLocale = (dataTime: string, dateValue: string) => {
  switch (dataTime) {
    case "hourly":
      return new Date(dateValue).toLocaleTimeString("id-ID", {
        hour: "numeric",
        minute: "numeric",
      });
    case "daily":
      return new Date(dateValue).toLocaleString("id-ID");
    case "monthly":
      return new Date(dateValue).toLocaleString("id-ID", {
        month: "long",
      });
    case "yearly":
      return new Date(dateValue).toLocaleString("id-ID", {
        month: "long",
        year: "numeric",
      });
    default:
      return new Date(dateValue).toLocaleTimeString("id-ID");
  }
};
