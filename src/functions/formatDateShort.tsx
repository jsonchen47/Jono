export const formatDateShort = (dateString: any) => {
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
        return new Intl.DateTimeFormat('en-US', {
            year: '2-digit', // Two-digit year
            month: '2-digit', // Two-digit month
            day: '2-digit', // Two-digit day
        }).format(date);
    } else {
        return "";
    }
};
