
export const formatDateLong = (dateString: any) => {
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }).format(date);
    }
    else {
        return ""
    }
};