import { getTeamData } from './loadMatchData';

let count = 0;
export default function initTeamData() {
    const initTeamIds = [
        23958,
        34725,
        7944,
        6335,
        98,
        155,
        135,
        182,
        1161, // Rosenburg
        957, // Kristiansund
        664, // Sarpsborg
        822, // Lillestrom
    ];
    setInterval(() => {
        if (count < 2) {
            getTeamData(initTeamIds[count]);
        }
        count += 1;
    }, 5000);
}
