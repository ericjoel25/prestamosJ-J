
export const Instant = {


    //DifferenceDays: Show the different between tow date

    DifferenceDays: function (fecha, fecha2) {
        let Fecha = new Date(fecha);
        let Fecha2 = new Date(fecha2);
        const time = Fecha.getTime()
        const time2 = Fecha2.getTime()

        const sum = (time2 - time) / (1000 * 60 * 60 * 24);

        return parseFloat(sum.toFixed());
    },


    // Add days to a date
    DaysPlus: function (date, days) {
        let sum = date.setDate(date.getDate() + days);
        const NewDate = new Date(sum);

        return NewDate;
    },

    // LongFormat Show the time in this way (13 de nov. de 2021 9:27:21 P.M)  and is use to format Date
    LongFormat: function (date) {

        const fecha = new Date(date);
        const day = fecha.getDate();
        const month = fecha.getMonth();
        const year = fecha.getFullYear();
        const hours = fecha.getHours()
        const minute = fecha.getMinutes()
        const second = fecha.getSeconds()
        const AmorPm = hours > 12 && hours !== 24 ? 'P.M' : 'A.M'
        const hours12 = hours > 12 ? (hours - 12) : (hours === 0) ? (12) : hours
        //const getCurrentAmPm = hours >= '12' ? 'PM' : 'AM';

        let months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']

        const Resultado = `${day} de ${months[month]}. de ${year} ${hours12}:${minute}:${second} ${AmorPm}`;

        return Resultado;
    },

    //MiniFormat show the time in this way (13 de nov. de 2021) and is use to format Date
    MiniFormat: function (Fecha) {

        let fecha = new Date(Fecha);
        let day = fecha.getDate() + 1;
        let month = fecha.getMonth();
        let year = fecha.getFullYear();

        //const getCurrentAmPm = hours >= '12' ? 'PM' : 'AM';

        let months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']

        let Resultado = `${day} de ${months[month]}. de ${year}`;

        return Resultado;

    },

    //MiniFormat show the time in this way (13 de nov. de 2021) and is use to format Date
    MiniFormatHoy: function (Fecha) {

        let fecha = new Date(Fecha);
        let day = fecha.getDate();
        let month = fecha.getMonth();
        let year = fecha.getFullYear();

        //const getCurrentAmPm = hours >= '12' ? 'PM' : 'AM';

        let months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']

        let Resultado = `${day} de ${months[month]}. de ${year}`;

        return Resultado;

    },

    // Show the time in this way (YYYY-MM-DD) Para la fecha que bienen  desde la base de dato
    RegularFormat: function (date) {
        const fecha = new Date(date);
        const day = fecha.getDate() + 1;
        const month = fecha.getMonth() + 1;
        const year = fecha.getFullYear();

        const regularformat = `${year}-${month}-${day}`;

        return regularformat;

    },

    // Show the time in this way (YYYY-MM-DD) Para la fecha que bien del contructor DAte()
    RegularFormatHoy: function (date) {
        const fecha = new Date(date);
        const day = fecha.getDate();
        const month = fecha.getMonth() + 1;
        const year = fecha.getFullYear();

        const regularformatHoy = `${year}-${month}-${day}`;

        return regularformatHoy;

    },

    // Get Microseconds
    MicroTime: function (date) {
        const fecha = new Date(date)
        const time = fecha.getTime()

        return time
    },


    LocaleTime: function (fecha) {
        const hora = fecha.toLocaleTimeString();
        return hora;
    },

}