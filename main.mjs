
// Asynchronous database opening
import { Reader as GReader } from '@maxmind/geoip2-node';

const dbPath = "dbip-country-lite-2024-07.mmdb";

const testIPs = [
    "36.110.46.106",  //CN
    '128.101.101.101',  //US
];
/
GReader.open(dbPath).then(reader => {
    testIPs.forEach(testIP => {
        const response = reader.country(testIP);
        console.log(testIP, ' => ', response.country.isoCode);
    })

});


// Synchronous database opening
import { readFileSync } from 'fs';
const dbBuffer = readFileSync(dbPath);

// This reader object should be reused across lookups as creation of it is
// expensive.
const reader = GReader.openBuffer(dbBuffer);

testIPs.forEach(testIP => {
    const response = reader.country(testIP);
    console.log(testIP, ' => ', response.country.isoCode);
})
