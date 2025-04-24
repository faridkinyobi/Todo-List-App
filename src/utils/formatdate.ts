export const formatDate = (date: string) => {
    const d = new Date(date);
    const month = (d.getMonth() + 1).toString().padStart(2, "0"); //bulan
    const day = d.getDate().toString().padStart(2, "0"); // hari
    const year = d.getFullYear(); // tahun
    const hours = d.getHours().toString().padStart(2, "0"); // jam
    const minutes = d.getMinutes().toString().padStart(2, "0"); // menit
    const seconds = d.getSeconds().toString().padStart(2, "0"); // detik

    return `${month}-${day}-${year} ${hours}:${minutes}:${seconds}`;
};
