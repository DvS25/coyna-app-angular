export const titleCase = (str: string) => {
   return  str.toLowerCase().split(' ').map(function (s) {
        return s.charAt(0).toUpperCase() + s.substring(1);
    }).join(' ').replace(/ and /ig, ' & ');
}